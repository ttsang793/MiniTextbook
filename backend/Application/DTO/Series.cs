using System;
using System.Collections.Generic;

namespace Application.DTO;

public partial class Series
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public bool? IsActive { get; set; }
}
