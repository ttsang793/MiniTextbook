using Core.Entity;
using Core.Interface;
using Infrastructure.Database;

namespace Infrastructure.Repository;

public class SeriesRepository : BaseRepository<Series>, ISeriesRepository
{
    public SeriesRepository(MiniTextbookContext dbContext) : base(dbContext) { }

    public async Task Insert(Series series)
    {
        series.Id = await GetLastId();
        GetDbSet().Add(series);
    }

    public async Task Update(Series series)
    {
        GetDbSet().Update(series);
    }

    public async Task UpdateStatus(int id)
    {
        var series = await GetById(id);
        var oldIsActive = series.IsActive;
        series.IsActive = !oldIsActive;
    }
}
