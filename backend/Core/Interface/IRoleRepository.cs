using Core.Entity;

namespace Core.Interface;

public interface IRoleRepository : IRepository<Role>, IInsert<Role>, IUpdate<Role>, IDelete<Role>
{
}
