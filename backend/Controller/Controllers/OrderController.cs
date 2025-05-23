﻿using Core.Entity;
using Application.Interface;
using Application.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
namespace Controller.Controllers;

[ApiController]
[Route("/order")]
public class OrderController : ControllerBase
{
    private ILogger<OrderController> _logger;
    private readonly IService _service;
    private readonly IVnPayService _vnPayService;
    private static OrderDTO? _temp { get; set; }

    public OrderController(ILogger<OrderController> logger, IService service, IVnPayService vnPayService)
    {
        _logger = logger;
        _service = service;
        _vnPayService = vnPayService;
    }

    [HttpGet("get-history")]
    public async Task<IActionResult> GetByUserId()
    {
        int? userID = HttpContext.Session.GetInt32("id");

        if (userID != null)
            return Ok(await _service.Orders.GetByUserId((int)userID));
        return StatusCode(403);
    }

    [HttpPost("get-item")]
    public async Task<IEnumerable<CartDTO>> GetTransactionItems(int[] cartID)
    {
        return await _service.Orders.GetTransactionItems(cartID);
    }

    [HttpPost("vnpay/payment")]
    [EnableCors("AllowVnPay")]
    public string CreateVnPayPayment(OrderDTO o)
    {
        o.User = HttpContext.Session.GetInt32("id");
        _temp = o;
        string url = _vnPayService.CreatePaymentUrl(o, HttpContext);
        return url;
    }

    [HttpGet("vnpay/result")]
    [EnableCors("AllowVnPay")]
    public async Task<IActionResult> GetVnPayResult()
    {
        var response = _vnPayService.PaymentExecute(Request.Query);
        var url = "https://localhost:5173/nguoi-dung/thanh-toan/ket-qua?" + (response.Success ? $"vnpaypd={response.PaymentId}" : "fail");

        if (response.Success)
        {
            var order = new Order
            {
                User = (int)HttpContext.Session.GetInt32("id")!,
                Receiver = _temp.Receiver,
                Address = _temp.Address,
                Phone = _temp.Phone,
                Total = _temp.Total,
                DatePurchased = DateTime.Now,
                PaidMethod = response.PaymentMethod,
                IsPaid = true
            };

            await _service.Orders.Insert(order, _temp.Carts, _temp.Instant);
        }

        _temp = null;        
        return Redirect(url);
    }

    [HttpPost("insert")]
    public async Task<IActionResult> Insert(OrderDTO orderDTO)
    {
        var order = new Order
        {
            User = (int)HttpContext.Session.GetInt32("id")!,
            Receiver = orderDTO.Receiver,
            Address = orderDTO.Address,
            Phone = orderDTO.Phone,
            Total = orderDTO.Total,
            DatePurchased = DateTime.Now,
            PaidMethod = "Tiền mặt"
        };

        return await _service.Orders.Insert(order, orderDTO.Carts, orderDTO.Instant) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("cancel")]
    public async Task<IActionResult> Cancel(int id)
    {
        return await _service.Orders.UpdateStatus(id, "Đã hủy") ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("receive")]
    public async Task<IActionResult> Receive(int id)
    {
        return await _service.Orders.UpdateStatus(id, "Đã nhận hàng") ? StatusCode(200) : StatusCode(404);
    }
}