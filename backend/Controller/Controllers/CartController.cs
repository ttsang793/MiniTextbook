using Core.Entity;
using Application.Interface;
using Application.DTO;
using Microsoft.AspNetCore.Mvc;
namespace Controller.Controllers;

[ApiController]
[Route("/cart")]
public class CartController : ControllerBase
{
    private ILogger<CartController> _logger;
    private readonly IService _service;

    public CartController(ILogger<CartController> logger, IService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("get")]
    public async Task<IEnumerable<CartDTO>> GetByUserId(int userID)
    {
        return await _service.Carts.GetByUserId(userID);
    }

    [HttpPost("insert")]
    public async Task<IActionResult> Insert([Bind("Book", "Quantity", "User")]Cart cart)
    {
        return (await _service.Carts.Insert(cart)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([Bind("Id", "Book", "Quantity", "User")] Cart cart)
    {
        return (await _service.Carts.Update(cart)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> Delete(int id)
    {
        return (await _service.Carts.Delete(id)) ? StatusCode(200) : StatusCode(404);
    }
}