using Core.Entity;
using Application.DTO;
using Application.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Controller.AdminControllers;
[ApiController]
[Route("/api/book")]
public class BookController : ControllerBase
{
    private readonly ILogger<BookController> _logger;
    private readonly IService _service;

    public BookController(ILogger<BookController> logger, IService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("get-all")]
    public async Task<IEnumerable<Book>> GetAll()
    {
        if (!Permission.Check(Permission.READ_BOOK, HttpContext)) return null;
        return await _service.Books.GetAll();
    }

    [HttpGet("get")]
    public async Task<IEnumerable<Book>> Search(int? id, string? name)
    {
        if (!Permission.Check(Permission.READ_BOOK, HttpContext)) return null;
        if (id == null) return await _service.Books.GetAll(s => s.Name.ToLower().Contains(name.ToLower()));
        return new List<Book>() { await _service.Books.GetById((int)id) };
    }

    [HttpGet("get/publisher")]
    public async Task<IEnumerable<Publisher>> GetAllPublisher()
    {
        if (!Permission.Check(Permission.READ_BOOK, HttpContext)) return null;
        return await _service.Publishers.GetAll();
    }

    [HttpGet("get/subject")]
    public async Task<IEnumerable<Subject>> GetAllSubject()
    {
        if (!Permission.Check(Permission.READ_BOOK, HttpContext)) return null;
        return await _service.Subjects.GetAll();
    }

    [HttpGet("get/series")]
    public async Task<IEnumerable<Series>> GetAllSeries()
    {
        if (!Permission.Check(Permission.READ_BOOK, HttpContext)) return null;
        return await _service.Series.GetAll();
    }

    [HttpPost("insert")]
    public async Task<IActionResult> Insert([FromForm] [Bind("Name", "Image", "Grade", "Subject", "Publisher", "Price", "Series")] BookDTO bookDTO, IFormFile file)
    {
        if (!Permission.Check(Permission.ADD_BOOK, HttpContext)) return StatusCode(403);
        int id = await _service.Books.Insert(bookDTO);
        if (id == -1) return StatusCode(404);
        return (await _service.Images.UploadImage(file, id + "", "product")) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPost("update")]
    public async Task<IActionResult> Update([FromForm] [Bind("Id", "Name", "Image", "Grade", "Subject", "Publisher", "Price", "Series")] BookDTO bookDTO, IFormFile file)
    {
        if (!Permission.Check(Permission.UPDATE_BOOK, HttpContext)) return StatusCode(403);
        if (!await _service.Books.Update(bookDTO)) return StatusCode(404);
        if (file == null || file.Length == 0) return StatusCode(200);
        return (await _service.Images.UploadImage(file, bookDTO.Id + "", "product")) ? StatusCode(200) : StatusCode(404);
    }

    [HttpDelete("update/status")]
    public async Task<IActionResult> UpdateStatus(int id)
    {
        if (!Permission.Check(Permission.STATUS_BOOK, HttpContext)) return StatusCode(403);
        return (await _service.Books.UpdateStatus(id)) ? StatusCode(200) : StatusCode(404);
    }
}