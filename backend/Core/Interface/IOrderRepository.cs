using Core.Entity;

namespace Core.Interface;

public interface IOrderRepository : IRepository<Order>, IInsert<Order>
{
    Task UpdateStatus(int id, int status, int? vertify);
}