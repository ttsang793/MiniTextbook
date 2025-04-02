using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entity;

namespace Core.Interface;

public interface IUserRepository : IRepository<User>, IInsert<User>
{
    Task<bool> Login(string username, string password);
}
