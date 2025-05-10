using Core.Entity;
using Core.Interface;
using Infrastructure.Database;

namespace Infrastructure.Repository;

public class PermissionRepository : BaseRepository<Permission>, IPermissionRepository
{
    public PermissionRepository(MiniTextbookContext _dbContext) : base(_dbContext) { }
}
