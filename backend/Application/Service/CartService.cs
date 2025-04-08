using Core.Entity;
using Core.Interface;
using Application.DTO;
using Application.Interface;

namespace Application.Service;

public class CartService : ICartService
{
    private readonly IUnitOfWork _unitOfWork;

    public CartService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<CartDTO>> GetByUserId(int userId)
    {
        var carts = await _unitOfWork.Carts.GetAll(c => c.User == userId);

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

    public async Task<bool> Insert(Cart cart)
    {
        var existingCart = (await _unitOfWork.Carts.GetAll(c => c.User == cart.User && c.Book == cart.Book)).FirstOrDefault();
        if (existingCart == null) await _unitOfWork.Carts.Insert(cart);
        else
        {
            existingCart.Quantity += cart.Quantity;
            await _unitOfWork.Carts.Update(existingCart);
        }
        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> Update(Cart cart)
    {
        await _unitOfWork.Carts.Update(cart);
        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> Delete(int id)
    {
        await _unitOfWork.Carts.Delete(id);
        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> DeleteAll(int userID)
    {
        await _unitOfWork.Carts.DeleteAll(userID);
        return await _unitOfWork.SaveChanges() > 0;
    }
}
