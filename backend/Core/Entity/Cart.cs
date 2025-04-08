using System;
using System.Collections.Generic;

namespace Core.Entity;

public partial class Cart : BaseEntity
{
    public int? User { get; set; }

    public int? Book { get; set; }

    public int? Quantity { get; set; }

    public virtual User? UserNavigation { get; set; }

    public virtual Book? BookNavigation { get; set; }
}
