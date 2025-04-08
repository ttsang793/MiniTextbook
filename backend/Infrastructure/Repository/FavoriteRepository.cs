using Core.Entity;
using Core.Interface;
using Infrastructure.Database;

namespace Infrastructure.Repository;

public class FavoriteRepository : BaseRepository<Favorite>, IFavoriteRepository
{
    public FavoriteRepository(MiniTextbookContext _dbContext) : base(_dbContext) { }

    public async Task Insert(Favorite favorite)
    {
        GetDbSet().Add(favorite);
    }

    public async Task Delete(Favorite favorite)
    {
        var delFavorite = (await GetAll(f => f.User == favorite.User && f.Book == favorite.Book)).First();
        GetDbSet().Remove(delFavorite);
    }
}
