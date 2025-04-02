using System;
using System.Collections.Generic;

namespace Core.Entity;

public partial class Permission : BaseEntity
{
    public string? Name { get; set; }

    public int? Group { get; set; }

    public virtual PermissionGroup? GroupNavigation { get; set; }

    public virtual ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
}
