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

    public async Task<User?> Login(User user)
    {
        var result = (await GetAll(u => u.Username == user.Username && u.Password == user.Password)).FirstOrDefault();

        if (result != null) return new User { Id = result.Id, Avatar = result.Avatar, Fullname = result.Fullname };
        else return null;
    }

    public async Task<User?> Insert(User user)
    {
        user.Id = await GetLastId();
        user.Avatar = "/src/images/avatar/default.jpg";
        await GetDbSet().AddAsync(user);

        return new User { Id = user.Id, Avatar = user.Avatar, Fullname = user.Fullname };
    }
}
