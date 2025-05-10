namespace Application.Interface;

public interface IService
{
    IAdminService Admins { get; }
    IBookService Books { get; }
    ICartService Carts { get; }
    IFavoriteService Favorites { get; }
    IImageService Images { get; }
    IOrderService Orders { get; }
    IPublisherService Publishers { get; }

    IRoleService Roles { get; }
    ISeriesService Series { get; }
    IStatisticService Statistic { get; }
    ISubjectService Subjects { get; }
    IUserService Users { get; }
}
