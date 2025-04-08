using System;
using System.Collections.Generic;

namespace Core.Entity;

public partial class Book : BaseEntity
{
    public string? Name { get; set; }

    public string? Image { get; set; }

    public int? Grade { get; set; }

    public int? Subject { get; set; }

    public int? Publisher { get; set; }

    public decimal? Price { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<BookSeries> BookSeries { get; set; } = new List<BookSeries>();

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual Publisher? PublisherNavigation { get; set; }

    public virtual Subject? SubjectNavigation { get; set; }
}
