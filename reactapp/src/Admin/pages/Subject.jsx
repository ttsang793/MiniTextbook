import { React, useState, useEffect, useRef } from "react";
import { FloppyDisk, X, Pencil, LockKey, LockKeyOpen } from "@phosphor-icons/react";
import axios from "axios";
import Search from "/src/Admin/components/Search";
import Pagination from "/src/Admin/components/Pagination";
import Loading from "/src/components/Loading";

const ASubject = () => {
  const [subject, setSubject] = useState([]);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const numPerPage = 10;
  const pageRef = useRef(0);
  const totalRef = useRef(0);
  const searchRef = useRef("");
  const loadingRef = useRef(true);

  useEffect(() => {
    if (loadingRef.current) {
      document.title = "Quản lý môn học";
      loadData();
      loadingRef.current = false;
    }
  }, []);

  return loadingRef.current ? <Loading /> : (
    <main className="mx-20">
      <h1 className="text-center text-pink-900 font-bold text-4xl mt-4 mb-3">QUẢN LÝ MÔN HỌC</h1>
      <hr className="mb-3 border-pink-900" />

      <section className="grid grid-cols-[300px_1fr] gap-x-4 text-lg text-pink-900 items-start">
        {/* Điền thông tin */}
        <form className="border-r-2 border-r-pink-900 p-2 pe-4" style={{ height: "calc(100dvh - 160px)" }}>
          <div className="mb-3">
            <label htmlFor="id" className="block font-bold italic">ID:</label>
            <input type="text" readOnly={true} id="id" value={id} className="bg-pink-50 border-1 border-pink-50 rounded-full text-pink-900/50 py-1 px-4 w-full cursor-not-allowed" />
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="block font-bold italic">Tên môn học:</label>
            <input type="text" id="name" required value={name} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150"
              onChange={e => setName(e.target.value)} />
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
                <th className="w-[5%] text-pink-50 py-1">ID</th>
                <th className="w-[70%] text-pink-50">Tên môn học</th>
                <th className="w-[25%] text-pink-50"></th>
              </tr>
            </thead>
            <tbody>
              {
                subject.map(s => 
                  <tr key={s.id} className="even:bg-pink-50">
                    <td>{s.id}</td>
                    <td className="py-3 text-left">{s.name}</td>
                    <td>
                      {
                        s.isActive ? (<div className="flex gap-x-3">
                          <button className="bg-yellow-400 text-black flex gap-x-1 px-3 py-1 rounded-[7px] hover:bg-yellow-400/50 duration-150 cursor-pointer" onClick={() => loadUpdate(s)}>
                            <Pencil size={28} /> Cập nhật
                          </button>
                          <button className="bg-red-600 text-white flex gap-x-1 px-3 py-1 rounded-[7px] hover:bg-red-600/70 duration-150 cursor-pointer" onClick={() => status(s.id, s.isActive)}>
                            <LockKey size={28} /> Khóa
                          </button>
                        </div>) : (
                          <button className="bg-green-400 text-black flex gap-x-1 px-3 py-1 rounded-[7px] hover:bg-green-400/50 duration-150 cursor-pointer" onClick={() => status(s.id, s.isActive)}>
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
      </section>
    </main>
  )

  function loadData(newPage = 1) {
    pageRef.current = newPage;
    axios.get(searchRef.current === "" ? '/admin/subject/get-all' : `/admin/subject/get?name=${searchRef.current}`).then(response => {
      totalRef.current = Math.ceil(response.data.length / numPerPage);
      setSubject(response.data.slice((pageRef.current - 1) * numPerPage, pageRef.current * numPerPage));
    });
  }

  function search(attr, prop) {
    pageRef.current = 1;
    searchRef.current = prop;
    if (prop === "") axios.get("/admin/subject/get-all").then(response => {
      totalRef.current = Math.ceil(response.data.length / numPerPage);
      setSubject(response.data.slice((pageRef.current - 1) * numPerPage, pageRef.current * numPerPage));
    });
    else axios.get(`/admin/subject/get?${attr}=${prop}`).then(response => {
      totalRef.current = Math.ceil(response.data.length / numPerPage);
      setSubject(response.data.slice((pageRef.current - 1) * numPerPage, pageRef.current * numPerPage));
    });
  }

  function loadUpdate(subject) {
    setID(subject.id);
    setName(subject.name);
    document.getElementById("name").focus();
  }

  function save(e) {
    e.preventDefault();
    (id === "") ? insert() : update();
  }

  function cancel(e) {
    e.preventDefault()
    setID("");
    setName("");
  }

  function insert() {
    if (confirm("Bạn có muốn thêm môn học này?")) {
      const subject = { name };
      const headers = { headers: { 'Content-Type': 'application/json' }}
      axios.post("/admin/subject/insert", subject, headers).then(response => {
        if (response.status === 200) {
          alert("Thêm môn học thành công");
          location.reload();
        }
        else {
          alert("Đã có lỗi xảy ra, thêm môn học thất bại!");
          console.error(response)
        }
      }).catch(err => console.error(err));
    };
  }

  function update() {
    if (confirm("Bạn có muốn cập nhật môn học này?")) {
      const subject = { id, name, isActive: true };
      const headers = { headers: { 'Content-Type': 'application/json' }}
      axios.put("/admin/subject/update", subject, headers).then(response => {
        if (response.status === 200) {
          alert("Cập nhật thông tin thành công!");
          location.reload();
        }
        else {
          alert("Đã có lỗi xảy ra, cập nhật thất bại!");
          console.error(response)
        }
      }).catch(err => console.error(err));
    }
  }

  function status(id, status) {
    if (confirm(`Bạn có muốn ${status === 1 ? "" : "mở "}khóa môn học này?`)) {
      axios.delete(`/admin/subject/update-status?id=${id}`).then(response => {
        if (response.status === 200) {
          alert(`${status === 1 ? "Mở khóa" : "Khóa"} môn học thành công!`);
          location.reload();
        }
        else {
          alert(`Đã có lỗi xảy ra, ${status === 1 ? "" : "mở "}khóa môn học thất bại!`);
          console.error(response)
        }
      }).catch(err => console.error(err));
    }
  }
}

export default ASubject;