using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Database;

public static class ConfigurationDatabase
{
    public static void RegisterDb(this IServiceCollection service, IConfiguration configuration)
    {
        string connectionString = configuration.GetConnectionString("MiniTextbook") ?? throw new Exception("Disconnect...");

        service.AddDbContext<MiniTextbookContext>(option => option.UseMySQL(connectionString));
        
    }
}
