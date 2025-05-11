using Core.Entity;
using Application.Interface;
using Core.Interface;
using System.Linq.Expressions;

namespace Application.Service;

public class AdminService : IAdminService
{
    private readonly IUnitOfWork _unitOfWork;

    public AdminService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<Admin>> GetAll(Expression<Func<Admin, bool>> expression = null)
    {
        var admins = await _unitOfWork.Admins.GetAll(expression);

        foreach (var admin in admins)
        {
            admin.RoleNavigation = (await _unitOfWork.Roles.GetAll(r => r.Id == admin.Role)).First();
            admin.Password = "";
        }

        return admins;
    }

    public async Task<Admin> GetByUserId(int id)
    {
        return await _unitOfWork.Admins.GetById(id);
    }

    public async Task<List<int?>> GetPermission(int adminId)
    {
        var adminRole = (await GetByUserId(adminId)).Role;
        return (from u in (await _unitOfWork.RolePermissions.GetAll(r => r.Role == adminRole)) select u.Permission).ToList();
    }

    public async Task<List<int>> GetPermissionGroup(int adminId)
    {
        var adminRole = (await GetByUserId(adminId)).Role;
        var rolePermission = await _unitOfWork.RolePermissions.GetAll(r => r.Role == adminRole);
        var permission = await _unitOfWork.Permissions.GetAll();
        var permissionGroup = await _unitOfWork.PermissionGroups.GetAll();

        var permissionResult = (from rp in rolePermission
                                join p in permission on rp.Permission equals p.Id
                                join pg in permissionGroup on p.Group equals pg.Id
                                select pg.Id).Distinct().ToList();

        return permissionResult;
    }

    public async Task<Admin?> Login(Admin admin)
    {
        return await _unitOfWork.Admins.Login(admin);
    }

    public async Task<bool> Insert(Admin admin)
    {
        await _unitOfWork.Admins.Insert(admin);
        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> Update(Admin admin)
    {
        await _unitOfWork.Admins.Update(admin);
        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> ResetPassword(int id)
    {
        await _unitOfWork.Admins.ResetPassword(id);
        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> UpdatePassword(Admin admin, string oldPassword)
    {
        var result = await _unitOfWork.Admins.UpdatePassword(admin, oldPassword);
        return (!result) ? result : await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> UpdateStatus(int id)
    {
        await _unitOfWork.Admins.UpdateStatus(id);
        return await _unitOfWork.SaveChanges() > 0;
    }
}
