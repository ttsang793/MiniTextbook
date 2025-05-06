using System.Linq.Expressions;
using Application.DTO;
using Core.Entity;

namespace Application.Interface;

public interface IOrderService
{
    Task<IEnumerable<Order>> GetAll(Expression<Func<Order, bool>> expression = null);

    Task<IEnumerable<Order>> GetByUserId(int userID);

    Task<List<string>> GetAllReceiver();

    Task<List<string>> GetAllAddress();

    Task<IEnumerable<CartDTO>> GetTransactionItems(int[] cartID);

    Task<bool> Insert(Order order, List<CartDTO> cartDTO, bool isInstant);

    Task<bool> UpdateStatus(int id, int status, int? vertify = null);
}
