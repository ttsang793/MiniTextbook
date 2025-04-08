using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entity;
using Core.Interface;
using Infrastructure.Database;

namespace Infrastructure.Repository;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    public UserRepository(MiniTextbookContext _dbContext) : base(_dbContext) { }

    public async Task<bool> Login(string username, string password)
    {
        bool result = (await GetAll(u => u.Username == username && u.Password == password)).ToList().Count() > 0;
        return result;
    }

    public async Task Insert(User user)
    {
        user.Id = await GetLastId() + 1; 
        await GetDbSet().AddAsync(user);
    }
}
