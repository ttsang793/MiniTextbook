namespace Core.Interface;

public interface IUnitOfWork
{
    IAdminRepository Admins { get; }

    IBookRepository Books { get; }

    IBookSeriesRepository BookSeries { get; }

    ICartRepository Carts { get; }

    IFavoriteRepository Favorites { get; }

    IOrderRepository Orders { get; }

    IOrderDetailRepository OrderDetails { get; }

    IPermissionRepository Permissions { get; }

    IPermissionGroupRepository PermissionGroups { get; }

    IPublisherRepository Publishers { get; }

    IRoleRepository Roles { get; }

    IRolePermissionRepository RolePermissions { get; }

    ISeriesRepository Series { get; }

    ISubjectRepository Subjects { get; }

    IUserRepository Users { get; }

    Task<int> SaveChanges(CancellationToken cancellationToken = default);
}
