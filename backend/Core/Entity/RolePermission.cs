using System;
using System.Collections.Generic;

namespace Core.Entity;

public partial class RolePermission : BaseEntity
{
    public int? Role { get; set; }

    public int? Permission { get; set; }

    public virtual Permission? PermissionNavigation { get; set; }

    public virtual Role? RoleNavigation { get; set; }
}
