using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entity;

namespace Core.Interface;

public interface IUserRepository : IRepository<User>
{
    Task<User?> Login(User user);

    Task<User?> Insert(User user);

    Task<User?> Update(User user);

    Task<bool> UpdatePassword(User user, string oldPassword);

    Task<bool> DeactivateAccount(int id, string oldPassword);
}
