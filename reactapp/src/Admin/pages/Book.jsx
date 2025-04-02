import { React, useState, useEffect } from "react";
import { FloppyDisk, X, Pencil, LockKey, LockKeyOpen } from "@phosphor-icons/react";
import axios from "axios";

const ABook = () => {
  // Danh sách các tập hợp sử dụng trong trang
  const [bookList, setBookList] = useState([]);
  const gradeList = [10, 11, 12];
  const [publisherList, setPublisherList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  // Các tham số của sách
  const [bId, setBID] = useState("");
  const [bName, setBName] = useState("");
  const [bImage, setBImage] = useState("");
  const [bGrade, setBGrade] = useState(10);
  const [bSubject, setBSubject] = useState("");
  const [bPublisher, setBPublisher] = useState("");
  const [bPrice, setBPrice] = useState(0);

  // useEffect để load danh sách
  useEffect(() => {
    document.title = "Quản lý sách";
    axios.get("/admin/book/get-all").then(response => setBookList(response.data));
    axios.get("/admin/publisher/get-all").then(response => setPublisherList(response.data));
    axios.get("/admin/series/get-all").then(response => setSeriesList(response.data));
    axios.get("/admin/subject/get-all").then(response => setSubjectList(response.data));
  }, []);

  return (
    <main className="mx-20">
      <h1 className="text-center text-pink-900 font-bold text-4xl mt-4 mb-3">QUẢN LÝ SÁCH</h1>
      <hr className="mb-3 border-pink-900" />

      <section className="grid grid-cols-[300px_1fr] gap-x-4 text-lg text-pink-900 items-start">
        {/* Điền thông tin */}
        <form className="border-r-2 border-r-pink-900 p-2 pe-4">
          <div className="mb-3">
            <label htmlFor="id" className="block font-bold italic">ID:</label>
            <input type="text" readOnly={true} id="id" value={bId} className="bg-pink-50 border-1 border-pink-50 rounded-full text-pink-900/50 py-1 px-4 w-full cursor-not-allowed" />
          </div>
          
          <div className="mb-3">
            <label htmlFor="name" className="block font-bold italic">Tên:</label>
            <input type="text" id="name" value={bName} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" onChange={e => setBName(e.target.value)} />
          </div>
          
          <div className="mb-3">
            <label htmlFor="image" className="block font-bold italic">Đường dẫn ảnh: </label>
            <input type="text" id="image" value={bImage} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" onChange={e => setBImage(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="grade" className="block font-bold italic">Khối: </label>
            <select id="grade" value={bGrade} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" onChange={e => setBGrade(e.target.value)}>
            { gradeList.map(g => <option key={`grade-${g}`} value={g} className="hover:bg-pink-900 hover:text-pink-50">{g}</option>) }
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="subject">Môn: </label>
            <select id="subject" value={bSubject} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" onChange={e => setBSubject(e.target.value)}>
            { subjectList.map(s => <option key={`sub-${s.id}`} value={s.id}>{s.name}</option>) }
            </select>
          </div>

          <div className="mb-3">
          <label htmlFor="publisher" className="block font-bold italic">NXB:</label>
            <select id="publisher" value={bPublisher} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" onChange={e => setBPublisher(e.target.value)}>
            { publisherList.map(p => <option key={`pub-${p.id}`} value={p.id}>{p.name}</option>) }
            </select>
          </div>

          {/*
          <div className="mb-3">
            Bộ sách:<br />
            {
              seriesList.map(s =>
                <div key={`series-${s.id}`}>
                  <input type="checkbox" id={`series-${s.id}`} value={s.name} />
                  &nbsp;<label htmlFor={`series-${s.id}`}>{s.name}</label>
                </div>
              )
            }
          </div>*/
          }
          
          <div className="mb-6">
            <label htmlFor="price" className="block font-bold italic">Giá: </label>
            <input type="number" id="price" value={bPrice} step={1000} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" onChange={e => setBPrice(e.target.value)} />
          </div>
          
          <div className="mb-3 flex justify-center">
            <img src="/src/images/products/TIN_10_CD.jpg" alt="thumbnail" />
          </div>

          <div className="flex gap-x-4 justify-center">
            <button className="bg-green-900 text-white flex gap-x-1 px-3 py-1 rounded-full cursor-pointer hover:bg-green-600 duration-150" onClick={e => save(e)}>
              <FloppyDisk size={28} /> Lưu
            </button>

            <button className="bg-red-900 text-white flex gap-x-1 px-3 py-1 rounded-full cursor-pointer hover:bg-red-600 duration-150" onClick={() => cancel()} >
              <X size={28} /> Hủy
            </button>
          </div>
        </form>

        {/* Hiển thị danh sách */}
        <table className="text-center">
          <thead>
            <tr className="bg-linear-to-r from-pink-700 to-pink-900">
              <th className="w-[5%] text-pink-50 py-1">ID</th>
              <th className="w-[15%] text-pink-50 py-1">Hình minh họa</th>
              <th className="w-[55%] text-pink-50 py-1">Tên sách</th>
              <th className="w-[25%] text-pink-50 py-1"></th>
            </tr>
          </thead>
          <tbody>
            {
              bookList.map(b => 
                <tr key={b.id} className="even:bg-pink-50">
                  <td>{b.id}</td>
                  <td className="flex justify-center">
                    <img src={`/src/images/products/${b.image}`} alt={b.name} className="h-50 aspect-7/10" />
                  </td>
                  <td className="py-3 text-left">{b.name}</td>
                  <td>
                    {
                      b.isActive ? (<div className="flex gap-x-3">
                        <button className="bg-yellow-400 text-black flex gap-x-1 px-3 py-1 rounded-[7px] hover:bg-yellow-400/50 duration-150 cursor-pointer" onClick={() => loadUpdate(b)}>
                          <Pencil size={28} /> Cập nhật
                        </button>
                        <button className="bg-red-600 text-white flex gap-x-1 px-3 py-1 rounded-[7px] hover:bg-red-600/70 duration-150 cursor-pointer" onClick={() => status(b.id, b.isActive)}>
                          <LockKey size={28} /> Khóa
                        </button>
                      </div>) : (
                        <button className="bg-green-400 text-black  flex gap-x-1 px-3 py-1 rounded-[7px] hover:bg-green-400/50 duration-150 cursor-pointer" onClick={() => status(b.id, b.isActive)}>
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
      </section>
    </main>
  )

  function loadUpdate(book) {
    setBID(book.id);
    setBName(book.name);
    setBImage(book.image);
    setBGrade(book.grade);
    setBPublisher(book.publisher);
    setBSubject(book.subject);
    setBPrice(book.price);
  }

  function save(e) {
    e.preventDefault();
    console.log(bId === "");
    (bId === "") ? insert() : update();
  }

  function cancel() {
    setBID("");
    setBName("");
    setBImage("");
    setBGrade(10);
    setBPublisher(publisherList[0]);
    setBSubject(subjectList[0]);
    setBPrice(0);
  }

  function insert() {
    if (confirm("Bạn có muốn thêm sách giáo khoa này?")) {
      const book = { name: bName, image: bImage, grade: bGrade, subject: bSubject, publisher: bPublisher, price: bPrice, isActive: true };
      const headers = { headers: { 'Content-Type': 'application/json' }}
      axios.post("/admin/book/insert", book, headers).then(response => {
        if (response.status === 200) {
          alert("Thêm thành công");
          location.reload();
        }
        else {
          alert("Đã có lỗi xảy ra, thêm thất bại");
          console.error(response)
        }
      }).catch(err => console.error(err));
    };
  }

  function update() {
    if (confirm("Bạn có muốn cập nhật thông tin cho sách giáo khoa này?")) {
      const book = { id: bId, name: bName, image: bImage, grade: bGrade, subject: bSubject, publisher: bPublisher, price: bPrice };
      const headers = { headers: { 'Content-Type': 'application/json' }}
      axios.put("/admin/book/update", book, headers).then(response => {
        if (response.status === 200) {
          alert("Cập nhật thành công");
          location.reload();
        }
        else {
          alert("Đã có lỗi xảy ra, cập nhật thất bại");
          console.error(response)
        }
      }).catch(err => console.error(err));
    };
  }

  function status(id, status) {
    if (confirm(`Bạn có muốn ${status === 1 ? "" : "mở "}khóa sách giáo khoa này?`)) {
      axios.delete(`/admin/book/update-status?id=${id}`).then(response => {
        if (response.status === 200) {
          alert("Cập nhật thành công");
          location.reload();
        }
        else {
          alert("Đã có lỗi xảy ra, cập nhật thất bại");
          console.error(response)
        }
      }).catch(err => console.error(err));
    }    
  }
}

export default ABook;