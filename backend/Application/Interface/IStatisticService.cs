using Application.DTO;

namespace Application.Interface;

public interface IStatisticService
{
    Task<StatisticDTO> GetRevenue(DateTime start, DateTime end);

    Task<StatisticDTO> GetPercentageByGrade(DateTime start, DateTime end);

    Task<StatisticDTO> GetPercentageBySeries(DateTime start, DateTime end);

    Task<StatisticDTO> GetPercentageBySubject(DateTime start, DateTime end);

    Task<StatisticDTO> GetTop5Books(DateTime start, DateTime end);

    Task<StatisticDTO> GetTop5Customers(DateTime start, DateTime end);
}
