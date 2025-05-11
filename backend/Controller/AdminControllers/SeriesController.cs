using Core.Entity;
using Application.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Controller.AdminControllers;
[ApiController]
[Route("/api/series")]
public class SeriesController : ControllerBase
{
    private ILogger<SeriesController> _logger;
    private readonly IService _service;

    public SeriesController(ILogger<SeriesController> logger, IService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("get-all")]
    public async Task<IEnumerable<Series>> GetAll()
    {
        if (!Permission.Check(Permission.READ_SERIES, HttpContext)) return null;
        return await _service.Series.GetAll();
    }

    [HttpGet("get")]
    public async Task<IEnumerable<Series>> Search(int? id, string? name)
    {
        if (!Permission.Check(Permission.READ_SERIES, HttpContext)) return null;
        if (id == null) return await _service.Series.GetAll(s => s.Name.ToLower().Contains(name.ToLower()));
        return new List<Series>() { await _service.Series.GetById((int)id) };
    }

    [HttpPost("insert")]
    public async Task<IActionResult> Insert([FromForm] [Bind("Name", "Image", "Description")] Series series, IFormFile file)
    {
        if (!Permission.Check(Permission.ADD_SERIES, HttpContext)) return StatusCode(403);
        int id = await _service.Series.Insert(series);
        if (id == -1) return StatusCode(404);
        
        return (await _service.Images.UploadImage(file, id + "", "series")) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPost("update")]
    public async Task<IActionResult> Update([FromForm] [Bind("Id", "Name", "Image", "Description")] Series series, IFormFile file)
    {
        if (!Permission.Check(Permission.UPDATE_SERIES, HttpContext)) return StatusCode(403);
        if (!await _service.Series.Update(series)) return StatusCode(404);
        if (file == null || file.Length == 0) return StatusCode(200);

        return (await _service.Images.UploadImage(file, series.Id + "", "series")) ? StatusCode(200) : StatusCode(404);
    }

    [HttpDelete("update/status")]
    public async Task<IActionResult> UpdateStatus(int id)
    {
        if (!Permission.Check(Permission.STATUS_SERIES, HttpContext)) return StatusCode(403);
        return (await _service.Series.UpdateStatus(id)) ? StatusCode(200) : StatusCode(404);
    }
}
