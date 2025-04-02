using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Core.Entity;

namespace Application.Interface;

public interface IBookService
{
    Task<IEnumerable<Book>> GetAll(Expression<Func<Book, bool>> expression = null);

    Task<Book> GetById(int id);

    Task<bool> Insert(Book book);

    Task<bool> Update(Book book);

    Task<bool> UpdateStatus(int id);
}
