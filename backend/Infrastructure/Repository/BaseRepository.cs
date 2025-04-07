using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Core.Entity;
using Core.Interface;
using Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository;

public class BaseRepository<T> : IRepository<T> where T : BaseEntity
{
    private readonly MiniTextbookContext _dbContext;

    public BaseRepository(MiniTextbookContext dbContext)
    {
        _dbContext = dbContext;
    }

    protected DbSet<T> GetDbSet()
    {
        return _dbContext.Set<T>();
    }

    public async Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> expression = null)
    {
        if (expression == null) return await GetDbSet().ToListAsync();
        else return await GetDbSet().Where(expression).ToListAsync();
    }

    public async Task<T> GetById(int id)
    {
        return await GetDbSet().Where(o => o.Id == id).FirstAsync();
    }

    public async Task<int> GetLastId()
    {
        return (await GetDbSet().OrderBy(b => b.Id).LastAsync()).Id + 1;
    }
}
