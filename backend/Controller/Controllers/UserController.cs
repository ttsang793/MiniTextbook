using Application.Interface;
using Microsoft.AspNetCore.Mvc;
using Core.Entity;
using Application.DTO;

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
    public async Task<UserDTO> GetByUserId()
    {
        var user = await _service.Users.GetByUserId((int)HttpContext.Session.GetInt32("id")!);

        return new UserDTO
        {
            Id = user.Id,
            Username = user.Username,
            Fullname = user.Fullname,
            Address = user.Address,
            Phone = user.Phone,
            Email = user.Email,
            Avatar = user.Avatar
        };
    }

    [HttpGet("get-session")]
    public IActionResult GetSessionData()
    {
        return Ok(new { Fullname = HttpContext.Session.GetString("fullname"), Avatar = HttpContext.Session.GetString("avatar") });
    }

    private IActionResult SetSessionData(User user)
    {
        HttpContext.Session.SetInt32("id", user.Id);
        HttpContext.Session.SetString("fullname", user.Fullname!);
        HttpContext.Session.SetString("avatar", user.Avatar!);
        return StatusCode(200);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([Bind("Username", "Password")] User user)
    {
        var loginUser = await _service.Users.Verify(user);
        if (loginUser == null) return BadRequest();
        if (loginUser.Fullname == "Username không tồn tại.") return StatusCode(404, new { input = "username", message = loginUser.Fullname });
        if (loginUser.Fullname == "Nhập sai mật khẩu.") return StatusCode(404, new { input = "password", message = loginUser.Fullname });

        if (loginUser.Status == "Mới khôi phục") return StatusCode(307);
        return SetSessionData(loginUser);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([Bind("Username", "Password", "FullName")] User user)
    {
        var loginUser = await _service.Users.Insert(user);
        return (loginUser != null) ? SetSessionData(loginUser) : StatusCode(404);
    }


    [HttpPut("password/reset")]
    public async Task<IActionResult> ResetPassword([Bind("Username", "Password", "FullName")] User user)
    {
        var availableUser = (await _service.Users.GetAll(u => u.Username == user.Username && u.Fullname == user.Fullname)).FirstOrDefault();
        if (availableUser == null) return StatusCode(400);

        availableUser = await _service.Users.GetByUserId(availableUser.Id);
        availableUser.Password = user.Password;
        return await _service.Users.UpdatePassword(availableUser) ? SetSessionData(availableUser) : StatusCode(404);
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
    public async Task<IActionResult> Update([FromForm] [Bind("Username", "Fullname", "Address", "Phone", "Email", "Avatar")] User user, IFormFile file)
    {
        user.Id = (int)HttpContext.Session.GetInt32("id")!;

        var updateUser = await _service.Users.Update(user);
        if (updateUser != null)
        {
            HttpContext.Session.SetInt32("id", updateUser.Id);
            HttpContext.Session.SetString("fullname", updateUser.Fullname!);
            HttpContext.Session.SetString("avatar", updateUser.Avatar!);

            if (file == null || file.Length == 0) return StatusCode(200);
            return (await _service.Images.UploadImage(file, user.Username!, "avatar")) ? StatusCode(200) : StatusCode(400);
        }
        return StatusCode(404);
    }

    [HttpPut("password/update")]
    public async Task<IActionResult> UpdatePassword([Bind("OldPassword", "NewPassword")] PassDTO pass)
    {
        var id = (int)HttpContext.Session.GetInt32("id")!;
        var currentUser = await _service.Users.GetByUserId(id);

        var verifyUser = new User
        {
            Username = currentUser.Username,
            Password = pass.OldPassword,
            Status = currentUser.Status
        };

        var verificationResult = await _service.Users.Verify(verifyUser);

        if (verificationResult.Fullname == "Nhập sai mật khẩu.")
            return BadRequest(new { input = "oldPassword", message = verificationResult.Fullname });

        currentUser.Password = pass.NewPassword;
        return (await _service.Users.UpdatePassword(currentUser)) ? LogOut() : StatusCode(404);
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> DeactivateAccount([Bind("OldPassword")] PassDTO pass)
    {

        var id = (int)HttpContext.Session.GetInt32("id")!;
        var currentUser = await _service.Users.GetByUserId(id);

        var verifyUser = new User
        {
            Username = currentUser.Username,
            Password = pass.OldPassword,
            Status = currentUser.Status
        };

        var verificationResult = await _service.Users.Verify(verifyUser);

        if (verificationResult.Fullname == "Nhập sai mật khẩu.")
            return BadRequest(new { input = "oldPassword", message = verificationResult.Fullname });

        return (await _service.Users.UpdateStatus(id, "Đã khóa")) ? LogOut() : StatusCode(404);
    }
}
