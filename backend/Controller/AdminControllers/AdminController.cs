using Core.Entity;
using Application.DTO;
using Application.Interface;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Controller.AdminControllers;
[ApiController]
[Route("/api/admin")]
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
        return Ok(new { Aid = HttpContext.Session.GetInt32("aid"), Afullname = HttpContext.Session.GetString("afullname"), Agroup = HttpContext.Session.GetString("agroup") });
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
        HttpContext.Session.SetString("apermission", JsonConvert.SerializeObject(await _service.Admins.GetPermission(admin.Id)));
        HttpContext.Session.SetString("agroup", JsonConvert.SerializeObject(await _service.Admins.GetPermissionGroup(admin.Id)));
        return StatusCode(200);
    }

    [HttpPost("logout")]
    public IActionResult LogOut()
    {
        HttpContext.Session.Remove("aid");
        HttpContext.Session.Remove("afullname");
        HttpContext.Session.Remove("apermission");
        HttpContext.Session.Remove("agroup");
        return StatusCode(200);
    }

    [HttpGet("get")]
    public async Task<IEnumerable<Admin>> GetAll(int? id, string? fullname)
    {
        if (!Permission.Check(Permission.READ_ADMIN, HttpContext)) return null;
        if (id != null) return new List<Admin> { await _service.Admins.GetByUserId((int)id) };
        if (string.IsNullOrEmpty(fullname)) return await _service.Admins.GetAll();
        return await _service.Admins.GetAll(a => a.Fullname.ToLower().Contains(fullname.ToLower()));
    }

    [HttpGet("get/role")]
    public async Task<IEnumerable<Admin>> GetAdminsByRole(int roleId)
    {
        if (!Permission.Check(Permission.DELETE_ROLE, HttpContext)) return null;
        return await _service.Admins.GetAll(a => a.Role == roleId);
    }

    [HttpPost("insert")]
    public async Task<IActionResult> Insert([Bind("Id", "Fullname", "TimeBegin", "TimeEnd", "Role")] Admin admin)
    {
        if (!Permission.Check(Permission.ADD_ADMIN, HttpContext)) return StatusCode(403);
        return await _service.Admins.Insert(admin) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([Bind("Id", "Fullname", "TimeBegin", "TimeEnd", "Role")] Admin admin)
    {
        if (!Permission.Check(Permission.UPDATE_ADMIN, HttpContext)) return StatusCode(403);
        return await _service.Admins.Update(admin) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("password/update")]
    public async Task<IActionResult> UpdatePassword([Bind("OldPassword", "NewPassword")] PassDTO pass)
    {
        if (!Permission.Check(Permission.RESET_PASS_ADMIN, HttpContext)) return StatusCode(403);
        var admin = new Admin
        {
            Id = (int)HttpContext.Session.GetInt32("aid")!,
            Password = pass.NewPassword
        };

        return (await _service.Admins.UpdatePassword(admin, pass.OldPassword!)) ? LogOut() : StatusCode(404);
    }

    [HttpPut("password/reset")]
    public async Task<IActionResult> ResetPassword(int id)
    {
        return (await _service.Admins.ResetPassword(id)) ? Ok() : StatusCode(404);
    }

    [HttpPut("update/status")]
    public async Task<IActionResult> UpdateStatus(int id)
    {
        if (!Permission.Check(Permission.LOCK_ADMIN, HttpContext)) return StatusCode(403);
        return await _service.Admins.UpdateStatus(id) ? StatusCode(200) : StatusCode(404);
    }
}
