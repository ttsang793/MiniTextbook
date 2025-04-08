using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTO;
using Core.Entity;

namespace Application.Interface;

public interface IOrderService
{
    Task<IEnumerable<Order>> GetAll();

    Task<IEnumerable<Order>> GetByUserId(int userID);

    Task<IEnumerable<CartDTO>> GetTransactionItems(int[] cartID);

    Task<bool> Insert(Order order, List<CartDTO> cartDTO);

    Task<bool> UpdateStatus(int id, int status, int? vertify = null);
}
