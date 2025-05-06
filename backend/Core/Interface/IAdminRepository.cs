using Core.Entity;

namespace Core.Interface;

public interface IAdminRepository : IRepository<Admin>, IInsert<Admin>, IUpdate<Admin>, IStatus
{
    Task<Admin?> Login(Admin admin);
}