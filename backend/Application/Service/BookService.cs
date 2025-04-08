using System.Linq.Expressions;
using Core.Entity;
using Core.Interface;
using Application.Interface;
using Microsoft.EntityFrameworkCore;

namespace Application.Service;

public class BookService : IBookService
{
    private readonly IUnitOfWork _unitOfWork;

    public BookService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<Book>> GetAll(Expression<Func<Book, bool>> expression = null)
    {
        // Step 1: Fetch all books with the provided filter (if any)
        var books = await _unitOfWork.Books.GetAll(expression); // This is the existing method call
        /*
        // Step 2: For each book, manually load the related Series
        foreach (var book in books)
        {
            // This assumes that the Series is lazy-loaded by EF (or another ORM),
            // If lazy-loading is not enabled, you would need to explicitly load the Series using a separate query.
            var series = (await _unitOfWork.Series.GetAll(s => s.Books.Contains(book))).ToList();
            book.Series = series;  // Assign the loaded series to the book
        }*/

        return books;
    }

    public async Task<Book> GetById(int id)
    {
        return await _unitOfWork.Books.GetById(id);
    }

    public async Task<bool> Insert(Book book)
    {
        await _unitOfWork.Books.Insert(book);
        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> Update(Book book)
    {
        await _unitOfWork.Books.Update(book);
        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> UpdateStatus(int id)
    {
        await _unitOfWork.Books.UpdateStatus(id);
        return await _unitOfWork.SaveChanges() > 0;
    }
}
