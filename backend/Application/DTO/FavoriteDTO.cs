using Core.Entity;

namespace Application.DTO;

public partial class FavoriteDTO
{
    public int Id { get; set; }
    public Book? Book { get; set; }
}
