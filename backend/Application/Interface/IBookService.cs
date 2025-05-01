using System.Linq;
using System.Linq.Expressions;
using Core.Entity;
using Application.DTO;

namespace Application.Interface;

public interface IBookService
{
    Task<IEnumerable<Book>> GetAllForUser(Expression<Func<Book, bool>> expression = null);

    Task<IEnumerable<Book>> GetAll(Expression<Func<Book, bool>> expression = null);

    Task<Book> GetById(int id);

    Task<int> Insert(BookDTO bookDTO);

    Task<bool> Update(BookDTO bookDTO);

    Task<bool> UpdateStatus(int id);
}
