using Core.Entity;
using Core.Interface;
using Infrastructure.Database;

namespace Infrastructure.Repository;

public class PublisherRepository : BaseRepository<Publisher>, IPublisherRepository
{
    public PublisherRepository(MiniTextbookContext dbContext) : base(dbContext) { }

    public async Task Insert(Publisher publisher)
    {
        publisher.Id = await GetLastId();
        GetDbSet().Add(publisher);
    }

    public async Task Update(Publisher publisher)
    {
        GetDbSet().Update(publisher);
    }

    public async Task UpdateStatus(int id)
    {
        var publisher = await GetById(id);
        var oldIsActive = publisher.IsActive == null ? false : publisher.IsActive;
        publisher.IsActive = !oldIsActive;
    }
}
