﻿namespace Core.Interface;

public interface IUnitOfWork
{
    IBookRepository Books { get; }

    ICartRepository Carts { get; }

    IFavoriteRepository Favorites { get; }

    IPublisherRepository Publishers { get; }

    ISeriesRepository Series { get; }

    ISubjectRepository Subjects { get; }

    IUserRepository Users { get; }

    Task<int> SaveChanges(CancellationToken cancellationToken = default);
}
