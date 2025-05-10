using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Application.DTO;
using Application.Interface;
using Core.Entity;
using Core.Interface;

namespace Application.Service;

public class RoleService : IRoleService
{
    private readonly IUnitOfWork _unitOfWork;

    public RoleService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<Role>> GetAllRoles(Expression<Func<Role, bool>> expression = null)
    {
        var roles = await _unitOfWork.Roles.GetAll(expression);

        foreach (var role in roles)
            role.RolePermissions = (await _unitOfWork.RolePermissions.GetAll(rp => rp.Role == role.Id)).ToList();

        return roles;
    }

    public async Task<IEnumerable<PermissionGroup>> GetAllPermissionGroups(Expression<Func<PermissionGroup, bool>> expression = null)
    {
        var permissionGroup = await _unitOfWork.PermissionGroups.GetAll(expression);

        foreach (var group in permissionGroup)
            group.Permissions = (await _unitOfWork.Permissions.GetAll(p => p.Group == group.Id)).ToList();

        return permissionGroup;
    }

    public async Task<Role> GetById(int id)
    {
        var role = await _unitOfWork.Roles.GetById(id);
        role.RolePermissions = (await _unitOfWork.RolePermissions.GetAll(rp => rp.Role == role.Id)).ToList();

        return role;
    }

    public async Task<bool> Insert(Role role)
    {
        await _unitOfWork.Roles.Insert(role);
        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> Update(Role role)
    {
        await _unitOfWork.Roles.Update(role);
        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> UpdatePermission(RolePermissionDTO rolePermissionDTO)
    {
        var rolePermissions = await _unitOfWork.RolePermissions.GetAll(rp => rp.Role == rolePermissionDTO.Id);

        foreach (var rp in rolePermissions)
        {
            if (!rolePermissionDTO.Permissions.Contains((int)rp.Permission!))
            {
                await _unitOfWork.RolePermissions.Delete(rp.Id);
                await _unitOfWork.SaveChanges();
            }
            else rolePermissionDTO.Permissions.Remove((int)rp.Permission);
        }

        bool errorFlag = false;

        foreach (var permission in rolePermissionDTO.Permissions)
        {
            await _unitOfWork.RolePermissions.Insert(new RolePermission { Role = rolePermissionDTO.Id, Permission = permission });
            if (await _unitOfWork.SaveChanges() > 0) continue;
            else
            {
                errorFlag = true;
                break;
            }
        }

        return !errorFlag;
    }

    public async Task<bool> Delete(int id)
    {
        var rolePermissions = await _unitOfWork.RolePermissions.GetAll(rp => rp.Role == id);
        foreach (var rp in rolePermissions) await _unitOfWork.RolePermissions.Delete(rp.Id);

        await _unitOfWork.Roles.Delete(id);
        return await _unitOfWork.SaveChanges() > 0;
    }
}
