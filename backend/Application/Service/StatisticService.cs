using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Application.DTO;
using Application.Interface;
using Core.Entity;
using Core.Interface;

namespace Application.Service;

public class StatisticService : IStatisticService
{
    private readonly IUnitOfWork _unitOfWork;

    public StatisticService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<StatisticDTO> GetRevenue(DateTime start, DateTime end)
    {
        var statisticResult = new StatisticDTO();
        var temp = start;

        while (temp <= end)
        {
            decimal? orderTotal = (await _unitOfWork.Orders.GetAll(o => o.DateReceived == temp.Date))
                .Sum(o => o.Total);

            statisticResult.Label.Add(temp.ToString("yyyy-MM-dd"));
            statisticResult.Data.Add((int)(orderTotal ?? 0));

            temp = temp.AddDays(1);
        }

        return statisticResult;
    }

    public async Task<StatisticDTO> GetPercentageByGrade(DateTime start, DateTime end)
    {
        var orders = await _unitOfWork.Orders.GetAll();
        var orderDetails = await _unitOfWork.OrderDetails.GetAll();
        var books = await _unitOfWork.Books.GetAll();

        var queryResult = (from o in orders
                          join od in orderDetails on o.Id equals od.Order
                          join b in books on od.Book equals b.Id
                           where o.DateReceived >= start && o.DateReceived <= end
                           group b by b.Grade into g
                          select new
                          {
                              Name = "Khối " + g.Key,
                              Value = g.Count()
                          }).ToList();

        var statisticResult = new StatisticDTO();
        foreach (var item in queryResult)
        {
            statisticResult.Label.Add(item.Name);
            statisticResult.Data.Add(item.Value);
        }

        return statisticResult;
    }

    public async Task<StatisticDTO> GetPercentageBySeries(DateTime start, DateTime end)
    {
        var orders = await _unitOfWork.Orders.GetAll();
        var orderDetails = await _unitOfWork.OrderDetails.GetAll();
        var books = await _unitOfWork.Books.GetAll();
        var bookSeries = await _unitOfWork.BookSeries.GetAll();
        var series = await _unitOfWork.Series.GetAll();

        var queryResult = (from o in orders
                           join od in orderDetails on o.Id equals od.Order
                           join b in books on od.Book equals b.Id
                           join bs in bookSeries on b.Id equals bs.Book
                           join s in series on bs.Series equals s.Id
                           where o.DateReceived >= start && o.DateReceived <= end
                           group s by s.Name into g
                           select new
                           {
                               Name = g.Key,
                               Value = g.Count()
                           }).ToList();

        var statisticResult = new StatisticDTO();
        foreach (var item in queryResult)
        {
            statisticResult.Label.Add(item.Name);
            statisticResult.Data.Add(item.Value);
        }

        return statisticResult;
    }

    public async Task<StatisticDTO> GetPercentageBySubject(DateTime start, DateTime end)
    {
        var orders = await _unitOfWork.Orders.GetAll();
        var orderDetails = await _unitOfWork.OrderDetails.GetAll();
        var books = await _unitOfWork.Books.GetAll();
        var subjects = await _unitOfWork.Subjects.GetAll();

        var queryResult = (from o in orders
                           join od in orderDetails on o.Id equals od.Order
                           join b in books on od.Book equals b.Id
                           join s in subjects on b.Subject equals s.Id
                           where o.DateReceived >= start && o.DateReceived <= end
                           group s by s.Name into g
                           select new
                           {
                               Name = g.Key,
                               Value = g.Count()
                           }).ToList();

        var statisticResult = new StatisticDTO();
        foreach (var item in queryResult)
        {
            statisticResult.Label.Add(item.Name);
            statisticResult.Data.Add(item.Value);
        }

        return statisticResult;
    }

    public async Task<StatisticDTO> GetTop5Books(DateTime start, DateTime end)
    {
        var orders = await _unitOfWork.Orders.GetAll();
        var orderDetails = await _unitOfWork.OrderDetails.GetAll();
        var books = await _unitOfWork.Books.GetAll();

        var queryResult = (from o in orders
                           join od in orderDetails on o.Id equals od.Order
                           join b in books on od.Book equals b.Id
                           where o.DateReceived >= start && o.DateReceived <= end
                           group od by new { b.Id, b.Name } into g
                           orderby g.Sum(od => od.Quantity) descending
                           select new
                           {
                               Name = g.Key.Name,
                               Value = g.Sum(od => od.Quantity)
                           }).TakeLast(5);

        var statisticResult = new StatisticDTO();
        foreach (var item in queryResult)
        {
            statisticResult.Label.Add(item.Name);
            statisticResult.Data.Add((int)item.Value);
        }

        return statisticResult;
    }

    public async Task<StatisticDTO> GetTop5Customers(DateTime start, DateTime end)
    {
        var orders = await _unitOfWork.Orders.GetAll();
        var users = await _unitOfWork.Users.GetAll();

        var queryResult = (from o in orders
                           join u in users on o.User equals u.Id
                           where o.DateReceived >= start && o.DateReceived <= end
                           group u by new { u.Username, u.Fullname } into g
                           orderby g.Count() descending
                           select new
                           {
                               Name = g.Key.Username + " - " + g.Key.Fullname,
                               Value = g.Count()
                           }).TakeLast(5);

        var statisticResult = new StatisticDTO();
        foreach (var item in queryResult)
        {
            statisticResult.Label.Add(item.Name);
            statisticResult.Data.Add(item.Value);
        }

        return statisticResult;
    }
}
