using Core.Entity;
using Core.Interface;
using Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository;

public class RolePermissionRepository : BaseRepository<RolePermission>, IRolePermissionRepository
{
    public RolePermissionRepository(MiniTextbookContext _dbContext) : base(_dbContext) { }

    public async Task Insert(RolePermission rolePermission)
    {
        rolePermission.Id = await GetLastId();
        await GetDbSet().AddAsync(rolePermission);
    }

    public async Task Delete(int id)
    {
        GetDbSet().Remove(await GetById(id));
    }
}
