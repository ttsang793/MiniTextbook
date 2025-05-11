import { React, useState, useEffect, useRef } from "react";
import { FloppyDisk, X, Pencil, LockKey, LockKeyOpen, ArrowClockwise } from "@phosphor-icons/react";
import axios from "axios";
import Search from "/src/Admin/components/Search";
import Pagination from "/src/Admin/components/Pagination";

const Admin = ({show, agroup}) => {
  const [admin, setAdmin] = useState([]);
  const [id, setID] = useState("");
  const [fullname, setFullname] = useState("");
  const [timeBegin, setTimeBegin] = useState("00:00");
  const [timeEnd, setTimeEnd] = useState("00:00");
  const [role, setRole] = useState(1);
  const [roleList, setRoleList] = useState([]);
  const numPerPage = 10;
  const pageRef = useRef(0);
  const totalRef = useRef(0);
  const searchRef = useRef("");

  useEffect(() => {
    if (agroup.includes(7)) {
      axios.get("/api/role/get-all").then(response => setRoleList(response.data));
      loadData();
    }
  }, []);

  return (
    <section className={show ? "grid grid-cols-[300px_1fr] gap-x-4 text-pink-900 items-start mt-2" : "hidden"}>
      {/* Điền thông tin */}
      <form className="text-lg border-r-2 border-r-pink-900 p-2 pe-4" style={{ height: "calc(100dvh - 206px)" }}>
        <div className="mb-3">
          <label htmlFor="id" className="block font-bold italic">ID:</label>
          <input type="text" id="id" value={id} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" onChange={e => setID(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="fullname" className="block font-bold italic">Họ và tên:</label>
          <input type="text" id="fullname" required value={fullname} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150"
            onChange={e => setFullname(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="time-begin" className="block font-bold italic">Thời gian bắt đầu:</label>
          <input type="time" step={600} id="time-begin" required value={timeBegin} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150"
            onChange={e => setTimeBegin(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="time-end" className="block font-bold italic">Thời gian kết thúc:</label>
          <input type="time" step={600} id="time-end" required value={timeEnd} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150"
            onChange={e => setTimeEnd(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="block font-bold italic">Vai trò:</label>
          <select id="role" value={role} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" onChange={e => setRole(e.target.value)}>
          { roleList.map(r => <option key={`role-${r.id}`} value={r.id}>{r.name}</option>) }
          </select>
        </div>

        <div className="flex gap-x-4 justify-center">
          <button className="bg-green-900 text-white flex gap-x-1 px-3 py-1 rounded-full cursor-pointer hover:bg-green-600 duration-150" onClick={e => save(e)}>
            <FloppyDisk size={28} /> Lưu
          </button>

          <button className="bg-red-900 text-white flex gap-x-1 px-3 py-1 rounded-full cursor-pointer hover:bg-red-600 duration-150" onClick={e => cancel(e)} >
            <X size={28} /> Hủy
          </button>
        </div>          
      </form>

      {/* Hiển thị danh sách */}
      <div>
        <Search onClick={search} />
        <table className="text-center w-full">
          <thead>
            <tr className="bg-linear-to-r from-pink-700 to-pink-900">
              <th className="w-[10%] text-pink-50 py-1">Mã NV</th>
              <th className="w-[39%] text-pink-50">Họ và tên</th>
              <th className="w-[15%] text-pink-50">Vai trò</th>
              <th className="w-[36%] text-pink-50"></th>
            </tr>
          </thead>
          <tbody>
            {
              admin.map(a => 
                <tr key={a.id} className="even:bg-pink-50">
                  <td>{a.id}</td>
                  <td className="py-3 text-left">{a.fullname}</td>
                  <td className="py-3">{a.roleNavigation.name}</td>
                  <td>
                    {
                      (a.id > 1) && (a.isActive ? (<div className="flex gap-x-2">
                        <button className="bg-yellow-400 text-black flex items-center gap-x-1 px-3 py-1 rounded-[7px] hover:bg-yellow-400/50 duration-150 cursor-pointer" onClick={() => loadUpdate(a)}>
                          <Pencil size={28} /> Cập nhật
                        </button>
                        <button className="bg-red-600 text-white flex items-center gap-x-1 px-3 py-1 rounded-[7px] hover:bg-red-600/70 duration-150 cursor-pointer" onClick={() => status(a.id, a.isActive)}>
                          <LockKey size={28} /> Khóa
                        </button>
                        <button className="bg-blue-700 text-white flex items-center gap-x-1 px-3 py-1 rounded-[7px] hover:bg-blue-700/80 duration-150 cursor-pointer" onClick={() => resetPassword(a.id)}>
                          <ArrowClockwise size={28} /> Đặt lại mật khẩu
                        </button>
                      </div>) : (
                        <button className="bg-green-600 text-whie flex items-center gap-x-1 px-3 py-1 rounded-[7px] hover:bg-green-600/80 duration-150 cursor-pointer" onClick={() => status(a.id, a.isActive)}>
                          <LockKeyOpen size={28} /> Mở khóa
                        </button>
                      ))
                    }
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
        <Pagination page={pageRef.current} total={totalRef.current} onClick={loadData} />
      </div>
    </section>
  )

  function loadData(newPage = 1) {
    pageRef.current = newPage;
    axios.get(`/api/admin/get${searchRef.current !== "" ? `?fullname=${searchRef.current}` : ""}`).then(response => {
      totalRef.current = Math.ceil(response.data.length / numPerPage);
      setAdmin(response.data.slice((pageRef.current - 1) * numPerPage, pageRef.current * numPerPage));
    });
  }

  function search(attr, prop) {
    pageRef.current = 1;
    searchRef.current = prop;
    if (attr === "name") attr = "fullname";
    
    axios.get(`/api/admin/get${searchRef.current !== "" ? `?${attr}=${prop}` : ""}`).then(response => {
      totalRef.current = Math.ceil(response.data.length / numPerPage);
      setAdmin(response.data.slice((pageRef.current - 1) * numPerPage, pageRef.current * numPerPage));
    });
  }

  function loadUpdate(admin) {
    setID(admin.id);
    setFullname(admin.fullname);
    setTimeBegin(admin.timeBegin);
    setTimeEnd(admin.timeEnd);
    setRole(admin.role);
    document.getElementById("id").readOnly = true;
    document.getElementById("id").classList.add("cursor-not-allowed");
    document.getElementById("fullname").focus();
  }

  function save(e) {
    e.preventDefault();
    (document.getElementById("id").classList.contains("cursor-not-allowed")) ? update() : insert();
  }

  function cancel(e) {
    e.preventDefault();
    setID("");
    setFullname("");
    setTimeBegin("00:00");
    setTimeEnd("00:00");
    setRole(1);
    document.getElementById("id").readOnly = false;
    document.getElementById("id").classList.remove("cursor-not-allowed");
  }

  function insert() {
    if (confirm("Bạn có muốn thêm nhân viên này?")) {
      const admin = { id, fullname, timeBegin, timeEnd, role };
      const headers = { headers: { 'Content-Type': 'application/json' }}
      axios.post("/api/admin/insert", admin, headers).then(response => {
        if (response.status === 200) {
          alert("Thêm nhân viên thành công!");
          location.reload();
        }
        else {
          alert("Đã có lỗi xảy ra, thêm thất bại");
          console.error(response)
        }
      });
    };
  }

  function update() {
    if (confirm("Bạn có muốn cập nhật thông tin của nhân viên này?")) {
      const admin = { id, fullname, timeBegin, timeEnd, role };
      const headers = { headers: { 'Content-Type': 'application/json' }}
      axios.put("/api/admin/update", admin, headers).then(() => {
        alert("Cập nhật thông tin thành công!");
        location.reload();
      }).catch(response => {
        if (response.status === 403) alert("Bạn không có quyền. Vui lòng liên hệ lại với quản trị viên.");
        else {
          alert("Đã có lỗi xảy ra, cập nhật thất bại!");
          console.error(response)
        }
      });
    }
  }

  function resetPassword(id) {
    if (confirm("Bạn có muốn đặt lại mật khẩu của nhân viên này?")) {
      const headers = { headers: { 'Content-Type': 'application/json' }}
      axios.put(`/api/admin/password/reset?id=${id}`, {}, headers).then(() => {
        alert("Đặt lại mật khẩu thành công!");
        location.reload();
      }).catch(response => {
        if (response.status === 403) alert("Bạn không có quyền. Vui lòng liên hệ lại với quản trị viên.");
        else {
          alert("Đã có lỗi xảy ra, đặt lại mật khẩu thất bại!");
          console.error(response)
        }
      });
    }
  }

  function status(id, status) {
    if (confirm(`Bạn có muốn ${status == 1 ? "" : "mở "}khóa nhân viên này?`)) {
      axios.put(`/api/admin/update/status?id=${id}`).then(() => {
        alert(`${status == 1 ? "Khóa" : "Mở khóa"} nhân viên thành công!`);
        location.reload();
      }).catch(response => {
        if (response.status === 403) alert("Bạn không có quyền. Vui lòng liên hệ lại với quản trị viên.");
        else {
          alert(`Đã có lỗi xảy ra, ${status == 1 ? "" : "mở "}khóa thất bại!`);
          console.error(response)
        }
      });
    }
  }
}

export default Admin;