using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTO;

public partial class OrderDTO
{
    public int? User { get; set; }

    public string? Receiver { get; set; }

    public string? Address { get; set; }

    public string? Phone { get; set; }

    public decimal? Total { get; set; }

    public virtual List<CartDTO> Carts { get; set; } = new List<CartDTO>();
}
