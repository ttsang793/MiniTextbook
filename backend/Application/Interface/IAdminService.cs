using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entity;

namespace Application.Interface;

public interface IAdminService
{
    Task<Admin> GetByUserId(int id);

    Task<Admin?> Login(Admin admin);

    Task<bool> Insert(Admin admin);

    Task<bool> Update(Admin admin);

    Task<bool> UpdateStatus(int id);
}
