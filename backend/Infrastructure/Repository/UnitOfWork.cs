using Core.Interface;
using Infrastructure.Database;

namespace Infrastructure.Repository;

public class UnitOfWork : IUnitOfWork
{
    private readonly MiniTextbookContext _dbContext;
    private IBookRepository? _bookRepository;
    private IPublisherRepository? _publisherRepository;
    private ISeriesRepository? _seriesRepository;
    private ISubjectRepository? _subjectRepository;
    private IUserRepository? _userRepository;

    public UnitOfWork(MiniTextbookContext dbContext)
    {
        _dbContext = dbContext;
    }

    public IBookRepository Books => _bookRepository ??= new BookRepository(_dbContext);
    public IPublisherRepository Publishers => _publisherRepository ??= new PublisherRepository(_dbContext);
    public ISeriesRepository Series => _seriesRepository ??= new SeriesRepository(_dbContext);
    public ISubjectRepository Subjects => _subjectRepository ??= new SubjectRepository(_dbContext);
    public IUserRepository Users => _userRepository ??= new UserRepository(_dbContext);

    public async Task<int> SaveChanges(CancellationToken cancellationToken = default)
    {
        return await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
