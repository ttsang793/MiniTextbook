namespace Application.DTO;

public class CartDTO
{
    public int Id { get; set; }

    public int BookId { get; set; }

    public string? Name { get; set; }

    public string? Image { get; set; }

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }
}
