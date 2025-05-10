namespace Application.DTO;

public class RolePermissionDTO
{
    public int Id { get; set; }

    public List<int> Permissions { get; set; } = new List<int>();
}
