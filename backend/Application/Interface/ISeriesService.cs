using System.Linq.Expressions;
using Core.Entity;

namespace Application.Interface;

public interface ISeriesService
{
    Task<IEnumerable<Series>> GetAll(Expression<Func<Series, bool>> expression = null);

    Task<Series> GetById(int id);

    Task<int> Insert(Series series);

    Task<bool> Update(Series series);

    Task<bool> UpdateStatus(int id);
}
