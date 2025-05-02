namespace Application.DTO;

public partial class ProductDTO
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Image { get; set; }

    public decimal? Price { get; set; }

    public bool IsFavorite { get; set; } = false;
}
