using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTO;

public partial class UserDTO
{
    public int Id { get; set; }

    public string? Username { get; set; }

    public string? Fullname { get; set; }

    public string? Address { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public string? Avatar { get; set; }
}
