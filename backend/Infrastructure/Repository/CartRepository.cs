using Core.Entity;
using Core.Interface;
using Infrastructure.Database;

namespace Infrastructure.Repository;

public class CartRepository : BaseRepository<Cart>, ICartRepository
{
    public CartRepository(MiniTextbookContext _dbContext) : base(_dbContext) { }

    public async Task Insert(Cart cart)
    {
        cart.Id = await GetLastId();
        GetDbSet().Add(cart);
    }

    public async Task Update(Cart cart)
    {
        GetDbSet().Update(cart);
    }

    public async Task Delete(int id)
    {
        var cart = await GetById(id);
        GetDbSet().Remove(cart);
    }
}
