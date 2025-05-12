import { React, useState, useEffect, Fragment } from "react";
import { FloppyDisk, X, MagnifyingGlass, Trash } from "@phosphor-icons/react";
import axios from "axios";
import AdminRedelegate from "/src/Admin/components/role/AdminRedelegate";

const Role = ({show, agroup}) => {
  const [role, setRole] = useState([]);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [permissionList, setPermissionList] = useState([]);
  let [permission, setPermission] = useState({});
  const [searchVal, setSearchVal] = useState("")
  const [showAdmin, setShowAdmin] = useState(false);
  const [redelegateId, setRedelegateId] = useState("");

  const toggleRedelegate = open => {
    setShowAdmin(open);
    document.body.style.overflow = open ? "hidden" : "";    
  }

  const handlePermission = (id, specific = null) => {
    const updatePermission = {...permission};
    updatePermission[`${id}`] = specific !== null ? specific : !updatePermission[`${id}`];
    setPermission(permission = updatePermission);
  }
    
  useEffect(() => {
    if (agroup.includes(8)) {
      axios.get("/api/role/get-all").then(response => setRole(response.data));
      axios.get("/api/role/get/permission").then(response => {
        setPermissionList(response.data);

        let temp = {};
        response.data.forEach(group => group.permissions.forEach(p => temp[`${p.id}`] = false));
        setPermission(permission = temp);
      });
    }
  }, []);

  return (
    <section className={show ? "grid grid-cols-[250px_1fr] gap-x-6 text-pink-900 items-start mt-2" : "hidden"}>      
      <AdminRedelegate show={showAdmin} roleId={redelegateId} roleList={role} onClose={() => toggleRedelegate(false)} />

      <div>
        <div className="flex">
          <input
            type="search" id="search-input" className="bg-gray-300/70 text-gray-900 flex-1 rounded-s-full py-2 ps-5 placeholder:italic"
            placeholder="Tìm kiếm..." spellCheck="false" value={searchVal} onChange={e => setSearchVal(e.target.value)}
            onKeyDown={e => {if (e.nativeEvent.key === "Enter") document.getElementById("search-btn").click()}}
          />
          <button id="search-btn" className="p-2 rounded-e-full bg-gray-300/70 text-gray-900 cursor-pointer hover:bg-pink-900 hover:text-pink-300 duration-200" onClick={() => search()}>
            <MagnifyingGlass size={24} className="cursor-pointer" />
          </button>
        </div>

        <table className="text-left w-full mt-2">
          <tbody>
            {
              role.map(r => 
                <tr key={r.id} className={`even:bg-pink-50 ${r.id === 1 ? "cursor-not-allowed" : "cursor-pointer hover:bg-pink-100 relative"}`}>
                  <td className="p-2" onClick={() => loadUpdate(r)}>
                    {r.name}

                    {
                      (r.id > 1) &&
                      <div className="absolute top-1.5 right-1" onClick={() => deleteRole(r.id, r.name)}>
                        <Trash size={28} />
                      </div>
                    }
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>

      <div>
        <form action="" className="mb-3">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-x-3">
            <div className="mb-3">
              <label htmlFor="id" className="block font-bold italic">ID:</label>
              <input type="text" readOnly={true} id="id" value={id} className="bg-pink-50 border-1 border-pink-50 rounded-full text-pink-900/50 py-1 px-4 w-full cursor-not-allowed" />
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="block font-bold italic">Tên vai trò:</label>
              <input type="text" id="name" required value={name} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150"
                onChange={e => setName(e.target.value)} onInput={() => clearNameValidation()} />
              <p id="error-name" className="text-red-700 italic text-base"></p>
            </div>
          </div>

          <div className="flex gap-x-4 justify-center">
            <button className="bg-green-900 text-white flex items-center gap-x-1 px-3 py-1 rounded-full cursor-pointer hover:bg-green-600 duration-150" onClick={e => saveRole(e)}>
              <FloppyDisk size={28} /> Lưu
            </button>

            <button className="bg-red-900 text-white flex items-center gap-x-1 px-3 py-1 rounded-full cursor-pointer hover:bg-red-600 duration-150" onClick={e => cancel(e)} >
              <X size={28} /> Hủy
            </button>
          </div>  
        </form>

        <hr className="text-zinc-600" />
        
        <form className="my-2">
          <h2 className="mb-4 font-bold text-2xl text-center">DANH SÁCH QUYỀN</h2>
          {
            permissionList.map(group =>
              <Fragment key={group.name}>
                <h2 className="mb-2 font-bold text-xl border-b-1 border-b-pink-900/10">{group.id}. {group.name}</h2>

                <div className="grid grid-cols-5 gap-y-2 mb-4 text-lg">
                {
                  group.permissions.map(p => <div key={"per-" + p.id}><input type="checkbox" className="accent-pink-700" checked={permission[`${p.id}`]} onChange={() => handlePermission(p.id)} /> {p.name}</div>)
                }
                </div>
              </Fragment>
            )
          }

          <div className="flex gap-x-4 justify-center">
            <button className="bg-green-900 text-white flex items-center gap-x-1 px-3 py-1 rounded-full cursor-pointer hover:bg-green-600 duration-150" onClick={e => savePermission(e)}>
              <FloppyDisk size={28} /> Lưu
            </button>

            <button className="bg-red-900 text-white flex items-center gap-x-1 px-3 py-1 rounded-full cursor-pointer hover:bg-red-600 duration-150" onClick={e => cancel(e)} >
              <X size={28} /> Hủy
            </button>
          </div> 
        </form>
      </div>
    </section>
  )

  function search() {
    axios.get(`/api/role/get-all${searchVal !== "" ? `?name=${searchVal}` : ""}`).then(response => setRole(response.data));
  }

  function loadUpdate(role) {
    if (role.id > 1) {      
      setID(role.id);
      setName(role.name);
      document.getElementById("name").focus();

      try {
        let tempPermission = [];
        role.rolePermissions.forEach(r => tempPermission.push(`${r.permission}`));
        
        for (const [key, value] of Object.entries(permission)) handlePermission(key, tempPermission.includes(key));
      }
      catch {}
    }
  }

  function clearNameValidation() {
    document.getElementById("error-name").innerHTML = "";
    document.getElementById("name").classList.remove("focus-error");
  }

  function cancel(e) {
    e.preventDefault();
    setID("");
    setName("");
    clearNameValidation();
  }

  function saveRole(e) {
    e.preventDefault();

    clearNameValidation();
    if (name === "") {
      document.getElementById("error-name").innerHTML = "Vui lòng nhập tên cho vai trò.";
      document.getElementById("name").classList.add("focus-error");
      document.getElementById("name").focus();
    }
    else (id === "") ? insertRole() : updateRole();
  }

  function insertRole() {
    if (confirm("Bạn có muốn thêm vai trò này?")) {
      const role = { name };
      const headers = { headers: { 'Content-Type': 'application/json' }}
      axios.post("/api/role/insert", role, headers).then(() => {
        alert("Thêm vai trò thành công!");
        location.reload();
      }).catch(response => {
        if (response.status === 403) alert("Bạn không có quyền. Vui lòng liên hệ lại với quản trị viên.");
        else {
          alert("Đã có lỗi xảy ra, thêm thất bại!");
          console.error(response)
        }
      })
    };
  }

  function updateRole() {
    if (confirm("Bạn có muốn cập nhật vai trò này?")) {
      const role = { id, name };
      const headers = { headers: { 'Content-Type': 'application/json' }}
      axios.put("/api/role/update", role, headers).then(() => {
        alert("Cập nhật vai trò thành công!");
        location.reload();
      }).catch(response => {
        if (response.status === 403) alert("Bạn không có quyền. Vui lòng liên hệ lại với quản trị viên.");
        else {
          alert("Đã có lỗi xảy ra, cập nhật vai trò thất bại");
          console.error(response)
        }
      })
    }
  }

  function savePermission(e) {
    e.preventDefault();

    if (id === "") {
      alert("Vui lòng chọn vai trò để cập nhật quyền!")
      return;
    }

    const permissions = [];

    for (const [key, value] of Object.entries(permission))
      if (value) permissions.push(key);

    if (permissions.length === 0) {
      alert("Vui lòng cung cấp ít nhất 1 quyền cho vai trò!")
      return;
    }

    if (confirm(`Bạn có muốn cung cấp các quyền này cho ${name}?`)) {
      
      const headers = { headers: { 'Content-Type': 'application/json' }}
      axios.post("/api/role/update/permission", { id, permissions }, headers).then(() => {
        alert("Cập nhật quyền thành công!");
        location.reload();
      }).catch(response => {
        if (response.status === 403) alert("Bạn không có quyền. Vui lòng liên hệ lại với quản trị viên."); 
        else {
          alert("Đã có lỗi xảy ra, cập nhật quyền thất bại!");
          console.error(response)
        }
      })
    }
  }

  function deleteRole(id, name) {
    if (confirm(`Bạn có muốn xóa vai trò ${name}?`)) {
      axios.delete(`/api/role/delete?id=${id}`).then(() => {
        alert("Xóa vai trò thành công!")
        location.reload();
      }).catch(response => {
        if (response.status === 403) alert("Bạn không có quyền. Vui lòng liên hệ lại với quản trị viên.");
        else if (response.status === 500) {
          toggleRedelegate(true);
          setRedelegateId(id);
        }
        else {
          alert("Đã có lỗi xảy ra, xóa vai trò thất bại!");
          console.error(response);
        }
      })
    }
  }
}

export default Role;