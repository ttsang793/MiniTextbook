using System.Linq.Expressions;
using Core.Entity;
using Core.Interface;
using Application.Interface;

namespace Application.Service;

public class UserService : IUserService
{
    private readonly IUnitOfWork _unitOfWork;

    public UserService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    public async Task<User> GetByUserId(int id)
    {
        return await _unitOfWork.Users.GetById(id);
    }

    public async Task<User?> Login(User user)
    {
        return await _unitOfWork.Users.Login(user);
    }

    public async Task<User?> Insert(User user)
    {
        var result = await _unitOfWork.Users.Insert(user);
        if (await _unitOfWork.SaveChanges() > 0) return result;
        return null;
    }
}
