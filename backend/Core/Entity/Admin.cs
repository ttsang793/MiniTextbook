using System;
using System.Collections.Generic;

namespace Core.Entity;

public partial class Admin : BaseEntity
{
    public string? FirebaseUid { get; set; }

    public string? FullName { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public int? Role { get; set; }

    public bool? IsActive { get; set; }

    public virtual Role? RoleNavigation { get; set; }
}
