using Core.Entity;
using Application.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Controller.AdminControllers;
[ApiController]
[Route("/api/user")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly IService _service;

    public UserController(ILogger<UserController> logger, IService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("get")]
    public async Task<IEnumerable<User>> GetAll(string? username)
    {
        if (!Permission.Check(Permission.READ_USER, HttpContext)) return null;
        if (username == null) return await _service.Users.GetAll();
        return await _service.Users.GetAll(u => u.Username!.Contains(username));
    }

    [HttpPost("lock")]
    public async Task<IActionResult> LockUser(int id)
    {
        if (!Permission.Check(Permission.LOCK_USER, HttpContext)) return StatusCode(403);
        return await _service.Users.UpdateStatus(id, "Đã khóa") ? Ok() : StatusCode(404);
    }

    [HttpPost("unlock")]
    public async Task<IActionResult> UnlockUser(int id)
    {
        if (!Permission.Check(Permission.UNLOCK_USER, HttpContext)) return StatusCode(403);
        return await _service.Users.UpdateStatus(id, "Mới khôi phục") ? Ok() : StatusCode(404);
    }
}
