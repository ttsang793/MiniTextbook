using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Core.Entity;

namespace Application.Interface;

public interface ISubjectService
{
    Task<IEnumerable<Subject>> GetAll(Expression<Func<Subject, bool>> expression = null);

    Task<Subject> GetById(int id);

    Task<bool> Insert(Subject subject);

    Task<bool> Update(Subject subject);

    Task<bool> UpdateStatus(int id);
}
