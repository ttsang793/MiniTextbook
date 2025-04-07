using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interface;

public interface IService
{
    IBookService Books { get; }

    ICartService Carts { get; }

    IFavoriteService Favorites { get; }
    IPublisherService Publishers { get; }
    ISeriesService Series { get; }
    ISubjectService Subjects { get; }
}
