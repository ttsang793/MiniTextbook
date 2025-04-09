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
        book.Image = "/src/images/product/product_" + book.Id  + Path.GetExtension(book.Image);
        GetDbSet().Add(book);
    }

    public async Task Update(Book book)
    {
        book.IsActive = true;
        book.Image = "/src/images/product/product_" + book.Id + Path.GetExtension(book.Image);
        GetDbSet().Update(book);
    }

    public async Task UpdateStatus(int id)
    {
        var book = await GetById(id);
        var oldIsActive = book.IsActive == null ? false : book.IsActive;
        book.IsActive = !oldIsActive;
    }
}
