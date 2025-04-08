using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entity;
using Core.Interface;
using Infrastructure.Database;

namespace Infrastructure.Repository;
public class OrderDetailRepository : BaseRepository<OrderDetail>, IOrderDetailRepository
{
    public OrderDetailRepository(MiniTextbookContext _dbContext) : base(_dbContext) { }

    public async Task Insert(OrderDetail orderDetail)
    {
        GetDbSet().Add(orderDetail);
    }
}
