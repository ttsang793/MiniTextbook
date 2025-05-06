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
        await GetDbSet().AddAsync(admin);
    }

    public async Task Update(Admin admin)
    {
        GetDbSet().Update(admin);
    }

    public async Task UpdateStatus(int id)
    {
        var admin = await GetById(id);
        admin.IsActive = !admin.IsActive;
    }
}
