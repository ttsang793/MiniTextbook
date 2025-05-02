
using Application.Interface;
using Microsoft.AspNetCore.Mvc;
using Core.Entity;
using Microsoft.AspNetCore.Session;
using Application.DTO;
using Microsoft.AspNetCore.Http;

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

    [HttpGet("get")]
    public async Task<User> GetByUserId()
    {
        return await _service.Users.GetByUserId((int)HttpContext.Session.GetInt32("id")!);
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
        if (loginUser == null) return BadRequest();
        if (loginUser.Fullname == "Username không tồn tại.") return StatusCode(404, new { input = "username", message = loginUser.Fullname });
        if (loginUser.Fullname == "Nhập sai mật khẩu.") return StatusCode(404, new { input = "password", message = loginUser.Fullname });

        HttpContext.Session.SetInt32("id", loginUser.Id);
        HttpContext.Session.SetString("fullname", loginUser.Fullname!);
        HttpContext.Session.SetString("avatar", loginUser.Avatar!);
        return StatusCode(200);
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

    [HttpPut("update")]
    public async Task<IActionResult> Update([FromForm] [Bind("Username", "Fullname", "Address", "Phone", "Email")] User user, IFormFile file)
    {
        user.Id = (int)HttpContext.Session.GetInt32("id")!;
        var updateUser = await _service.Users.Update(user);
        if (updateUser != null)
        {
            HttpContext.Session.SetInt32("id", updateUser.Id);
            HttpContext.Session.SetString("fullname", updateUser.Fullname!);
            HttpContext.Session.SetString("avatar", updateUser.Avatar!);

            if (file == null || file.Length == 0) return StatusCode(200);
            return (await _service.Images.UploadImage(file, user.Username, "")) ? StatusCode(200) : StatusCode(400);
        }
        return StatusCode(404);
    }

    [HttpPut("update-key")]
    public async Task<IActionResult> UpdatePassword([Bind("OldPassword", "NewPassword")] PassDTO pass)
    {
        var user = new User
        {
            Id = (int)HttpContext.Session.GetInt32("id")!,
            Password = pass.NewPassword
        };

        return (await _service.Users.UpdatePassword(user, pass.OldPassword)) ? LogOut() : StatusCode(404);
    }
}
