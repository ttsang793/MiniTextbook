using Core.Entity;
using Application.Interface;
using Microsoft.AspNetCore.Mvc;
namespace Controller.Controllers;

[ApiController]
[Route("/series")]
public class SeriesController : ControllerBase
{
    private ILogger<CartController> _logger;
    private readonly IService _service;

    public SeriesController(ILogger<CartController> logger, IService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("get")]
    public async Task<IEnumerable<Series>> GetSeries()
    {
        return await _service.Series.GetAll();
    }
}