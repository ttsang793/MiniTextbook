using System;
using System.Collections.Generic;

namespace Core.Entity;

public partial class BookSeries : BaseEntity
{
    public int? Book { get; set; }

    public int? Series { get; set; }

    public virtual Book? BookNavigation { get; set; }

    public virtual Series? SeriesNavigation { get; set; }
}