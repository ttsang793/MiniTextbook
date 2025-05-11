using Core.Entity;
using Core.Interface;
using Infrastructure.Database;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    private PasswordHasher<User> passwordHasher = new PasswordHasher<User>();

    public UserRepository(MiniTextbookContext _dbContext) : base(_dbContext) { }

    public async Task<User?> Verify(User user)
    {
        var result = (await GetAll(u => u.Username == user.Username && u.Status != "Đã khóa")).FirstOrDefault();
        if (result != null)
        {
            var verfityResult = passwordHasher.VerifyHashedPassword(result, result.Password, user.Password);
            if (verfityResult == PasswordVerificationResult.Success)
                return new User { Id = result.Id, Avatar = result.Avatar, Fullname = result.Fullname, Status = result.Status };
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
        var updateUser = await GetById(user.Id);
        if (updateUser.Username != user.Username)
        {
            var result = (await GetAll(u => u.Username == user.Username && u.Id != user.Id)).FirstOrDefault();
            if (result != null) return new User { Fullname = "Username đã tồn tại" };
            else updateUser.Username = user.Username;
        }

        if (user.Avatar != "/src/images/avatar/default.jpg")
            updateUser.Avatar = "/src/images/avatar/avatar_" + user.Username + Path.GetExtension(user.Avatar);
        
        updateUser.Address = user.Address;
        updateUser.Phone = user.Phone;
        updateUser.Email = user.Email;
        GetDbSet().Update(updateUser);

        return new User { Id = updateUser.Id, Avatar = updateUser.Avatar, Fullname = updateUser.Fullname };
    }

    public async Task UpdateAddress(User user)
    {
        var updateUser = await GetById(user.Id);
        updateUser.Address = user.Address;
        updateUser.Phone = user.Phone;
        GetDbSet().Update(updateUser);
    }

    public async Task UpdatePassword(User user)
    {
        var updateUser = await GetById(user.Id);
        updateUser.Status = "Đang sử dụng";
        updateUser.Password = passwordHasher.HashPassword(updateUser, user.Password);
        GetDbSet().Update(updateUser);
    }

    public async Task UpdateStatus(int id, string status)
    {
        var user = await GetById(id);
        if (status != "Đang sử dụng") user.Password = passwordHasher.HashPassword(user, user.Username);
        user.Status = status;
    }
}
