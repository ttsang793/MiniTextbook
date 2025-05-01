namespace Application.DTO;

public partial class ProductFilterDTO
{
    public List<int>? Grades { get; set; }
    public List<int>? Publishers { get; set; }
    public List<int>? Subjects { get; set; }
    public List<int>? Series { get; set; }
}
