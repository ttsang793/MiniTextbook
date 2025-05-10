using Core.Entity;
using Core.Interface;
using Infrastructure.Database;

namespace Infrastructure.Repository;

public class PermissionGroupRepository : BaseRepository<PermissionGroup>, IPermissionGroupRepository
{
    public PermissionGroupRepository(MiniTextbookContext _dbContext) : base(_dbContext) { }
}
