import axios from "axios";
import React, { useState, useEffect } from 'react';
import { FloppyDisk, X } from "@phosphor-icons/react";

const AdminRedelegate = ({show, roleId, roleList, onClose}) => {
  let [admin, setAdmin] = useState([]);
  let [role, setRole] = useState({});

  const handleAll = newRole => {
    let temp = {};
    admin.forEach(a => temp[`${a.id}`] = newRole)
    setRole(role = temp);
    document.getElementById("all").value = newRole;
  }

  useEffect(() => {
    if (roleId !== "") {
      try {
        axios.get(`/admin/admin/get/role?roleId=${roleId}`).then(response => {
          setAdmin(admin = response.data);
          handleAll(-1);
        });
      }
      catch {}
    }
  }, [roleId, roleList])

  const checkAll = newRole => {
    for (const [key, value] of Object.entries(role))
      if (value != newRole) {
        document.getElementById("all").value = -2;
        return;
      }

    document.getElementById("all").value = Number(newRole);
  }

  const handleRole = (id, newRole) => {
    const updateRole = {...role};
    updateRole[`${id}`] = Number(newRole);
    setRole(role = updateRole);
    checkAll(newRole);
  }

  return (
    <div className={show ? "bg-black/50 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-100" : "hidden"}>
      <div className="bg-white rounded-xl w-[75dvw] h-[75dvh] p-6 pt-3 overflow-y-auto">
        <h3 className="mb-4 font-bold text-2xl text-center">DANH SÁCH NHÂN VIÊN CẦN ĐỔI VAI TRÒ</h3>

        <div className="text-end mb-2">
          <label htmlFor="all" className="italic">Áp dụng cho tất cả: </label>
          <select id="all" className="ps-2" onChange={e => handleAll(e.target.value)}>
            <option value="-2" hidden>Không áp dụng</option>
            <option value="-1" hidden>Chưa chọn vai trò mới</option>
            {
              roleList.map(r => (r.id !== roleId) && <option key={r.id} value={r.id}>{r.name}</option>)
            }
          </select>
        </div>

        <table className="text-center w-full">
          <thead>
            <tr className="bg-linear-to-r from-pink-700 to-pink-900">
              <th className="w-[10%] text-pink-50 py-1">Mã NV</th>
              <th className="w-[60%] text-pink-50">Họ và tên</th>
              <th className="w-[30%] text-pink-50">Vai trò mới</th>
            </tr>
          </thead>
          <tbody>
            {
              admin.map(a =>
                <tr key={a.id} className="even:bg-pink-50">
                  <td>{a.id}</td>
                  <td className="py-3 text-left">{a.fullname}</td>
                  <td>
                    <select value={role[a.id]} onChange={e => handleRole(a.id, e.target.value)} className="ps-2">
                      <option value="-1" hidden>Chưa chọn vai trò mới</option>
                      {
                        roleList.map(r => (r.id !== roleId) && <option value={r.id} key={r.id}>{r.name}</option>)
                      }
                    </select>
                  </td>
                </tr>
              )}
          </tbody>
        </table>

        <div className="flex gap-x-4 justify-center">
          <button className="bg-green-900 text-white flex items-center gap-x-1 px-3 py-1 rounded-full cursor-pointer hover:bg-green-600 duration-150" onClick={deleteRoleWithEmployee}>
            <FloppyDisk size={28} /> Lưu
          </button>

          <button className="bg-red-900 text-white flex items-center gap-x-1 px-3 py-1 rounded-full cursor-pointer hover:bg-red-600 duration-150" onClick={onClose} >
            <X size={28} /> Hủy
          </button>
        </div>
      </div>
    </div>
  )  

  function deleteRoleWithEmployee() {
    for (const [key, value] of Object.entries(role))
      if (value === -1) {
        alert ("Vui lòng chọn vai trò mới cho tất cả nhân viên!");
        return;
      }

    if (confirm("Bạn đã hoàn thành việc chuyển đổi nhân viên?")) {
      admin.forEach(a => a.role = Number(role[`${a.id}`]));

      const headers = { headers: { 'Content-Type': 'application/json' }}

      axios.put(`/admin/role/delete?id=${roleId}`, { admins: admin }, headers).then(() => {
        alert("Xóa vai trò thành công. Các nhân viên đã được chuyển đến vai trò mới!");
        location.reload();
      }).catch(response => {
        alert("Đã có lỗi xảy ra, xóa vai trò thất bại!");
        console.error(response);
      });
    }
  }
}

export default AdminRedelegate;