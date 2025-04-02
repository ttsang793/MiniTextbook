using Core.Entity;

namespace Core.Interface;

public interface IBookRepository : IRepository<Book>, IInsert<Book>, IUpdate<Book>, IStatus
{
}
