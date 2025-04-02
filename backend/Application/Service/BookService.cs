using System.Linq.Expressions;
using Core.Entity;
using Core.Interface;
using Application.Interface;

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
        return await _unitOfWork.Books.GetAll(expression);
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
