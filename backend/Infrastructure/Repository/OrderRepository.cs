using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entity;
using Core.Interface;
using Infrastructure.Database;

namespace Infrastructure.Repository;

public class OrderRepository : BaseRepository<Order>, IOrderRepository
{
    public OrderRepository(MiniTextbookContext _dbContext) : base(_dbContext) { }

    public async Task Insert(Order order)
    {
        GetDbSet().Add(order);
    }

    public async Task UpdateStatus(int id, int status, int? vertify)
    {
        var order = await GetById(id);
        order.Status = status;
        if (status == -1) order.DateCanceled = DateTime.Now;
        else if (status == 1)
        {
            order.DateVertified = DateTime.Now;
            order.VertifyAdmin = vertify;
        }
        else if (status == 4) order.DateReceived = DateTime.Now;

        GetDbSet().Update(order);
    }
}
