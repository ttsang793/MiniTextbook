using Core.Entity;
using Application.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Controller.AdminControllers;
[ApiController]
[Route("/admin/subject")]
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
        return await _service.Subjects.GetAll();
    }

    [HttpGet("get")]
    public async Task<Subject> GetById(int id)
    {
        return await _service.Subjects.GetById(id);
    }

    [HttpPost("insert")]
    public async Task<IActionResult> Insert([Bind("Name")]Subject subject)
    {
        return (await _service.Subjects.Insert(subject)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([Bind("Id", "Name", "IsActive")]Subject subject)
    {
        return (await _service.Subjects.Update(subject)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpDelete("update-status")]
    public async Task<IActionResult> UpdateStatus(int id)
    {
        return (await _service.Subjects.UpdateStatus(id)) ? StatusCode(200) : StatusCode(404);
    }
}
