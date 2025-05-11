using Core.Entity;
using Application.DTO;
using Application.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Controller.AdminControllers;
[ApiController]
[Route("/api/role")]
public class RoleController : ControllerBase
{
    private ILogger<BookController> _logger;
    private readonly IService _service;

    public RoleController(ILogger<BookController> logger, IService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("get-all")]
    public async Task<IEnumerable<Role>> GetAllRoles(string? name)
    {
        if (!Permission.Check(Permission.READ_ROLE, HttpContext)) return null;
        if (string.IsNullOrEmpty(name)) return await _service.Roles.GetAllRoles();
        return await _service.Roles.GetAllRoles(r => r.Name.ToLower().Contains(name.ToLower()));
    }

    [HttpGet("get/permission")]
    public async Task<IEnumerable<PermissionGroup>> GetAllPermissionGroups()
    {
        if (!Permission.Check(Permission.READ_ROLE, HttpContext)) return null;
        return await _service.Roles.GetAllPermissionGroups();
    }

    [HttpGet("get")]
    public async Task<Role> GetById(int id)
    {
        if (!Permission.Check(Permission.READ_ROLE, HttpContext)) return null;
        return await _service.Roles.GetById(id);
    }

    [HttpPost("insert")]
    public async Task<IActionResult> Insert([Bind("Name")] Role role)
    {
        if (!Permission.Check(Permission.ADD_ROLE, HttpContext)) return StatusCode(403);
        return await _service.Roles.Insert(role) ? Ok() : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([Bind("Id", "Name")] Role role)
    {
        if (!Permission.Check(Permission.UPDATE_ROLE, HttpContext)) return StatusCode(403);
        return await _service.Roles.Update(role) ? Ok() : StatusCode(404);
    }

    [HttpPost("update/permission")]
    public async Task<IActionResult> UpdatePermission([Bind("Id", "Permissions")] RolePermissionDTO rolePermissionDTO)
    {
        if (!Permission.Check(Permission.UPDATE_ROLE_PERMISSION, HttpContext)) return StatusCode(403);
        return await _service.Roles.UpdatePermission(rolePermissionDTO) ? Ok() : StatusCode(404);
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> Delete(int id)
    {
        if (!Permission.Check(Permission.DELETE_ROLE, HttpContext)) return StatusCode(403);
        return await _service.Roles.Delete(id) ? Ok() : StatusCode(404);
    }

    [HttpPut("delete")]
    public async Task<IActionResult> DeleteWithAdmins([Bind("Admins")] RoleRedelegateDTO roleRedelegateDTO, int id)
    {
        if (!Permission.Check(Permission.DELETE_ROLE, HttpContext)) return StatusCode(403);
        bool errorFlag = false;

        foreach (var admin in roleRedelegateDTO.Admins)
        {
            bool result = await _service.Admins.Update(admin);
            if (!result) errorFlag = true;
        }

        if (errorFlag) return StatusCode(404);

        //Sau khi đổi vai trò với xóa hẳn
        return await _service.Roles.Delete(id) ? Ok() : StatusCode(404);
    }
}
