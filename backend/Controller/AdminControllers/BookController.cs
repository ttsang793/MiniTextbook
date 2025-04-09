using Core.Entity;
using Application.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace Controller.AdminControllers;
[ApiController]
[Route("/admin/book")]
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
    public async Task<IEnumerable<Book>> Search(int? id, string? name)
    {
        if (id == null) return await _service.Books.GetAll(s => s.Name.ToLower().Contains(name.ToLower()));
        return new List<Book>() { await _service.Books.GetById((int)id) };
    }

    [HttpPost("insert")]
    public async Task<IActionResult> Insert([FromForm] [Bind("Name", "Image", "Grade", "Subject", "Publisher", "Price")] Book book, IFormFile file)
    {
        int id = await _service.Books.Insert(book);
        if (id == -1) return StatusCode(404);
        return (await _service.Images.UploadImage(file, id, "product")) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPost("update")]
    public async Task<IActionResult> Update([FromForm] [Bind("Id", "Name", "Image", "Grade", "Subject", "Publisher", "Price")] Book book, IFormFile file)
    {
        int id = await _service.Books.Update(book);
        if (file == null || file.Length == 0) return (id > -1) ? StatusCode(200) : StatusCode(404);
        
        if (id == -1) return StatusCode(404);
        return (await _service.Images.UploadImage(file, id, "product")) ? StatusCode(200) : StatusCode(404);
    }

    [HttpDelete("update-status")]
    public async Task<IActionResult> UpdateStatus(int id)
    {
        return (await _service.Books.UpdateStatus(id)) ? StatusCode(200) : StatusCode(404);
    }
}
