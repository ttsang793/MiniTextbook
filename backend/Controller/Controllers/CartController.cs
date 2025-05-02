using Core.Entity;
using Application.Interface;
using Application.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
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
    public async Task<IActionResult> GetByUserId()
    {
        if (HttpContext.Session.GetInt32("id") != null)
            return Ok(await _service.Carts.GetByUserId((int)HttpContext.Session.GetInt32("id")!));
        return StatusCode(404);
    }

    [HttpPost("insert")]
    public async Task<IActionResult> Insert([Bind("Book", "Quantity")]Cart cart)
    {
        if (HttpContext.Session.GetInt32("id") != null)
        {
            cart.User = (int)HttpContext.Session.GetInt32("id")!;
            return (await _service.Carts.Insert(cart)) ? StatusCode(200) : StatusCode(404);
        }
        return StatusCode(403);
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([Bind("Id", "Book", "Quantity")] Cart cart)
    {
        if (HttpContext.Session.GetInt32("id") != null)
        {
            cart.User = (int)HttpContext.Session.GetInt32("id")!;
            return (await _service.Carts.Update(cart)) ? StatusCode(200) : StatusCode(404);
        }
        return StatusCode(403);
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> Delete(int id)
    {
        if (HttpContext.Session.GetInt32("id") != null)
            return (await _service.Carts.Delete(id)) ? StatusCode(200) : StatusCode(404);
        return StatusCode(403);
    }

    [HttpDelete("delete-all")]
    public async Task<IActionResult> DeleteAll()
    {
        if (HttpContext.Session.GetInt32("id") != null)
        {
            int userID = (int)HttpContext.Session.GetInt32("id")!;
            return (await _service.Carts.DeleteAll(userID)) ? StatusCode(200) : StatusCode(404);
        }
        return StatusCode(403);
    }
}