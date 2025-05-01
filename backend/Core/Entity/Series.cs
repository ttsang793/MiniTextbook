using System;
using System.Collections.Generic;

namespace Core.Entity;

public partial class Series : BaseEntity
{
    public string? Name { get; set; }

    public string? Image { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<BookSeries> BookSeries { get; set; } = new List<BookSeries>();
}