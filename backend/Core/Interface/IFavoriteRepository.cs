using Core.Entity;

namespace Core.Interface;

public interface IFavoriteRepository : IRepository<Favorite>, IInsert<Favorite>
{
    Task Delete(Favorite favorite);
}
