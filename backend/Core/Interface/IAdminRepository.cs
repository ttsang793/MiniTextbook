using Core.Entity;

namespace Core.Interface;

public interface IAdminRepository : IRepository<Admin>, IInsert<Admin>, IUpdate<Admin>, IStatus
{
    Task<Admin?> Login(Admin admin);

    Task ResetPassword(int id);

    Task<bool> UpdatePassword(Admin admin, string oldPassword);
}