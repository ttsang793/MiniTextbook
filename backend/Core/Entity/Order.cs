using System;
using System.Collections.Generic;

namespace Core.Entity;

public partial class Order : BaseEntity
{
    public int? User { get; set; }

    public string? Receiver { get; set; }

    public string? Address { get; set; }

    public string? Phone { get; set; }

    public decimal? Total { get; set; }

    public DateTime? DatePurchased { get; set; }

    public DateTime? DateVertified { get; set; }

    public DateTime? DateReceived { get; set; }

    public DateTime? DateCanceled { get; set; }

    public int? Status { get; set; }

    public int? VertifyAdmin { get; set; }

    public bool? IsPaid { get; set; }

    public string? PaidMethod { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual User? UserNavigation { get; set; }

    public virtual Admin? VertifyAdminNavigation { get; set; }
}
