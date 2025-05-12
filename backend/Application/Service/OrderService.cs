using Core.Entity;
using Core.Interface;
using Application.DTO;
using Application.Interface;
using System.Linq.Expressions;

namespace Application.Service;

public class OrderService : IOrderService
{
    private readonly IUnitOfWork _unitOfWork;

    public OrderService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<Order>> GetAll(Expression<Func<Order, bool>> expression = null)
    {
        var orderList = (await _unitOfWork.Orders.GetAll(expression)).OrderByDescending(o => o.Id);

        foreach (Order order in orderList)
        {
            order.OrderDetails = (await _unitOfWork.OrderDetails.GetAll(o => o.Order == order.Id)).ToList();

            foreach (var od in order.OrderDetails)
            {
                od.BookNavigation = (await _unitOfWork.Books.GetById((int)od.Book));
            }
        }

        return orderList;
    }

    public async Task<IEnumerable<Order>> GetAll(int? userID, string? receiver, string? address, int? product, int? grade, int? series, string? status, DateTime dateStart, DateTime dateEnd)
    {
        var orders = (await _unitOfWork.Orders.GetAll(o =>
            (userID == null || o.User == userID) &&
            (string.IsNullOrEmpty(receiver) || o.Receiver == receiver) &&
            (string.IsNullOrEmpty(address) || o.Address == address) &&
            (
                (string.IsNullOrEmpty(status) && (o.DatePurchased >= dateStart && o.DatePurchased <= dateEnd)) ||
                (status == "Chưa xác nhận" && (o.Status == status && o.DatePurchased >= dateStart && o.DatePurchased <= dateEnd)) ||
                (status == "Đã hủy" && (o.Status == status && o.DateCanceled >= dateStart && o.DateCanceled <= dateEnd)) ||
                (status == "Đã nhận hàng" && (o.Status == status && o.DateReceived >= dateStart && o.DateReceived <= dateEnd)) ||
                (o.Status == status && o.DateVertified >= dateStart && o.DateVertified <= dateEnd)
            )
        )).OrderByDescending(o => o.Id);

        var orderDetails = (await _unitOfWork.OrderDetails.GetAll(od => (product == null || od.Book == product)));
        var books = (await _unitOfWork.Books.GetAll(b =>
            (product == null || b.Id == product) &&
            (grade == null || b.Grade == grade)
        ));
        var bookSeries = (await _unitOfWork.BookSeries.GetAll(bs => series == null || bs.Series == series));

        var orderList = from o in orders
                        join od in orderDetails on o.Id equals od.Order
                        join b in books on od.Book equals b.Id
                        join bs in bookSeries on b.Id equals bs.Id
                        group o by o.Id into g
                        select g.First();

        foreach (Order order in orderList)
        {
            order.OrderDetails = (await _unitOfWork.OrderDetails.GetAll(o => o.Order == order.Id)).ToList();

            foreach (var od in order.OrderDetails)
            {
                od.BookNavigation = (await _unitOfWork.Books.GetById((int)od.Book));
            }
        }

        return orderList;
    }

    public async Task<Order> GetById(int id)
    {
        return await _unitOfWork.Orders.GetById(id);
    }

    public async Task<IEnumerable<Order>> GetByUserId(int userID)
    {
        var orders = (await _unitOfWork.Orders.GetAll(o => o.User == userID)).OrderByDescending(o => o.Id);

        foreach (Order order in orders)
        {
            order.OrderDetails = (await _unitOfWork.OrderDetails.GetAll(o => o.Order == order.Id)).ToList();
            
            foreach (var od in order.OrderDetails)
            {
                od.BookNavigation = (await _unitOfWork.Books.GetById((int)od.Book));
            }
        }

        return orders;
    }

    public async Task<List<string>> GetAllReceiver()
    {
        var orders = await _unitOfWork.Orders.GetAll();
        var receivers = from o in orders group o by o.Receiver into g select g.Key;
        return receivers.ToList();
    }

    public async Task<List<string>> GetAllAddress()
    {
        var orders = await _unitOfWork.Orders.GetAll();
        var addresses = from o in orders group o by o.Address into g select g.Key;
        return addresses.ToList();
    }

    public async Task<IEnumerable<CartDTO>> GetTransactionItems(int[] cartID)
    {
        var carts = await _unitOfWork.Carts.GetAll(c => cartID.Contains(c.Id));

        var result = new List<CartDTO>();

        foreach (var cart in carts)
        {
            var book = await _unitOfWork.Books.GetById((int)cart.Book);

            result.Add(new CartDTO
            {
                Id = cart.Id,
                BookId = book.Id,
                Name = book.Name,
                Image = book.Image,
                Price = book.Price,
                Quantity = cart.Quantity
            });
        }

        return result;
    }
    

    public async Task<bool> Insert(Order order, List<CartDTO> cartDTO, bool isInstant)
    {
        await _unitOfWork.Orders.Insert(order);
        int newID = await _unitOfWork.Orders.GetLastId();
        foreach (var cart in cartDTO)
        {
            await _unitOfWork.OrderDetails.Insert(new OrderDetail
            {
                Order = newID,
                Book = cart.BookId,
                Price = cart.Price,
                Quantity = cart.Quantity
            });

            if (!isInstant) await _unitOfWork.Carts.Delete(cart.Id);
        }

        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> UpdateStatus(int id, string status, int? vertify = null)
    {
        await _unitOfWork.Orders.UpdateStatus(id, status, vertify);
        return await _unitOfWork.SaveChanges() > 0;
    }
}