using System;
using System.Collections.Generic;

namespace Core.Entity;

public partial class PermissionGroup : BaseEntity
{
    public string? Name { get; set; }

    public virtual ICollection<Permission> Permissions { get; set; } = new List<Permission>();
}
