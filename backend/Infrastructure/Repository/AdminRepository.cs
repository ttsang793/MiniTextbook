using Core.Entity;
using Core.Interface;
using Infrastructure.Database;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Repository;

public class AdminRepository : BaseRepository<Admin>, IAdminRepository
{
    private PasswordHasher<Admin> passwordHasher = new PasswordHasher<Admin>();

    public AdminRepository(MiniTextbookContext dbContext) : base(dbContext) { }

    public async Task<Admin?> Login(Admin admin)
    {
        TimeSpan currentTime = DateTime.Now.TimeOfDay;

        var result = (await GetAll(a => a.Id == admin.Id && a.IsActive == true)).FirstOrDefault();
        if (result != null)
        {
            if (
                (result.TimeBegin < result.TimeEnd && (currentTime < result.TimeBegin || currentTime > result.TimeEnd)) || //VD: 6-14, 14-22...
                (result.TimeBegin > result.TimeEnd && currentTime < result.TimeBegin && currentTime > result.TimeEnd) //VD: 22-6
            ) return new Admin { Fullname = "Kiểm tra lại ca làm việc của bạn." };

            var verfityResult = passwordHasher.VerifyHashedPassword(result, result.Password, admin.Password);
            if (verfityResult == PasswordVerificationResult.Success)
                return new Admin { Fullname = result.Fullname, TimeBegin = result.TimeBegin, TimeEnd = result.TimeEnd };
            return new Admin{ Fullname = "Nhập sai mật khẩu." };
        }
        return new Admin { Fullname = "Kiểm tra lại mã nhân viên." };
    }

    public async Task Insert(Admin admin)
    {
        admin.Password = passwordHasher.HashPassword(admin, admin.Id + "");
        await GetDbSet().AddAsync(admin);
    }

    public async Task Update(Admin admin)
    {
        var updateAdmin = await GetById(admin.Id);
        updateAdmin.Fullname = admin.Fullname;
        updateAdmin.TimeBegin = admin.TimeBegin;
        updateAdmin.TimeEnd = admin.TimeEnd;
        updateAdmin.Role = admin.Role;

        GetDbSet().Update(updateAdmin);
    }

    public async Task ResetPassword(int id)
    {
        var admin = await GetById(id);
        admin.Password = passwordHasher.HashPassword(admin, admin.Id + "");
        GetDbSet().Update(admin);
    }

    public async Task<bool> UpdatePassword(Admin admin, string oldPassword)
    {
        var updateAdmin = await GetById(admin.Id);
        var result = passwordHasher.VerifyHashedPassword(updateAdmin, updateAdmin.Password, oldPassword);
        if (result == PasswordVerificationResult.Failed) return false;

        updateAdmin.Password = passwordHasher.HashPassword(updateAdmin, admin.Password);
        GetDbSet().Update(updateAdmin);

        return true;
    }

    public async Task UpdateStatus(int id)
    {
        var admin = await GetById(id);
        admin.IsActive = !admin.IsActive;
        admin.Password = passwordHasher.HashPassword(admin, admin.Id + "");
    }
}
