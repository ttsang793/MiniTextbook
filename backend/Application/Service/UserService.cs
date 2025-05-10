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

    public async Task<IEnumerable<User>> GetAll(Expression<Func<User, bool>> expression = null)
    {
        var users = await _unitOfWork.Users.GetAll(expression);
        return (from u in users select new User { Id = u.Id, Username = u.Username, Status = u.Status }).ToList();
    }

    public async Task<User> GetByUserId(int id)
    {
        return await _unitOfWork.Users.GetById(id);
    }

    public async Task<User?> Verify(User user)
    {
        return await _unitOfWork.Users.Verify(user);
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

    public async Task<bool> UpdatePassword(User user)
    {
        await _unitOfWork.Users.UpdatePassword(user);
        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> UpdateStatus(int id, string status)
    {
        await _unitOfWork.Users.UpdateStatus(id, status);
        return await _unitOfWork.SaveChanges() > 0;
    }
}
