using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Core.Entity;

namespace Application.Interface;

public interface ISeriesService
{
    Task<IEnumerable<Series>> GetAll(Expression<Func<Series, bool>> expression = null);

    Task<Series> GetById(int id);

    Task<bool> Insert(Series series);

    Task<bool> Update(Series series);

    Task<bool> UpdateStatus(int id);
}
