using Core.Entity;
using Application.Interface;
using Core.Interface;

namespace Application.Service;

public class AdminService : IAdminService
{
    private readonly IUnitOfWork _unitOfWork;

    public AdminService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Admin> GetByUserId(int id)
    {
        return await _unitOfWork.Admins.GetById(id);
    }

    public async Task<Admin?> Login(Admin admin)
    {
        return await _unitOfWork.Admins.Login(admin);
    }

    public async Task<bool> Insert(Admin admin)
    {
        await _unitOfWork.Admins.Insert(admin);
        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> Update(Admin admin)
    {
        await _unitOfWork.Admins.Update(admin);
        return await _unitOfWork.SaveChanges() > 0;
    }

    public async Task<bool> UpdateStatus(int id)
    {
        await _unitOfWork.Admins.UpdateStatus(id);
        return await _unitOfWork.SaveChanges() > 0;
    }
}
