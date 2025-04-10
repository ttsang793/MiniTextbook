﻿using Core.Entity;
using Application.Interface;
using Application.DTO;
using Microsoft.AspNetCore.Mvc;
namespace Controller.AdminControllers;

[ApiController]
[Route("/admin/order")]
public class OrderController : ControllerBase
{
    private ILogger<OrderController> _logger;
    private readonly IService _service;

    public OrderController(ILogger<OrderController> logger, IService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("get")]
    public async Task<IEnumerable<Order>> GetOrders()
    {
        return await _service.Orders.GetAll();
    }

    [HttpPut("update-status")]
    public async Task<IActionResult> UpdateStatus(int id, int status, int? vertify)
    {
        if (vertify.HasValue) return await _service.Orders.UpdateStatus(id, 1, vertify) ? StatusCode(200) : StatusCode(404);
        return await _service.Orders.UpdateStatus(id, status) ? StatusCode(200) : StatusCode(404);
    }
}