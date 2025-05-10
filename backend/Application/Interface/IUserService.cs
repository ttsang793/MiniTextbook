using System.Linq.Expressions;
using Core.Entity;

namespace Application.Interface;

public interface IUserService
{
    Task<IEnumerable<User>> GetAll(Expression<Func<User, bool>> expression = null);

    Task<User> GetByUserId(int id);

    Task<User?> Verify(User user);

    Task<User?> Insert(User user);

    Task<User?> Update(User user);

    Task<bool> UpdatePassword(User user);

    Task<bool> UpdateStatus(int id, string status);
}
