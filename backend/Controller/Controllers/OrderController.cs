using Core.Entity;
using Application.Interface;
using Application.DTO;
using Microsoft.AspNetCore.Mvc;
namespace Controller.Controllers;

[ApiController]
[Route("/order")]
public class OrderController : ControllerBase
{
    private ILogger<OrderController> _logger;
    private readonly IService _service;

    public OrderController(ILogger<OrderController> logger, IService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("get-history")]
    public async Task<IEnumerable<Order>> GetByUserId(int userID)
    {
        return await _service.Orders.GetByUserId(userID);
    }

    [HttpPost("get-item")]
    public async Task<IEnumerable<CartDTO>> GetTransactionItems(int[] cartID)
    {
        return await _service.Orders.GetTransactionItems(cartID);
    }

    [HttpPost("insert")]
    public async Task<IActionResult> Insert(OrderDTO orderDTO)
    {
        var order = new Order
        {
            User = orderDTO.User,
            Receiver = orderDTO.Receiver,
            Address = orderDTO.Address,
            Phone = orderDTO.Phone,
            Total = orderDTO.Total,
            DatePurchased = DateTime.Now,
            Status = 0,
            PaidMethod = "cash"
        };

        return await _service.Orders.Insert(order, orderDTO.Carts) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("cancel")]
    public async Task<IActionResult> Cancel(int id)
    {
        return await _service.Orders.UpdateStatus(id, -1) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("receive")]
    public async Task<IActionResult> Receive(int id)
    {
        return await _service.Orders.UpdateStatus(id, 4) ? StatusCode(200) : StatusCode(404);
    }
}