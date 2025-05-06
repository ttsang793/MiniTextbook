using Core.Entity;
using Application.Interface;
using Microsoft.AspNetCore.Mvc;
using Application.DTO;

namespace Controller.AdminControllers;
[ApiController]
[Route("/admin/statistic")]
public class StatisticController : ControllerBase
{
    private ILogger<StatisticController> _logger;
    private readonly IService _service;

    public StatisticController(ILogger<StatisticController> logger, IService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("today")]
    public async Task<IActionResult> GetToday()
    {
        return Ok(new
        {
            Delivering = (await _service.Orders.GetAll(o => o.Status == 2)).Count(),
            Complete = (await _service.Orders.GetAll(o => o.DateReceived == DateTime.Today)).Count(),
            Canceled = (await _service.Orders.GetAll(o => o.DateCanceled == DateTime.Today)).Count(),
            Revenue = (await _service.Orders.GetAll(o => o.DateReceived == DateTime.Today)).Sum(o => o.Total)
        });
    }

    [HttpGet("revenue")]
    public async Task<StatisticDTO> GetRevenue(DateTime from, DateTime to)
    {
        from = (from == new DateTime(1, 1, 1)) ? new DateTime(2025, 1, 1) : from;
        to = (to == new DateTime(1, 1, 1)) ? DateTime.Today : to;
        return await _service.Statistic.GetRevenue(from, to);
    }

    [HttpGet("grade")]
    public async Task<StatisticDTO> GetPercentageByGrade(DateTime from, DateTime to)
    {
        from = (from == new DateTime(1,1,1)) ? new DateTime(2025, 1, 1) : from;
        to = (to == new DateTime(1, 1, 1)) ? DateTime.Today : to;
        return await _service.Statistic.GetPercentageByGrade(from, to);
    }

    [HttpGet("subject")]
    public async Task<StatisticDTO> GetPercentageBySubject(DateTime from, DateTime to)
    {
        from = (from == new DateTime(1, 1, 1)) ? new DateTime(2025, 1, 1) : from;
        to = (to == new DateTime(1, 1, 1)) ? DateTime.Today : to;
        return await _service.Statistic.GetPercentageBySubject(from, to);
    }

    [HttpGet("series")]
    public async Task<StatisticDTO> GetPercentageBySeries(DateTime from, DateTime to)
    {
        from = (from == new DateTime(1, 1, 1)) ? new DateTime(2025, 1, 1) : from;
        to = (to == new DateTime(1, 1, 1)) ? DateTime.Today : to;
        return await _service.Statistic.GetPercentageBySeries(from, to);
    }


    [HttpGet("top-5-books")]
    public async Task<StatisticDTO> GetTop5Books(DateTime from, DateTime to)
    {
        from = (from == new DateTime(1, 1, 1)) ? new DateTime(2025, 1, 1) : from;
        to = (to == new DateTime(1, 1, 1)) ? DateTime.Today : to;
        return await _service.Statistic.GetTop5Books(from, to);
    }


    [HttpGet("top-5-customers")]
    public async Task<StatisticDTO> GetTop5Customers(DateTime from, DateTime to)
    {
        from = (from == new DateTime(1, 1, 1)) ? new DateTime(2025, 1, 1) : from;
        to = (to == new DateTime(1, 1, 1)) ? DateTime.Today : to;
        return await _service.Statistic.GetTop5Customers(from, to);
    }
}
