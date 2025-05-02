using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entity;
using Core.Interface;
using Infrastructure.Database;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Repository;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    private PasswordHasher<User> passwordHasher = new PasswordHasher<User>();

    public UserRepository(MiniTextbookContext _dbContext) : base(_dbContext) { }

    public async Task<User?> Login(User user)
    {
        var result = (await GetAll(u => u.Username == user.Username)).FirstOrDefault();
        if (result != null)
        {
            var verfityResult = passwordHasher.VerifyHashedPassword(result, result.Password, user.Password);
            if (verfityResult == PasswordVerificationResult.Success)
                return new User { Id = result.Id, Avatar = result.Avatar, Fullname = result.Fullname };
            return new User { Fullname = "Nhập sai mật khẩu." };
        }
        return new User { Fullname = "Username không tồn tại." };
    }

    public async Task<User?> Insert(User user)
    {
        var result = (await GetAll(u => u.Username == user.Username)).FirstOrDefault();
        if (result != null) return null;

        user.Id = await GetLastId();
        user.Password = passwordHasher.HashPassword(user, user.Password);
        user.Avatar = "/src/images/avatar/default.jpg";
        await GetDbSet().AddAsync(user);

        return new User { Id = user.Id, Avatar = user.Avatar, Fullname = user.Fullname };
    }

    public async Task<User?> Update(User user)
    {
        var result = (await GetAll(u => u.Username == user.Username && u.Id != user.Id)).FirstOrDefault();
        if (result != null) return new User { Fullname = "Username đã tồn tại" };

        if (user.Avatar != "/src/images/avatar/default.jpg")
            user.Avatar = "/src/images/avatar/" + user.Username + Path.GetExtension(user.Avatar);
        GetDbSet().Update(user);

        return new User { Id = user.Id, Avatar = user.Avatar, Fullname = user.Fullname };
    }

    public async Task<bool> UpdatePassword(User user, string oldPassword)
    {
        var result = passwordHasher.VerifyHashedPassword(user, (await GetById(user.Id)).Password, oldPassword);
        if (result == PasswordVerificationResult.Failed) return false;

        user.Password = passwordHasher.HashPassword(user, user.Password);
        GetDbSet().Update(user);

        return true;
    }

    public async Task UpdateStatus(int id)
    {
        var user = await GetById(id);
        user.IsActive = false;
    }
}
