using Core.Entity;

namespace Core.Interface;
public interface ISeriesRepository : IRepository<Series>, IInsert<Series>, IUpdate<Series>, IStatus
{
}
