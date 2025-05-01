using System.Linq.Expressions;
using Core.Entity;
using Core.Interface;
using Application.DTO;
using Application.Interface;

namespace Application.Service;

public class BookService : IBookService
{
    private readonly IUnitOfWork _unitOfWork;

    public BookService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<Book>> GetAllForUser(Expression<Func<Book, bool>> expression = null)
    {
        return (await _unitOfWork.Books.GetAll(expression)).OrderBy(b => b.Id);
    }

    public async Task<IEnumerable<Book>> GetAll(Expression<Func<Book, bool>> expression = null)
    {
        var books = await _unitOfWork.Books.GetAll(expression);

        foreach (var book in books) {
            book.BookSeries = (await _unitOfWork.BookSeries.GetAll(bs => bs.Book == book.Id)).ToList();
        }

        return books;
    }

    public async Task<Book> GetById(int id)
    {
        return await _unitOfWork.Books.GetById(id);
    }

    public async Task<int> Insert(BookDTO bookDTO)
    {
        Book book = new Book
        {
            Name = bookDTO.Name,
            Image = bookDTO.Image,
            Grade = bookDTO.Grade,
            Subject = bookDTO.Subject,
            Publisher = bookDTO.Publisher,
            Price = bookDTO.Price
        };
        await _unitOfWork.Books.Insert(book);

        int newID = await _unitOfWork.Books.GetLastId();

        foreach (var series in bookDTO.Series)
        {
            await _unitOfWork.BookSeries.Insert(new BookSeries { Book = newID, Series = series });
        }

        return (await _unitOfWork.SaveChanges() > 0) ? await _unitOfWork.Books.GetLastId() - 1 : -1;
    }

    public async Task<bool> Update(BookDTO bookDTO)
    {
        Book book = new Book
        {
            Id = bookDTO.Id,
            Name = bookDTO.Name,
            Image = bookDTO.Image,
            Grade = bookDTO.Grade,
            Subject = bookDTO.Subject,
            Publisher = bookDTO.Publisher,
            Price = bookDTO.Price
        };
        await _unitOfWork.Books.Update(book);
        await _unitOfWork.BookSeries.Delete(bookDTO.Id);

        foreach (var series in bookDTO.Series)
        {
            await _unitOfWork.BookSeries.Insert(new BookSeries { Book = bookDTO.Id, Series = series });
        }

        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> UpdateStatus(int id)
    {
        await _unitOfWork.Books.UpdateStatus(id);
        return await _unitOfWork.SaveChanges() > 0;
    }
}
