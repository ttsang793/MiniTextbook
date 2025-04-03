using Core.Entity;
using Application.Interface;
using Microsoft.AspNetCore.Mvc;
using Application.DTO;
namespace Controller.Controllers;

[ApiController]
[Route("/product")]
public class ProductController : ControllerBase
{
    private ILogger<ProductController> _logger;
    private readonly IService _service;

    public ProductController(ILogger<ProductController> logger, IService service)
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

    [HttpGet("search")]
    public async Task<IEnumerable<Book>> Search(string? name, int? grade, int? subject, int? publisher)
    {
        return await _service.Books.GetAll(p =>
            (string.IsNullOrEmpty(name) || p.Name.ToLower().Contains(name.ToLower())) &&
            (grade == null || p.Grade == grade) &&
            (subject == null || p.Subject == subject) &&
            (publisher == null || p.Publisher == publisher)
        );
    }
}