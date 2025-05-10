using Core.Entity;

namespace Application.DTO;

public partial class RoleRedelegateDTO
{
    public List<Admin> Admins { get; set; } = new List<Admin>();
}
