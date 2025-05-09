﻿using Core.Entity;
using Application.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Controller.AdminControllers;
[ApiController]
[Route("/admin/publisher")]
public class PublisherController : ControllerBase
{
    private ILogger<PublisherController> _logger;
    private readonly IService _service;

    public PublisherController(ILogger<PublisherController> logger, IService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("get-all")]
    public async Task<IEnumerable<Publisher>> GetAll()
    {
        return await _service.Publishers.GetAll();
    }

    [HttpGet("get")]
    public async Task<IEnumerable<Publisher>> Search(int? id, string? name)
    {
        if (id == null) return await _service.Publishers.GetAll(p => p.Name.ToLower().Contains(name.ToLower()));
        return new List<Publisher>() { await _service.Publishers.GetById((int)id) };
    }

    [HttpPost("insert")]
    public async Task<IActionResult> Insert([Bind("Name")] Publisher publisher)
    {
        return (await _service.Publishers.Insert(publisher)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([Bind("Id", "Name")] Publisher publisher)
    {
        return (await _service.Publishers.Update(publisher)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpDelete("update-status")]
    public async Task<IActionResult> UpdateStatus(int id)
    {
        return (await _service.Publishers.UpdateStatus(id)) ? StatusCode(200) : StatusCode(404);
    }
}
