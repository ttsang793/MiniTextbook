using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Core.Entity;

namespace Core.Interface;

public interface IRepository <T> where T : BaseEntity
{
    Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> expression = null);

    Task<T> GetById(int id);

    Task<int> GetLastId();
}

public interface IInsert<T> where T : BaseEntity
{
    Task Insert(T entity);
}

public interface IUpdate<T> where T : BaseEntity
{
    Task Update(T entity);
}

public interface IStatus
{
    Task UpdateStatus(int id);
}

public interface IDelete<T> where T : BaseEntity
{
    Task Delete(int id);
}