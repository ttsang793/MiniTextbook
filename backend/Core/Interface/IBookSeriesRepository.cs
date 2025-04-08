using Core.Entity;

namespace Core.Interface;

public interface IBookSeriesRepository : IRepository<BookSeries>, IInsert<BookSeries>, IDelete<BookSeries>
{
}