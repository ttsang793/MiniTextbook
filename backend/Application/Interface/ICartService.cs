using Core.Entity;
using Application.DTO;

namespace Application.Interface;

public interface ICartService
{
    Task<IEnumerable<CartDTO>> GetByUserId(int userID);

    Task<bool> Insert(Cart cart);

    Task<bool> Update(Cart cart);

    Task<bool> Delete(int id);
}
