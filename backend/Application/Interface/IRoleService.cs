using System.Linq.Expressions;
using Application.DTO;
using Core.Entity;

namespace Application.Interface;

public interface IRoleService
{
    Task<IEnumerable<Role>> GetAllRoles(Expression<Func<Role, bool>> expression = null);

    Task<IEnumerable<PermissionGroup>> GetAllPermissionGroups(Expression<Func<PermissionGroup, bool>> expression = null);

    Task<Role> GetById(int id);

    Task<bool> Insert(Role role);

    Task<bool> Update(Role role);

    Task<bool> UpdatePermission(RolePermissionDTO rolePermissionDTO);

    Task<bool> Delete(int id);
}
