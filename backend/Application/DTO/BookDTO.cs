namespace Application.DTO;

public partial class BookDTO
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Image { get; set; }

    public int? Grade { get; set; }

    public int? Subject { get; set; }

    public int? Publisher { get; set; }

    public decimal? Price { get; set; }

    public List<int> Series { get; set; } = new List<int>();
}
