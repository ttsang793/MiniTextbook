using Core.Entity;

namespace Core.Interface;

public interface IRolePermissionRepository : IRepository<RolePermission>, IInsert<RolePermission>, IDelete<RolePermission>
{
}
