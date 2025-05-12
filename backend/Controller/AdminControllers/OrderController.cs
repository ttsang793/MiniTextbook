using Core.Entity;
using Application.Interface;
using Application.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Controller.AdminControllers;
[ApiController]
[Route("/api/order")]
public class OrderController : ControllerBase
{
    private readonly ILogger<OrderController> _logger;
    private readonly IService _service;

    public OrderController(ILogger<OrderController> logger, IService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("get")]
    public async Task<IEnumerable<Order>> GetOrders(int? userID, string? receiver, string? address, int? product, int? grade, int? series, string? status, DateTime? dateStart, DateTime? dateEnd)
    {
        if (!Permission.Check(Permission.READ_ORDER, HttpContext)) return null;

        if (dateStart == null) dateStart = new DateTime(2025, 1, 1);
        if (dateEnd == null) dateEnd = DateTime.Today;
        return await _service.Orders.GetAll(userID, receiver, address, product, grade, series, status, (DateTime)dateStart, (DateTime)dateEnd);
    }

    [HttpGet("search")]
    public async Task<IEnumerable<Order>> Search (int id)
    {
        if (!Permission.Check(Permission.READ_ORDER, HttpContext)) return null;
        return new List<Order>() { await _service.Orders.GetById(id) };
    }

    [HttpGet("get/user")]
    public async Task<IEnumerable<User>> GetAll()
    {
        return (Permission.Check(Permission.READ_ORDER, HttpContext)) ? await _service.Users.GetAll() : null;
    }

    [HttpGet("get/receiver")]
    public async Task<List<string>> GetAllReceiver()
    {
        if (!Permission.Check(Permission.READ_ORDER, HttpContext)) return null;
        return await _service.Orders.GetAllReceiver();
    }

    [HttpGet("get/address")]
    public async Task<List<string>> GetAllAddress()
    {
        if (!Permission.Check(Permission.READ_ORDER, HttpContext)) return null;
        return await _service.Orders.GetAllAddress();
    }

    [HttpGet("get/book")]
    public async Task<IEnumerable<Book>> GetAllBook()
    {
        if (!Permission.Check(Permission.READ_ORDER, HttpContext)) return null;
        return await _service.Books.GetAll();
    }

    [HttpGet("get/series")]
    public async Task<IEnumerable<Series>> GetAllSeries()
    {
        if (!Permission.Check(Permission.READ_ORDER, HttpContext)) return null;
        return await _service.Series.GetAll();
    }

    [HttpPut("update/status")]
    public async Task<IActionResult> UpdateStatus(int id, string status)
    {
        if (!Permission.Check(Permission.UPDATE_ORDER, HttpContext)) return StatusCode(403);
        try
        {
            int adminID = (int)HttpContext.Session.GetInt32("aid")!;

            if (status == "Đã xác nhận") return await _service.Orders.UpdateStatus(id, status, adminID) ? StatusCode(200) : StatusCode(404);
            return await _service.Orders.UpdateStatus(id, status) ? StatusCode(200) : StatusCode(404);
        }
        catch
        {
            return StatusCode(403);
        }
    }
}