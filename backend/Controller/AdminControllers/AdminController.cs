using Core.Entity;
using Application.DTO;
using Application.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Controller.AdminControllers;
[ApiController]
[Route("/admin/admin")]
public class AdminController : ControllerBase
{
    private ILogger<BookController> _logger;
    private readonly IService _service;

    public AdminController(ILogger<BookController> logger, IService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("get-session")]
    public IActionResult GetSessionData()
    {
        return Ok(new { Aid = HttpContext.Session.GetInt32("aid"), Afullname = HttpContext.Session.GetString("afullname") });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([Bind("Id", "Password")] Admin admin)
    {
        var loginAdmin = await _service.Admins.Login(admin);
        if (loginAdmin == null) return BadRequest();
        if (loginAdmin.Fullname!.Contains("Kiểm tra lại")) return StatusCode(404, new { input = "username", message = loginAdmin.Fullname });
        if (loginAdmin.Fullname == "Nhập sai mật khẩu.") return StatusCode(404, new { input = "password", message = loginAdmin.Fullname });

        HttpContext.Session.SetInt32("aid", admin.Id);
        HttpContext.Session.SetString("afullname", loginAdmin.Fullname!);
        return StatusCode(200);
    }

    [HttpPost("logout")]
    public IActionResult LogOut()
    {
        HttpContext.Session.Remove("aid");
        HttpContext.Session.Remove("afullname");
        return StatusCode(200);
    }
}
