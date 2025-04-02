

using Core.Interface;
using Microsoft.AspNetCore.Mvc;
using Core.Entity;

namespace Controller.Controllers;

[ApiController]
[Route("/user")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly IUnitOfWork _unitOfWork;

    public UserController(ILogger<UserController> logger, IUnitOfWork unitOfWork)
    {
        _logger = logger;
        _unitOfWork = unitOfWork;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(string username, string password)
    {
        return await _unitOfWork.Users.Login(username, password) ? Ok() : StatusCode(404);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([Bind("UserName", "Password", "FullName", "Birthday", "Phone", "Email")] User user)
    {
        await _unitOfWork.Users.Insert(user);
        return await _unitOfWork.SaveChanges() > 0 ? Ok() : StatusCode(404);
    }
}
