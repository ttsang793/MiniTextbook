﻿using Core.Entity;
using Application.Interface;
using Application.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Controller.AdminControllers;
[ApiController]
[Route("/admin/order")]
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
    public async Task<IEnumerable<Order>> GetOrders(int? userID, string? receiver, string? address, int? product, int? grade, int? series, string? status, DateTime? date, DateTime? dateReceived, DateTime? dateCanceled)
    {
        return await _service.Orders.GetAll(userID, receiver, address, product, grade, series, status, date, dateReceived, dateCanceled);
    }

    [HttpGet("search")]
    public async Task<IEnumerable<Order>> Search (int id)
    {
        return new List<Order>() { await _service.Orders.GetById(id) };
    }

    [HttpGet("get/receiver")]
    public async Task<List<string>> GetAllReceiver()
    {
        return await _service.Orders.GetAllReceiver();
    }

    [HttpGet("get/address")]
    public async Task<List<string>> GetAllAddress()
    {
        return await _service.Orders.GetAllAddress();
    }

    [HttpPut("update-status")]
    public async Task<IActionResult> UpdateStatus(int id, string status)
    {
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