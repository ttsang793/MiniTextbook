using Core.Entity;

namespace Core.Interface;

public interface IUserRepository : IRepository<User>
{
    Task<User?> Verify(User user);

    Task<User?> Insert(User user);

    Task<User?> Update(User user);

    Task UpdateAddress(User user);

    Task UpdatePassword(User user);

    Task UpdateStatus(int id, string status);
}
