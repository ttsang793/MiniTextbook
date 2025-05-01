
using Application.Interface;
using Microsoft.AspNetCore.Mvc;
using Core.Entity;
using Microsoft.AspNetCore.Session;

namespace Controller.Controllers;

[ApiController]
[Route("/user")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly IService _service;

    public UserController(ILogger<UserController> logger, IService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpPost("get")]
    public async Task<User> GetByUserId(int id)
    {
        return await _service.Users.GetByUserId(id);
    }

    [HttpGet("get-session")]
    public async Task<IActionResult> GetSessionData()
    {
        return Ok(new { Fullname = HttpContext.Session.GetString("fullname"), Avatar = HttpContext.Session.GetString("avatar") });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([Bind("Username", "Password")] User user)
    {
        var loginUser = await _service.Users.Login(user);
        if (loginUser != null)
        {
            HttpContext.Session.SetInt32("id", loginUser.Id);
            HttpContext.Session.SetString("fullname", loginUser.Fullname!);
            HttpContext.Session.SetString("avatar", loginUser.Avatar!);
            return StatusCode(200);
        }
        return StatusCode(404);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([Bind("Username", "Password", "FullName")] User user)
    {
        var loginUser = await _service.Users.Insert(user);
        if (loginUser != null)
        {
            HttpContext.Session.SetInt32("id", loginUser.Id);
            HttpContext.Session.SetString("fullname", loginUser.Fullname!);
            HttpContext.Session.SetString("avatar", loginUser.Avatar!);
            return StatusCode(200);
        }
        return StatusCode(404);
    }

    [HttpPost("logout")]
    public IActionResult LogOut()
    {
        HttpContext.Session.Remove("id");
        HttpContext.Session.Remove("fullname");
        HttpContext.Session.Remove("avatar");
        return StatusCode(200);
    }
}
