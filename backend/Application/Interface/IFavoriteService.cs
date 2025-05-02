using Core.Entity;
using Application.DTO;

namespace Application.Interface;

public interface IFavoriteService
{
    Task<List<int>> GetByUserId(int userID);

    Task<bool> Insert(Favorite favorite);

    Task<bool> Delete(Favorite favorite);
}
