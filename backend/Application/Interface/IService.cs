namespace Application.Interface;

public interface IService
{
    IBookService Books { get; }
    ICartService Carts { get; }
    IFavoriteService Favorites { get; }
    IImageService Images { get; }
    IOrderService Orders { get; }
    IPublisherService Publishers { get; }
    ISeriesService Series { get; }
    ISubjectService Subjects { get; }
    IUserService Users { get; }
}
