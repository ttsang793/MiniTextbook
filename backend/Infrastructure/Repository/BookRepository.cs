using Core.Entity;
using Core.Interface;
using Infrastructure.Database;

namespace Infrastructure.Repository;

public class BookRepository : BaseRepository<Book>, IBookRepository
{
    public BookRepository(MiniTextbookContext dbContext) : base(dbContext) { }

    public async Task Insert(Book book)
    {
        book.Id = await GetLastId();
        GetDbSet().Add(book);
    }

    public async Task Update(Book book)
    {
        GetDbSet().Update(book);
    }

    public async Task UpdateStatus(int id)
    {
        var book = await GetById(id);
        var oldIsActive = book.IsActive;
        book.IsActive = !oldIsActive;
    }
}
