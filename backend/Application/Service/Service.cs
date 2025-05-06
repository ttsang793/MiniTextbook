using Application.Interface;
using Core.Interface;

namespace Application.Service;

public class Service : IService
{
    private readonly IUnitOfWork _unitOfWork;
    private IAdminService? _adminService;
    private IBookService? _bookService;
    private ICartService? _cartService;
    private IFavoriteService? _favoriteService;
    private IImageService? _imageService;
    private IOrderService? _orderService;
    private IPublisherService? _publisherService;
    private ISeriesService? _seriesService;
    private IStatisticService? _statisticService;
    private ISubjectService? _subjectService;
    private IUserService? _userService;

    public Service(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public IAdminService Admins => _adminService ??= new AdminService(_unitOfWork);
    public IBookService Books => _bookService ??= new BookService(_unitOfWork);
    public ICartService Carts => _cartService ??= new CartService(_unitOfWork);
    public IFavoriteService Favorites => _favoriteService ??= new FavoriteService(_unitOfWork);
    public IImageService Images => _imageService ??= new ImageService();
    public IOrderService Orders => _orderService ??= new OrderService(_unitOfWork);
    public IPublisherService Publishers => _publisherService ??= new PublisherService(_unitOfWork);
    public ISeriesService Series => _seriesService ??= new SeriesService(_unitOfWork);
    public IStatisticService Statistic => _statisticService ??= new StatisticService(_unitOfWork);
    public ISubjectService Subjects => _subjectService ??= new SubjectService(_unitOfWork);
    public IUserService Users => _userService ??= new UserService(_unitOfWork);
}
