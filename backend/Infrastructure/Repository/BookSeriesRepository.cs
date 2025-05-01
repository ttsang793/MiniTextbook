using Core.Entity;
using Core.Interface;
using Infrastructure.Database;

namespace Infrastructure.Repository;

public class BookSeriesRepository : BaseRepository<BookSeries>, IBookSeriesRepository
{
    public BookSeriesRepository(MiniTextbookContext dbContext) : base(dbContext) { }

    public async Task Insert(BookSeries bookSeries)
    {
        GetDbSet().Add(bookSeries);
    }

    public async Task Delete(int bookId)
    {
        var deleteBookSeries = await GetAll(b => b.Book == bookId);
        GetDbSet().RemoveRange(deleteBookSeries);
    }
}
