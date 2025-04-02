using System;
using System.Collections.Generic;

namespace Core.Entity;

public partial class User : BaseEntity
{
    public string? UserName { get; set; }

    public string? Password { get; set; }

    public string? FullName { get; set; }

    public DateTime? Birthday { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public string? Avatar { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
