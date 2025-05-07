using Core.Entity;
using Application.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Controller.AdminControllers;
[ApiController]
[Route("/admin/user")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly IService _service;

    public UserController(ILogger<UserController> logger, IService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("get/user")]
    public async Task<IEnumerable<User>> GetAll()
    {
        return await _service.Users.GetAll();
    }
}
