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
    public async Task<IActionResult> GetByUserId()
    {
        if (HttpContext.Session.GetInt32("id") != null)
        {
            var favoriteList = await _service.Favorites.GetByUserId((int)HttpContext.Session.GetInt32("id")!);
            var bookList = await _service.Books.GetAllForUser(b => favoriteList.Contains(b.Id));
            var productList = new List<ProductDTO>();

            foreach (var book in bookList)
            {
                productList.Add(new ProductDTO
                {
                    Id = book.Id,
                    Name = book.Name,
                    Image = book.Image,
                    Price = book.Price,
                    IsFavorite = true
                });
            }

            return Ok(productList);
        }
        return StatusCode(404);
    }

    [HttpPost("insert")]
    public async Task<IActionResult> Insert([Bind("Book")] Favorite favorite)
    {
        if (HttpContext.Session.GetInt32("id") != null)
        {
            favorite.User = (int)HttpContext.Session.GetInt32("id")!;
            return (await _service.Favorites.Insert(favorite)) ? StatusCode(200) : StatusCode(404);
        }
        return StatusCode(403);
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> Delete([Bind("Book")] Favorite favorite)
    {
        if (HttpContext.Session.GetInt32("id") != null)
        {
            favorite.User = (int)HttpContext.Session.GetInt32("id")!;
            return (await _service.Favorites.Delete(favorite)) ? StatusCode(200) : StatusCode(404);
        }
        return StatusCode(403);
    }
}