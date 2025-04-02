using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Core.Entity;

namespace Application.Interface;

public interface IPublisherService
{
    Task<IEnumerable<Publisher>> GetAll(Expression<Func<Publisher, bool>> expression = null);

    Task<Publisher> GetById(int id);

    Task<bool> Insert(Publisher publisher);

    Task<bool> Update(Publisher publisher);

    Task<bool> UpdateStatus(int id);
}
