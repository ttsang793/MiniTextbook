using Core.Entity;
using Core.Interface;
using Infrastructure.Database;

namespace Infrastructure.Repository;

public class SubjectRepository : BaseRepository<Subject>, ISubjectRepository
{
    public SubjectRepository(MiniTextbookContext dbContext) : base(dbContext) { }

    public async Task Insert(Subject subject)
    {
        subject.Id = await GetLastId();
        GetDbSet().Add(subject);
    }

    public async Task Update(Subject subject)
    {
        GetDbSet().Update(subject);
    }

    public async Task UpdateStatus(int id)
    {
        var subject = await GetById(id);
        var oldIsActive = subject.IsActive == null ? false : subject.IsActive;
        subject.IsActive = !oldIsActive;
    }
}
