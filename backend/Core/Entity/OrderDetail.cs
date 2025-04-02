using System;
using System.Collections.Generic;

namespace Core.Entity;

public partial class OrderDetail : BaseEntity
{
    public int? Order { get; set; }

    public int? Book { get; set; }

    public int? Quantity { get; set; }

    public decimal? Price { get; set; }

    public virtual Book? BookNavigation { get; set; }

    public virtual Order? OrderNavigation { get; set; }
}
