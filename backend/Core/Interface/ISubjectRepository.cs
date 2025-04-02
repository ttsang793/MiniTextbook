using Core.Entity;

namespace Core.Interface;
public interface IPublisherRepository : IRepository<Publisher>, IInsert<Publisher>, IUpdate<Publisher>, IStatus
{
}