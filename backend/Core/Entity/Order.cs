using System;
using System.Collections.Generic;

namespace Core.Entity;

public partial class Order : BaseEntity
{
    public string? Address { get; set; }

    public int? User { get; set; }

    public decimal? ShipCost { get; set; }

    public decimal? Total { get; set; }

    public bool? IsPaid { get; set; }

    public string? PaidMethod { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual User? UserNavigation { get; set; }
}
