using Core.Entity;

namespace Core.Interface;

public interface IOrderDetailRepository : IRepository<OrderDetail>, IInsert<OrderDetail>
{
}
