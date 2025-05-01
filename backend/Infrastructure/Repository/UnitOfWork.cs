using Core.Interface;
using Infrastructure.Database;

namespace Infrastructure.Repository;

public class UnitOfWork : IUnitOfWork
{
    private readonly MiniTextbookContext _dbContext;
    private IBookRepository? _bookRepository;
    private IBookSeriesRepository? _bookSeriesRepository;
    private ICartRepository? _cartRepository;
    private IFavoriteRepository? _favoriteRepository;
    private IOrderRepository? _orderRepository;
    private IOrderDetailRepository? _orderDetailRepository;
    private IPublisherRepository? _publisherRepository;
    private ISeriesRepository? _seriesRepository;
    private ISubjectRepository? _subjectRepository;
    private IUserRepository? _userRepository;

    public UnitOfWork(MiniTextbookContext dbContext)
    {
        _dbContext = dbContext;
    }

    public IBookRepository Books => _bookRepository ??= new BookRepository(_dbContext);
    public IBookSeriesRepository BookSeries => _bookSeriesRepository ??= new BookSeriesRepository(_dbContext);
    public ICartRepository Carts => _cartRepository ??= new CartRepository(_dbContext);
    public IFavoriteRepository Favorites => _favoriteRepository ??= new FavoriteRepository(_dbContext);
    public IOrderRepository Orders => _orderRepository ??= new OrderRepository(_dbContext);
    public IOrderDetailRepository OrderDetails => _orderDetailRepository ??= new OrderDetailRepository(_dbContext);
    public IPublisherRepository Publishers => _publisherRepository ??= new PublisherRepository(_dbContext);
    public ISeriesRepository Series => _seriesRepository ??= new SeriesRepository(_dbContext);
    public ISubjectRepository Subjects => _subjectRepository ??= new SubjectRepository(_dbContext);
    public IUserRepository Users => _userRepository ??= new UserRepository(_dbContext);

    public async Task<int> SaveChanges(CancellationToken cancellationToken = default)
    {
        return await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
