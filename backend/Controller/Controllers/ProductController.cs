using Core.Entity;
using Application.Interface;
using Application.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
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

    [HttpGet("get")]
    public async Task<Book> GetById(int id)
    {
        return await _service.Books.GetById(id);
    }

    [HttpGet("get-newest")]
    public async Task<IEnumerable<Book>> GetNewest()
    {
        return (await _service.Books.GetAll()).OrderByDescending(b => b.Id).Take(4);
    }

    [HttpPost("get-all")]
    public async Task<IEnumerable<Book>> GetAll([Bind("Grades", "Publishers", "Subjects", "Series")] ProductFilterDTO productFilter, string? name)
    {
        return await _service.Books.GetAllForUser(p =>
            (string.IsNullOrEmpty(name) || p.Name.ToLower().Contains(name.ToLower())) &&
            (productFilter.Grades == null || productFilter.Grades.Contains((int)p.Grade)) &&

            // Check active first
            ((bool)p.PublisherNavigation.IsActive) &&
            ((bool)p.SubjectNavigation.IsActive) &&
            (p.BookSeries.Any(bs => bs.SeriesNavigation.IsActive == true)) &&

            // Then finding stuff
            (productFilter.Publishers == null || productFilter.Publishers.Contains((int)p.Publisher)) &&
            (productFilter.Subjects == null || productFilter.Subjects.Contains((int)p.Subject)) &&
            (productFilter.Series == null || p.BookSeries.Any(bs => productFilter.Series.Contains(bs.Series.GetValueOrDefault()))
        ));
    }

    [HttpGet("get-subject")]
    public async Task<IEnumerable<Subject>> GetSubjects()
    {
        return await _service.Subjects.GetAll(s => s.IsActive == true);
    }

    [HttpGet("get-publisher")]
    public async Task<IEnumerable<Publisher>> GetPublishers()
    {
        return await _service.Publishers.GetAll(p => p.IsActive == true);
    }

    [HttpGet("get-series")]
    public async Task<IEnumerable<Series>> GetSeries()
    {
        return await _service.Series.GetAll(s => s.IsActive == true);
    }
}