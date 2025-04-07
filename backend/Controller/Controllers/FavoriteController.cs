using Core.Entity;
using Application.Interface;
using Application.DTO;
using Microsoft.AspNetCore.Mvc;
namespace Controller.Controllers;

[ApiController]
[Route("/favorite")]
public class FavoriteController : ControllerBase
{
    private ILogger<FavoriteController> _logger;
    private readonly IService _service;

    public FavoriteController(ILogger<FavoriteController> logger, IService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("get")]
    public async Task<IEnumerable<FavoriteDTO>> GetByUserId(int userID)
    {
        return await _service.Favorites.GetByUserId(userID);
    }

    [HttpPost("insert")]
    public async Task<IActionResult> Insert([Bind("Book", "User")] Favorite favorite)
    {
        return (await _service.Favorites.Insert(favorite)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> Delete([Bind("Book", "User")] Favorite favorite)
    {
        return (await _service.Favorites.Delete(favorite)) ? StatusCode(200) : StatusCode(404);
    }
}