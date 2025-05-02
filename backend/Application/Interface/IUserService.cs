using System.Linq.Expressions;
using Core.Entity;

namespace Application.Interface;

public interface IUserService
{
    Task<User> GetByUserId(int id);

    Task<User?> Login(User user);

    Task<User?> Insert(User user);

    Task<User?> Update(User user);

    Task<bool> UpdatePassword(User user, string oldPassword);

    Task<bool> UpdateStatus(int id);
}
