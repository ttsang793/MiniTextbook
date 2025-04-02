using Core.Entity;
using Application.Interface;
using Microsoft.AspNetCore.Mvc;
namespace Controller.Controllers;

[ApiController]
[Route("/book")]
public class BookController : ControllerBase
{
    private ILogger<BookController> _logger;
    private readonly IService _service;

    public BookController(ILogger<BookController> logger, IService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("get-all")]
    public async Task<IEnumerable<Book>> GetAll()
    {
        return await _service.Books.GetAll();
    }

    [HttpGet("get")]
    public async Task<Book> GetById(int id)
    {
        return await _service.Books.GetById(id);
    }
}
