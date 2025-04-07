using System.Linq.Expressions;
using Core.Entity;
using Core.Interface;
using Application.Interface;

namespace Application.Service;

public class SeriesService : ISeriesService
{
    private readonly IUnitOfWork _unitOfWork;

    public SeriesService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    public async Task<IEnumerable<Series>> GetAll(Expression<Func<Series, bool>> expression = null)
    {
        return await _unitOfWork.Series.GetAll(expression);
    }

    public async Task<Series> GetById(int id)
    {
        return await _unitOfWork.Series.GetById(id);
    }

    public async Task<bool> Insert(Series series)
    {
        await _unitOfWork.Series.Insert(series);
        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> Update(Series series)
    {
        await _unitOfWork.Series.Update(series);
        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> UpdateStatus(int id)
    {
        await _unitOfWork.Series.UpdateStatus(id);
        return await _unitOfWork.SaveChanges() > 0;
    }
}
