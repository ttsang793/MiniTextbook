using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entity;
using Core.Interface;
using Infrastructure.Database;

namespace Infrastructure.Repository;

public class RoleRepository : BaseRepository<Role>, IRoleRepository
{
    public RoleRepository(MiniTextbookContext _dbContext) : base(_dbContext) { }

    public async Task Insert(Role role)
    {
        role.Id = await GetLastId();
        await GetDbSet().AddAsync(role);
    }

    public async Task Update(Role role)
    {
        GetDbSet().Update(role);
    }

    public async Task Delete(int id)
    {
        var role = await GetById(id);
        GetDbSet().Remove(role);
    }
}
