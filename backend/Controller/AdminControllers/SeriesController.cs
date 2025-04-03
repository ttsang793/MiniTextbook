﻿using Core.Entity;
using Application.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Controller.AdminControllers;
[ApiController]
[Route("/admin/series")]
public class SeriesController : ControllerBase
{
    private ILogger<SeriesController> _logger;
    private readonly IService _service;

    public SeriesController(ILogger<SeriesController> logger, IService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("get-all")]
    public async Task<IEnumerable<Series>> GetAll()
    {
        return await _service.Series.GetAll();
    }

    [HttpGet("get")]
    public async Task<IEnumerable<Series>> Search(int? id, string? name)
    {
        if (id == null) return await _service.Series.GetAll(s => s.Name.ToLower().Contains(name.ToLower()));
        return new List<Series>() { await _service.Series.GetById((int)id) };
    }

    [HttpPost("insert")]
    public async Task<IActionResult> Insert([Bind("name")] Series series)
    {
        return (await _service.Series.Insert(series)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([Bind("id", "name", "isActive")] Series series)
    {
        return (await _service.Series.Update(series)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpDelete("update-status")]
    public async Task<IActionResult> UpdateStatus(int id)
    {
        return (await _service.Series.UpdateStatus(id)) ? StatusCode(200) : StatusCode(404);
    }
}
