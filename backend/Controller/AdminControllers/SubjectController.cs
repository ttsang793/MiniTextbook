using Core.Entity;
using Application.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Controller.AdminControllers;
[ApiController]
[Route("/api/subject")]
public class SubjectController : ControllerBase
{
    private ILogger<SubjectController> _logger;
    private readonly IService _service;

    public SubjectController(ILogger<SubjectController> logger, IService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("get-all")]
    public async Task<IEnumerable<Subject>> GetAll()
    {
        if (!Permission.Check(Permission.READ_SUBJECT, HttpContext)) return null;
        return await _service.Subjects.GetAll();
    }

    [HttpGet("get")]
    public async Task<IEnumerable<Subject>> Search(int? id, string? name)
    {
        if (!Permission.Check(Permission.READ_SUBJECT, HttpContext)) return null;
        if (id == null) return await _service.Subjects.GetAll(s => s.Name.ToLower().Contains(name.ToLower()));
        return new List<Subject>() { await _service.Subjects.GetById((int)id) };
    }

    [HttpPost("insert")]
    public async Task<IActionResult> Insert([Bind("Name")]Subject subject)
    {
        if (!Permission.Check(Permission.ADD_SUBJECT, HttpContext)) return StatusCode(403);
        return (await _service.Subjects.Insert(subject)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([Bind("Id", "Name")]Subject subject)
    {
        if (!Permission.Check(Permission.UPDATE_SUBJECT, HttpContext)) return StatusCode(403);
        return (await _service.Subjects.Update(subject)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpDelete("update/status")]
    public async Task<IActionResult> UpdateStatus(int id)
    {
        if (!Permission.Check(Permission.STATUS_SUBJECT, HttpContext)) return StatusCode(403);
        return (await _service.Subjects.UpdateStatus(id)) ? StatusCode(200) : StatusCode(404);
    }
}
