import { React, useState, useEffect, useRef } from "react";
import { FloppyDisk, X, Pencil, LockKey, LockKeyOpen } from "@phosphor-icons/react";
import axios from "axios";
import Search from "/src/Admin/components/Search";
import Pagination from "/src/Admin/components/Pagination";
import Loading from "/src/components/Loading";

const ASeries = () => {
  const defaultThumbnail = "/src/images/series/default.png";
  const [series, setSeries] = useState([]);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(defaultThumbnail);
  const numPerPage = 10;
  const pageRef = useRef(0);
  const totalRef = useRef(0);
  const searchRef = useRef("");
  const loadingRef = useRef(true);

  useEffect(() => {
    if (loadingRef) {
      document.title = "Quản lý bộ sách";
      axios.get("/api/series/get-all").then(response => setSeries(response.data))
      loadingRef.current = false;
    }
  }, []);

  return loadingRef.current ? <Loading /> : (
    <main className="mx-20">
      <h1 className="text-center text-pink-900 font-bold text-4xl mt-4 mb-3">QUẢN LÝ BỘ SÁCH</h1>
      <hr className="mb-3 border-pink-900" />

      <section className="grid grid-cols-[300px_1fr] gap-x-4 text-lg text-pink-900 items-start">
        {/* Điền thông tin */}
        <form className="border-r-2 border-r-pink-900 p-2 pe-4 mb-4">
          <div className="mb-3">
            <label htmlFor="id" className="block font-bold italic">ID:</label>
            <input type="text" readOnly={true} id="id" value={id} className="bg-pink-50 border-1 border-pink-50 rounded-full text-pink-900/50 py-1 px-4 w-full cursor-not-allowed" />
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="block font-bold italic">Tên bộ sách:</label>
            <input type="text" id="name" required value={name} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150"
              onChange={e => setName(e.target.value)} onInput={() => clearNameValidation()} />
            <p id="error-name" className="text-red-700 italic text-base"></p>
          </div>

          <div>
            <label htmlFor="file-upload" className="block font-bold italic">Ảnh bìa:</label>
            <img id="thumbnail-preview" src={image} alt="thumbnail" className="h-40" onClick={() => document.getElementById("file-upload").click()} />
            <p id="error-image" className="text-red-700 italic text-base"></p>
          </div>
          <input type="file" id="file-upload" onChange={handleThumbnailUpload} accept="image/*" className="h-0" />

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
                <th className="w-[15%] text-pink-50">Hình minh họa</th>
                <th className="w-[55%] text-pink-50">Tên bộ sách</th>
                <th className="w-[25%] text-pink-50"></th>
              </tr>
            </thead>
            <tbody>
              {
                series.map(s => 
                  <tr key={s.id} className="even:bg-pink-50">
                    <td>{s.id}</td>
                    <td className="flex justify-center">
                      <img src={s.image} alt={s.name} className="h-25" onClick={() => loadUpdate(s)} />
                    </td>
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
                          <button className="bg-green-600 text-white flex gap-x-1 px-3 py-1 rounded-[7px] hover:bg-green-600/80 duration-150 cursor-pointer" onClick={() => status(s.id, s.isActive)}>
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
    axios.get(searchRef.current === "" ? '/api/series/get-all' : `/api/series/get?name=${searchRef.current}`).then(response => {
      totalRef.current = Math.ceil(response.data.length / numPerPage);
      setSeries(response.data.slice((pageRef.current - 1) * numPerPage, pageRef.current * numPerPage));
    });
  }

  function search(attr, prop) {
    pageRef.current = 1;
    searchRef.current = prop;
    if (prop === "") axios.get("/api/series/get-all").then(response => {
      totalRef.current = Math.ceil(response.data.length / numPerPage);
      setSeries(response.data.slice((pageRef.current - 1) * numPerPage, pageRef.current * numPerPage));
    });
    else axios.get(`/api/series/get?${attr}=${prop}`).then(response => {
      totalRef.current = Math.ceil(response.data.length / numPerPage);
      setSeries(response.data.slice((pageRef.current - 1) * numPerPage, pageRef.current * numPerPage));
    });
  }

  function loadUpdate(series) {
    setID(series.id);
    setName(series.name);
    setImage(series.image);
    document.getElementById("name").focus();
  }

  function handleThumbnailUpload(e) {
    try {
      setImage(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = e => document.getElementById('thumbnail-preview').src = e.target.result;
      reader.readAsDataURL(e.target.files[0]);
    }
    catch {
      setImage(defaultThumbnail);
    }
    finally {
      clearImageValidation();
    }
  }

  function clearNameValidation() {
    document.getElementById("error-name").innerHTML = "";
    document.getElementById("name").classList.remove("focus-error");
  }

  function clearImageValidation() {
    document.getElementById("error-image").innerHTML = "";
  }

  function save(e) {
    e.preventDefault();

    clearNameValidation();
    clearImageValidation();

    let errorFlag = false;

    if (name === "") {
      document.getElementById("error-name").innerHTML = "Vui lòng nhập tên cho bộ sách.";
      document.getElementById("name").classList.add("focus-error");
      document.getElementById("name").focus();
      errorFlag = true;
    }

    if (document.getElementById("file-upload").value === "") {
      document.getElementById("error-image").innerHTML = "Vui lòng tải hình minh họa.";
      errorFlag = true;
    }

    if (!errorFlag) (id === "") ? insert() : update();
  }

  function cancel(e) {
    e.preventDefault();
    setID("");
    setName("");
    setImage(defaultThumbnail);
    clearNameValidation();
    clearImageValidation();
    document.getElementById("file-upload").value = "";
  }

  function insert() {
    if (confirm("Bạn có muốn thêm bộ sách này?")) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image.name);
      formData.append("file", image);

      const headers = { headers: { 'Content-Type': 'multipart/form-data' }}
      axios.post("/api/series/insert", formData, headers).then(() => {
        alert("Thêm bộ sách thành công!");
        location.reload();
      }).catch(response => {
        if (response.status === 403) alert("Bạn không có quyền. Vui lòng liên hệ lại với quản trị viên."); 
        else {
          alert("Đã có lỗi xảy ra, thêm thất bại");
          console.error(response)
        }
      })
    };
  }

  function update() {
    if (confirm("Bạn có muốn cập nhật bộ sách này?")) {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);

      if (image && image instanceof File) {
        formData.append("image", image.name);
        formData.append("file", image);
      }
      else {
        formData.append("image", image);
        const emptyFile = new File([], "empty.jpg");
        formData.append("file", emptyFile);
      }

      const headers = { headers: { 'Content-Type': 'multipart/form-data' }}

      axios.post("/api/series/update", formData, headers).then(() => {
        alert("Cập nhật thông tin thành công!");
        location.reload();
      }).catch(response => {
        if (response.status === 403) alert("Bạn không có quyền. Vui lòng liên hệ lại với quản trị viên.");
        else {
          alert("Đã có lỗi xảy ra, cập nhật thất bại!");
          console.error(response)
        }
      }).catch(err => console.error(err));
    }
  }

  function status(id, status) {
    if (confirm(`Bạn có muốn ${status === 1 ? "" : "mở "}khóa bộ sách này?`)) {
      axios.delete(`/api/series/update/status?id=${id}`).then(() => {
        alert(`${status === 1 ? "Khóa" : "Mở khóa"} bộ sách thành công!`);
        location.reload();
      }).catch(response => {
        if (response.status === 403) alert("Bạn không có quyền. Vui lòng liên hệ lại với quản trị viên.");
        else {
          alert(`Đã có lỗi xảy ra, ${status === 1 ? "" : "mở "}khóa thất bại!`);
          console.error(response)
        }
      }).catch(err => console.error(err));
    }
  }
}

export default ASeries;