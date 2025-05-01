import { React, useState, useEffect, useRef } from "react";
import { FloppyDisk, X, Pencil, LockKey, LockKeyOpen } from "@phosphor-icons/react";
import axios from "axios";
import Search from "/src/Admin/components/Search";
import Pagination from "/src/Admin/components/Pagination";

const ABook = () => {
  // Hằng số mặc định
  const gradeList = [10, 11, 12];
  const defaultThumbnail = "/src/images/product/default.png";
  const numPerPage = 5;
  const pageRef = useRef(1);
  const totalRef = useRef(0);
  const loadingRef = useRef(true);
  const searchRef = useRef("");

  // Danh sách các tập hợp sử dụng trong trang
  const [bookList, setBookList] = useState([]);
  const [publisherList, setPublisherList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  // Các tham số của sách
  const [bId, setBID] = useState("");
  const [bName, setBName] = useState("");
  const [bImage, setBImage] = useState(defaultThumbnail);
  const [bGrade, setBGrade] = useState(10);
  const [bPublisher, setBPublisher] = useState(0);
  const [bPrice, setBPrice] = useState(0);
  let [bSeries, setBSeries] = useState({});
  const [bSubject, setBSubject] = useState(0);

  // Xử lý bộ sách
  const handleBSeries = (id, specific = null) => {
    const updatedBSeries = {...bSeries};
    updatedBSeries[`${id}`] = specific !== null ? specific : !updatedBSeries[`${id}`];
    setBSeries(bSeries = updatedBSeries);
  }

  // useEffect để load danh sách
  useEffect(() => {
    if (loadingRef.current) {
      document.title = "Quản lý sách";
      loadData();
      axios.get("/admin/publisher/get-all").then(response => {
        setPublisherList(response.data);
        setBPublisher(response.data[0].id);
      });
      axios.get("/admin/subject/get-all").then(response => {
        setSubjectList(response.data);
        setBSubject(response.data[0].id);
      });

      axios.get("/admin/series/get-all").then(response => {
        let temp = {}
        setSeriesList(response.data);
        response.data.forEach(r => temp[`${r.id}`] = false);
        setBSeries(bSeries = temp);
      });
      loadingRef.current = false;
    }
  }, []);

  return loadingRef.current ? <>Hello World</> : (
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
            <label htmlFor="grade" className="block font-bold italic">Khối:</label>
            <select id="grade" value={bGrade} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" onChange={e => setBGrade(e.target.value)}>
            { gradeList.map(g => <option key={`grade-${g}`} value={g} className="hover:bg-pink-900 hover:text-pink-50">{g}</option>) }
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="subject" className="block font-bold italic">Môn:</label>
            <select id="subject" value={bSubject} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" onChange={e => setBSubject(e.target.value)}>
            { subjectList.map(s => <option key={`sub-${s.id}`} value={s.id}>{s.name}</option>) }
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="publisher" className="block font-bold italic">Nhà xuất bản:</label>
            <select id="publisher" value={bPublisher} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" onChange={e => setBPublisher(e.target.value)}>
            { publisherList.map(p => <option key={`pub-${p.id}`} value={p.id}>{p.name}</option>) }
            </select>
          </div>

          <div className="mb-3">
            <label className="block font-bold italic text-xl">Bộ sách:</label>
            {
              seriesList.map(s =>
                <div key={`series-${s.id}`}>
                  <input type="checkbox" id={`series-${s.id}`} checked={bSeries[`${s.id}`]} onChange={() => handleBSeries(s.id)} />
                  &nbsp;<label htmlFor={`series-${s.id}`}>{s.name}</label>
                </div>
              )
            }
          </div>
          
          <div className="mb-6">
            <label htmlFor="price" className="block font-bold italic text-xl">Giá: </label>
            <input type="number" id="price" value={bPrice} step={1000} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" onChange={e => setBPrice(e.target.value)} />
          </div>
          
          <div>
            <img id="thumbnail-preview" src={bImage} alt="thumbnail" className="aspect-7/10" onClick={() => document.getElementById("file-upload").click()} />
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
                      <img src={b.image} alt={b.name} className="h-50 aspect-7/10" onClick={() => loadUpdate(b)} />
                    </td>
                    <td className="py-3 text-left">{b.name}</td>
                    <td>
                      {
                        b.isActive ? (
                          <div className="flex gap-x-3">
                            <button
                              className="bg-yellow-400 text-black flex gap-x-1 px-3 py-1 rounded-[7px] hover:bg-yellow-400/50 duration-150 cursor-pointer"
                              onClick={() => loadUpdate(b)}
                            >
                              <Pencil size={28} /> Cập nhật
                            </button>
                            <button
                              className="bg-red-600 text-white flex gap-x-1 px-3 py-1 rounded-[7px] hover:bg-red-600/70 duration-150 cursor-pointer"
                              onClick={() => status(b.id, b.isActive)}
                            >
                              <LockKey size={28} /> Khóa
                            </button>
                          </div>
                        ) : (
                          <button
                            className="bg-green-400 text-black flex gap-x-1 px-3 py-1 rounded-[7px] hover:bg-green-400/50 duration-150 cursor-pointer"
                            onClick={() => status(b.id, b.isActive)}
                          >
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

  async function loadData(newPage = 1) {
    pageRef.current = newPage;

    let temp = {};
    const seriesResponse = await axios.get("/product/get-series");
    setSeriesList(seriesResponse.data);
    seriesResponse.data.forEach(r => temp[`${r.id}`] = false);
    setBSeries(bSeries = temp);
    console.log(bSeries);

    axios.get(searchRef.current === "" ? '/admin/book/get-all' : `/admin/book/get?name=${searchRef.current}`).then(response => {
      totalRef.current = Math.ceil(response.data.length / numPerPage);
      setBookList(response.data.slice((pageRef.current - 1) * numPerPage, pageRef.current * numPerPage));
    });
  }

  function search(attr, prop) {
    pageRef.current = 1;
    searchRef.current = prop;
    if (prop === "") axios.get("/admin/book/get-all").then(response => {
      totalRef.current = Math.ceil(response.data.length / numPerPage);
      setBookList(response.data.slice((pageRef.current - 1) * numPerPage, pageRef.current * numPerPage));
    });
    else axios.get(`/admin/book/get?${attr}=${prop}`).then(response => {
      totalRef.current = Math.ceil(response.data.length / numPerPage);
      setBookList(response.data.slice((pageRef.current - 1) * numPerPage, pageRef.current * numPerPage));
    });
  }

  function loadUpdate(book) {
    setBID(book.id);
    setBName(book.name);
    setBImage(book.image);
    setBGrade(book.grade);
    setBPublisher(book.publisher);
    setBSubject(book.subject);
    setBPrice(book.price);
    document.getElementById("name").focus();

    let tempBookId = [];
    book.bookSeries.forEach(b => tempBookId.push(`${b.series}`));

    for (const [key, value] of Object.entries(bSeries)) handleBSeries(key, tempBookId.includes(key));
  }

  function handleThumbnailUpload(e) {
    setBImage(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = e => document.getElementById('thumbnail-preview').src = e.target.result;
    reader.readAsDataURL(e.target.files[0]);
  }

  function save(e) {
    e.preventDefault();
    (bId === "") ? insert() : update();
  }

  function cancel(e) {
    e.preventDefault()
    setBID("");
    setBName("");
    setBImage(defaultThumbnail);
    setBGrade(10);
    setBPublisher(publisherList[0]);
    setBSubject(subjectList[0]);
    setBPrice(0);

    for (const [key, value] of Object.entries(bSeries)) if (value) handleBSeries(key);
  }

  function insert() {
    if (confirm("Bạn có muốn thêm sách giáo khoa này?")) {
      const formData = new FormData();
      formData.append("name", bName);
      formData.append("image", bImage.name);
      formData.append("grade", bGrade);
      formData.append("subject", bSubject);
      formData.append("publisher", bPublisher);
      formData.append("price", bPrice);

      for (const [key, value] of Object.entries(bSeries))
        if (value) formData.append("series[]", key);

      formData.append("file", bImage);
      
      const headers = { headers: { 'Content-Type': 'multipart/form-data' }}
      axios.post("/admin/book/insert", formData, headers).then(response => {
        if (response.status === 200) {
          alert("Thêm thành công");
          //location.reload();
        }
        else {
          alert("Đã có lỗi xảy ra, thêm thất bại");
          console.error(response)
        }
      }).catch(err => console.error(err));
    }
  }

  function update() {
    if (confirm("Bạn có muốn cập nhật thông tin cho sách giáo khoa này?")) {
      const formData = new FormData();
      formData.append("id", bId);
      formData.append("name", bName);
      formData.append("grade", bGrade);
      formData.append("subject", bSubject);
      formData.append("publisher", bPublisher);
      formData.append("series", bSeries);
      formData.append("price", bPrice);

      if (bImage && bImage instanceof File) {
        formData.append("image", bImage.name);
        formData.append("file", bImage);        
      }
      else {
        formData.append("image", bImage);
        const emptyFile = new File([], "empty.jpg");
        formData.append("file", emptyFile)
      }

      const headers = { headers: { 'Content-Type': 'multipart/form-data' }};

      axios.post("/admin/book/update", formData, headers).then(response => {
        if (response.status === 200) {
          alert("Cập nhật thành công");
          location.reload();
        }
        else if (typeof bImage === "string") {
          alert("Đã có lỗi xảy ra, cập nhật thất bại");
          console.error(response);
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