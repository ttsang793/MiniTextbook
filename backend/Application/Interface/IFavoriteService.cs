using Core.Entity;
using Application.DTO;

namespace Application.Interface;

public interface IFavoriteService
{
    Task<IEnumerable<FavoriteDTO>> GetByUserId(int userID);

    Task<bool> Insert(Favorite favorite);

    Task<bool> Delete(Favorite favorite);
}
