using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entity;
using Core.Interface;
using Application.DTO;
using Application.Interface;

namespace Application.Service;

public class OrderService : IOrderService
{
    private readonly IUnitOfWork _unitOfWork;

    public OrderService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<Order>> GetAll()
    {
        var orders = (await _unitOfWork.Orders.GetAll()).OrderByDescending(o => o.Id);

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

    public async Task<bool> UpdateStatus(int id, int status, int? vertify = null)
    {
        await _unitOfWork.Orders.UpdateStatus(id, status, vertify);
        return await _unitOfWork.SaveChanges() > 0;
    }
}