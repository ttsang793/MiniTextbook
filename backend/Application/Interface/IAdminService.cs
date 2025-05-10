using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Core.Entity;

namespace Application.Interface;

public interface IAdminService
{
    Task<IEnumerable<Admin>> GetAll(Expression<Func<Admin, bool>> expression = null);
    Task<Admin> GetByUserId(int id);

    Task<Admin?> Login(Admin admin);

    Task<bool> Insert(Admin admin);

    Task<bool> Update(Admin admin);

    Task<bool> ResetPassword(int id);

    Task<bool> UpdatePassword(Admin admin, string oldPassword);

    Task<bool> UpdateStatus(int id);
}
