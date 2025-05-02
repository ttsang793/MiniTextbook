using Core.Entity;
using Core.Interface;
using Application.Interface;
using Application.DTO;
using Microsoft.EntityFrameworkCore;

namespace Application.Service;

public class FavoriteService : IFavoriteService
{
    private readonly IUnitOfWork _unitOfWork;

    public FavoriteService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<List<int>> GetByUserId(int userId)
    {
        var favorites = await _unitOfWork.Favorites.GetAll(f => f.User == userId);
        var result = new List<int>();
        foreach (var favorite in favorites) result.Add((int)favorite.Book!);
        return result;
    }

    public async Task<bool> Insert(Favorite favorite)
    {
        await _unitOfWork.Favorites.Insert(favorite);
        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> Delete(Favorite favorite)
    {
        await _unitOfWork.Favorites.Delete(favorite);
        return await _unitOfWork.SaveChanges() > 0;
    }
}
