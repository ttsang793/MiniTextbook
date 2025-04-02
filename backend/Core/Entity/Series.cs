using System;
using System.Collections.Generic;

namespace Core.Entity;

public partial class Series : BaseEntity
{
    public string? Name { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<Book> Books { get; set; } = new List<Book>();
}
