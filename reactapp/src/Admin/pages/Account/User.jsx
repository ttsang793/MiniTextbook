import { React, useState, useEffect, useRef } from "react";
import { LockKey, LockKeyOpen, MagnifyingGlass } from "@phosphor-icons/react";
import axios from "axios";
import Pagination from "/src/Admin/components/Pagination";

const User = ({show}) => {
  const [user, setUser] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const numPerPage = 20;
  const pageRef = useRef(0);
  const totalRef = useRef(0);
  const searchRef = useRef("");

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={show ? "" : "hidden"}>
      <div className="flex w-1/4 items-center my-2 ml-auto justify-end">
        <p className="me-2">Username:</p>
        <input
          type="search" id="search-input" className="bg-gray-300/70 text-gray-900 flex-1 rounded-s-full py-2 ps-5 placeholder:italic"
          placeholder="Tìm kiếm..." spellCheck="false" value={searchVal} onChange={e => setSearchVal(e.target.value)}
          onKeyDown={e => {if (e.nativeEvent.key === "Enter") document.getElementById("search-btn").click()}}
        />
        <button id="search-btn" className="p-2 rounded-e-full bg-gray-300/70 text-gray-900 cursor-pointer hover:bg-pink-900 hover:text-pink-300 duration-200" onClick={search}>
          <MagnifyingGlass size={24} className="cursor-pointer" />
        </button>
      </div>

      <table className="text-center w-full">
        <thead>
          <tr className="bg-linear-to-r from-pink-700 to-pink-900">
            <th className="w-[5%] text-pink-50 py-1">ID</th>
            <th className="w-[65%] text-pink-50">Username</th>
            <th className="w-[20%] text-pink-50">Tình trạng</th>
            <th className="w-[10%] text-pink-50"></th>
          </tr>
        </thead>
        <tbody>
          {
            user.map(u => 
              <tr key={u.id} className="even:bg-pink-50">
                <td>{u.id}</td>
                <td className="py-3 text-left">{u.username}</td>
                <td className="py-3 text-left">{u.status}</td>
                <td>
                  {
                    u.status !== "Đã khóa" ? (
                      <button className="bg-red-600 text-white flex items-center gap-x-1 px-3 py-1 rounded-[7px] hover:bg-red-600/70 duration-150 cursor-pointer" onClick={() => lock(u.id)}>
                        <LockKey size={28} /> Khóa
                      </button>
                    ) : (
                      <button className="bg-yellow-400 text-black flex items-center gap-x-1 px-3 py-1 rounded-[7px] hover:bg-yellow-400/50 duration-150 cursor-pointer" onClick={() => unlock(u.id)}>
                        <LockKeyOpen size={28} /> Mở khóa
                      </button>
                    )
                  }
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
      <Pagination page={pageRef.current} total={totalRef.current} onClick={loadData} />
    </div>
  )

  function loadData(newPage = 1) {
    pageRef.current = newPage;
    axios.get('/admin/user/get').then(response => {
      totalRef.current = Math.ceil(response.data.length / numPerPage);
      setUser(response.data.slice((pageRef.current - 1) * numPerPage, pageRef.current * numPerPage));
    });
  }

  function search() {
    pageRef.current = 1;
    searchRef.current = searchVal;
    axios.get(`/admin/user/get${searchRef.current !== "" ? `?username=${searchRef.current}` : ""}`).then(response => {
      totalRef.current = Math.ceil(response.data.length / numPerPage);
      setUser(response.data.slice((pageRef.current - 1) * numPerPage, pageRef.current * numPerPage));
    });
  }

  function lock(id) {
    if (confirm("Bạn có muốn khóa tài khoản này?")) {
      axios.post(`/admin/user/lock?id=${id}`).then(response => {
        if (response.status === 200) {
          alert("Khóa tài khoản thành công!");
          location.reload();
        }
        else {
          alert("Đã có lỗi xảy ra, khóa tài khoản thất bại!");
          console.error(response)
        }
      }).catch(err => console.error(err));
    }
  }

  function unlock(id) {
    if (confirm("Bạn có muốn mở khóa tài khoản này?")) {
      axios.post(`/admin/user/unlock?id=${id}`).then(response => {
        if (response.status === 200) {
          alert("Mở khóa tài khoản thành công!");
          location.reload();
        }
        else {
          alert("Đã có lỗi xảy ra, mở khóa tài khoản thất bại!");
          console.error(response)
        }
      }).catch(err => console.error(err));
    }
  }
}

export default User;