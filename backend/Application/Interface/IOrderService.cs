using Application.DTO;
using Core.Entity;

namespace Application.Interface;

public interface IOrderService
{
    Task<IEnumerable<Order>> GetAll();

    Task<IEnumerable<Order>> GetByUserId(int userID);

    Task<IEnumerable<CartDTO>> GetTransactionItems(int[] cartID);

    Task<bool> Insert(Order order, List<CartDTO> cartDTO, bool isInstant);

    Task<bool> UpdateStatus(int id, int status, int? vertify = null);
}
