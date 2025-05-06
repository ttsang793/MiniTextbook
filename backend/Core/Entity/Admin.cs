using System;
using System.Collections.Generic;

namespace Core.Entity;

public partial class Admin : BaseEntity
{
    public string? Password { get; set; }

    public string? Fullname { get; set; }

    public TimeSpan? TimeBegin { get; set; }

    public TimeSpan? TimeEnd { get; set; }

    public int? Role { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual Role? RoleNavigation { get; set; }
}
