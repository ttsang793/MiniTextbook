using System.Linq.Expressions;
using Core.Entity;
using Core.Interface;
using Application.Interface;

namespace Application.Service;

public class SubjectService : ISubjectService
{
    private readonly IUnitOfWork _unitOfWork;

    public SubjectService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<Subject>> GetAll(Expression<Func<Subject, bool>> expression = null)
    {
        return await _unitOfWork.Subjects.GetAll(expression);
    }

    public async Task<Subject> GetById(int id)
    {
        return await _unitOfWork.Subjects.GetById(id);
    }

    public async Task<bool> Insert(Subject subject)
    {
        await _unitOfWork.Subjects.Insert(subject);
        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> Update(Subject subject)
    {
        await _unitOfWork.Subjects.Update(subject);
        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> UpdateStatus(int id)
    {
        await _unitOfWork.Subjects.UpdateStatus(id);
        return await _unitOfWork.SaveChanges() > 0;
    }
}
