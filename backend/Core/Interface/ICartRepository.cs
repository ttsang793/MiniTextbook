using Core.Entity;

namespace Core.Interface;

public interface ICartRepository : IRepository<Cart>, IInsert<Cart>, IUpdate<Cart>, IDelete<Cart>
{
}
