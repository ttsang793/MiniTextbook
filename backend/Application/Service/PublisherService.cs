using System.Linq.Expressions;
using Core.Entity;
using Core.Interface;
using Application.Interface;

namespace Application.Service;

public class PublisherService : IPublisherService
{
    private readonly IUnitOfWork _unitOfWork;

    public PublisherService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<Publisher>> GetAll(Expression<Func<Publisher, bool>> expression = null)
    {
        return await _unitOfWork.Publishers.GetAll(expression);
    }

    public async Task<Publisher> GetById(int id)
    {
        return await _unitOfWork.Publishers.GetById(id);
    }

    public async Task<bool> Insert(Publisher publisher)
    {
        await _unitOfWork.Publishers.Insert(publisher);
        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> Update(Publisher publisher)
    {
        await _unitOfWork.Publishers.Update(publisher);
        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> UpdateStatus(int id)
    {
        await _unitOfWork.Publishers.UpdateStatus(id);
        return await _unitOfWork.SaveChanges() > 0;
    }
}
