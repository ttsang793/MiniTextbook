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
        User user = await _unitOfWork.Users.GetById(id);
        user.Password = "";
        user.Id = -1;
        return user;
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

    public async Task<User?> Update(User user)
    {
        var result = await _unitOfWork.Users.Update(user);
        if (await _unitOfWork.SaveChanges() > 0) return result;
        return null;
    }

    public async Task<bool> UpdatePassword(User user, string oldPassword)
    {
        var result = await _unitOfWork.Users.UpdatePassword(user, oldPassword);
        return (!result) ? result : await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> DeactivateAccount(int id, string oldPassword)
    {
        await _unitOfWork.Users.DeactivateAccount(id, oldPassword);
        return await _unitOfWork.SaveChanges() > 0;
    }
}
