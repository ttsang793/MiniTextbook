using System;
using System.Collections.Generic;

namespace Core.Entity;

public partial class Role : BaseEntity
{
    public string? Name { get; set; }

    public virtual ICollection<Admin> Admins { get; set; } = new List<Admin>();

    public virtual ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
}
