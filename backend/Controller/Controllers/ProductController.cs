﻿using Core.Entity;
using Application.Interface;
using Application.DTO;
using Microsoft.AspNetCore.Mvc;
namespace Controller.Controllers;

[ApiController]
[Route("/product")]
public class ProductController : ControllerBase
{
    private ILogger<ProductController> _logger;
    private readonly IService _service;

    public ProductController(ILogger<ProductController> logger, IService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet("get-all")]
    public async Task<IEnumerable<Book>> GetAll()
    {
        return await _service.Books.GetAll();
    }

    [HttpGet("get")]
    public async Task<Book> GetById(int id)
    {
        return await _service.Books.GetById(id);
    }

    [HttpPost("search")]
    public async Task<IEnumerable<Book>> Search([Bind("Grades", "Publishers", "Subjects")]ProductFilterDTO productFilter, string? name)
    {
        return await _service.Books.GetAll(p =>
            (string.IsNullOrEmpty(name) || p.Name.ToLower().Contains(name.ToLower())) &&
            (productFilter.Grades == null || productFilter.Grades.Contains((int)p.Grade)) &&
            (productFilter.Publishers == null || productFilter.Publishers.Contains((int)p.Publisher)) &&
            (productFilter.Subjects == null || productFilter.Subjects.Contains((int)p.Subject))
            //(grade == null || grade.Contains((int)p.Grade)) &&
            //(subject == null || p.Subject == subject) &&
            //(publisher == null || p.Publisher == publisher)
        );
    }

    [HttpGet("get-subject")]
    public async Task<IEnumerable<Subject>> GetSubjects()
    {
        return await _service.Subjects.GetAll();
    }

    [HttpGet("get-publisher")]
    public async Task<IEnumerable<Publisher>> GetPublishers()
    {
        return await _service.Publishers.GetAll();
    }
}