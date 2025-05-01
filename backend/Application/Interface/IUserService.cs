using System.Linq.Expressions;
using Core.Entity;

namespace Application.Interface;

public interface IUserService
{
    Task<User> GetByUserId(int id);

    Task<User?> Login(User user);

    Task<User?> Insert(User user);
}
