import { React, useState, useEffect, useRef } from "react";
import { FloppyDisk, X, Pencil, LockKey, LockKeyOpen } from "@phosphor-icons/react";
import axios from "axios";
import Search from "/src/Admin/components/Search";
import Pagination from "/src/Admin/components/Pagination";
import Loading from "/src/components/Loading";

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
  const [bGrade, setBGrade] = useState(-1);
  const [bPublisher, setBPublisher] = useState(-1);
  const [bPrice, setBPrice] = useState(0);
  let [bSeries, setBSeries] = useState({});
  const [bSubject, setBSubject] = useState(-1);

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
      axios.get("/api/book/get/publisher").then(response => setPublisherList(response.data));
      axios.get("/api/book/get/subject").then(response => setSubjectList(response.data));

      axios.get("/api/book/get/series").then(response => {
        let temp = {}
        setSeriesList(response.data);
        response.data.forEach(r => temp[`${r.id}`] = false);
        setBSeries(bSeries = temp);
      });
      loadingRef.current = false;
    }
  }, []);

  return loadingRef.current ? <Loading /> : (
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
            <input type="text" id="name" value={bName} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150"
              onChange={e => setBName(e.target.value)} onInput={() => clearNameValidation()} />
            <p id="error-name" className="text-red-700 italic text-base"></p>
          </div>

          <div className="mb-3">
            <label htmlFor="grade" className="block font-bold italic">Khối:</label>
            <select id="grade" value={bGrade} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150"
              onChange={e => { setBGrade(e.target.value); clearGradeValidation(); }}>
              <option value="-1" hidden>-- Chọn khối --</option>
              { gradeList.map(g => <option key={`grade-${g}`} value={g} className="hover:bg-pink-900 hover:text-pink-50">{g}</option>) }
            </select>
            <p id="error-grade" className="text-red-700 italic text-base"></p>
          </div>

          <div className="mb-3">
            <label htmlFor="subject" className="block font-bold italic">Môn:</label>
            <select id="subject" value={bSubject} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150"
              onChange={e => { setBSubject(e.target.value); clearSubjectValidation(); }}>
              <option value="-1" hidden>-- Chọn môn --</option>
              { subjectList.map(s => <option key={`sub-${s.id}`} value={s.id}>{s.name}</option>) }
            </select>
            <p id="error-subject" className="text-red-700 italic text-base"></p>
          </div>

          <div className="mb-3">
            <label htmlFor="publisher" className="block font-bold italic">Nhà xuất bản:</label>
            <select id="publisher" value={bPublisher} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150"
              onChange={e => { setBPublisher(e.target.value); clearPublisherValidation(); }}>
              <option value="-1" hidden>-- Chọn nhà xuất bản --</option>
              { publisherList.map(p => <option key={`pub-${p.id}`} value={p.id}>{p.name}</option>) }
            </select>
            <p id="error-publisher" className="text-red-700 italic text-base"></p>
          </div>

          <div className="mb-3">
            <label className="block font-bold italic text-xl">Bộ sách:</label>
            {
              seriesList.map(s =>
                <div key={`series-${s.id}`}>
                  <input type="checkbox" className="accent-pink-700" id={`series-${s.id}`} checked={bSeries[`${s.id}`]} onChange={() => { handleBSeries(s.id); clearSeriesValidation(); }} />
                  &nbsp;<label htmlFor={`series-${s.id}`}>{s.name}</label>
                </div>
              )
            }
            <p id="error-series" className="text-red-700 italic text-base"></p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="price" className="block font-bold italic text-xl">Giá: </label>
            <input type="number" id="price" value={bPrice} step={1000} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150"
              onChange={e => setBPrice(e.target.value)} onInput={() => clearPriceValidation()} />
            <p id="error-price" className="text-red-700 italic text-base"></p>
          </div>
          
          <div>
            <label htmlFor="file-upload" className="block font-bold italic">Ảnh bìa:</label>
            <img id="thumbnail-preview" src={bImage} alt="thumbnail" className="aspect-7/10" onClick={() => document.getElementById("file-upload").click()} />
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
                            className="bg-green-600 text-white flex gap-x-1 px-3 py-1 rounded-[7px] hover:bg-green-600/80 duration-150 cursor-pointer"
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

    axios.get(searchRef.current === "" ? '/api/book/get-all' : `/api/book/get?name=${searchRef.current}`).then(response => {
      totalRef.current = Math.ceil(response.data.length / numPerPage);
      setBookList(response.data.slice((pageRef.current - 1) * numPerPage, pageRef.current * numPerPage));
    });
  }

  function search(attr, prop) {
    pageRef.current = 1;
    searchRef.current = prop;
    if (prop === "") axios.get("/api/book/get-all").then(response => {
      totalRef.current = Math.ceil(response.data.length / numPerPage);
      setBookList(response.data.slice((pageRef.current - 1) * numPerPage, pageRef.current * numPerPage));
    });
    else axios.get(`/api/book/get?${attr}=${prop}`).then(response => {
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
    try {
      setBImage(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = e => document.getElementById('thumbnail-preview').src = e.target.result;
      reader.readAsDataURL(e.target.files[0]);
    }
    catch {
      setBImage(defaultThumbnail);
    }
    finally {
      clearImageValidation();
    }
  }

  function clearNameValidation() {
    document.getElementById("error-name").innerHTML = "";
    document.getElementById("name").classList.remove("focus-error");
  }

  function clearGradeValidation() {
    document.getElementById("error-grade").innerHTML = "";
    document.getElementById("grade").classList.remove("focus-error");
  }

  function clearSubjectValidation() {
    document.getElementById("error-subject").innerHTML = "";
    document.getElementById("subject").classList.remove("focus-error");
  }

  function clearPublisherValidation() {
    document.getElementById("error-publisher").innerHTML = "";
    document.getElementById("publisher").classList.remove("focus-error");
  }

  function clearSeriesValidation() {
    document.getElementById("error-series").innerHTML = "";
  }

  function clearPriceValidation() {
    document.getElementById("error-price").innerHTML = "";
    document.getElementById("price").classList.remove("focus-error");
  }

  function clearImageValidation() {
    document.getElementById("error-image").innerHTML = "";
  }

  function save(e) {
    e.preventDefault();
    clearNameValidation();
    clearGradeValidation();
    clearSubjectValidation();
    clearPublisherValidation();
    clearSeriesValidation();
    clearPriceValidation();
    clearImageValidation();
    let errorFlag = false;

    if (bName === "") {
      document.getElementById("error-name").innerHTML = "Vui lòng nhập tên sách.";
      document.getElementById("name").classList.add("focus-error");
      document.getElementById("name").focus();
      errorFlag = true;
    }

    if (bGrade == -1) {
      document.getElementById("error-grade").innerHTML = "Vui lòng chọn khối.";
      document.getElementById("grade").classList.add("focus-error");
      errorFlag = true;
    }

    if (bSubject == -1) {
      document.getElementById("error-subject").innerHTML = "Vui lòng chọn môn học.";
      document.getElementById("subject").classList.add("focus-error");
      errorFlag = true;
    }

    if (bPublisher == -1) {
      document.getElementById("error-publisher").innerHTML = "Vui lòng chọn NXB.";
      document.getElementById("publisher").classList.add("focus-error");
      errorFlag = true;
    }

    let errorSeries = true;
    for (const [key, value] of Object.entries(bSeries))
      if (value) { errorSeries = false; break; }

    if (errorSeries) {
      document.getElementById("error-series").innerHTML = "Vui lòng chọn bộ sách.";
      errorFlag = true;
    }

    if (bPrice === "" || bPrice === 0) {
      document.getElementById("error-price").innerHTML = "Vui lòng nhập giá sản phẩm.";
      document.getElementById("price").classList.add("focus-error");
      errorFlag = true;
    }
    else if (bPrice % 1000 !== 0) {
      document.getElementById("error-price").innerHTML = "Giá phải chia được cho 1000.";
      document.getElementById("price").classList.add("focus-error");
      errorFlag = true;
    }

    if (document.getElementById("file-upload").value === "") {
      document.getElementById("error-image").innerHTML = "Vui lòng tải hình minh họa.";
      errorFlag = true;
    }

    if (!errorFlag) (bId === "") ? insert() : update();
  }

  function cancel(e) {
    e.preventDefault()
    setBID("");
    setBName("");
    setBGrade(-1);
    setBSubject(-1);
    setBPublisher(-1);
    setBPrice(0);
    setBImage(defaultThumbnail);

    clearNameValidation();
    clearGradeValidation();
    clearSubjectValidation();
    clearPublisherValidation();
    clearSeriesValidation();
    clearPriceValidation();
    clearImageValidation();

    document.getElementById("file-upload").value = "";

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
      axios.post("/api/book/insert", formData, headers).then(() => {
        alert("Thêm sách giáo khoa thành công!");
        location.reload();
      }).catch(response => {
        if (response.status === 403) alert("Bạn không có quyền. Vui lòng liên hệ lại với quản trị viên.");
        else {
          alert("Đã có lỗi xảy ra, thêm thất bại!");
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
      formData.append("price", bPrice);

      for (const [key, value] of Object.entries(bSeries))
        if (value) formData.append("series[]", key);

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

      axios.post("/api/book/update", formData, headers).then(() => {
        alert("Cập nhật thông tin thành công!");
        location.reload();
      }).catch(response => {
        if (response.status === 403) alert("Bạn không có quyền. Vui lòng liên hệ lại với quản trị viên.");
        else {
          alert("Đã có lỗi xảy ra, cập nhật thất bại!");
          console.error(response);
        }
      });
    };
  }

  function status(id, status) {
    if (confirm(`Bạn có muốn ${status === 1 ? "" : "mở "}khóa sách giáo khoa này?`)) {
      axios.delete(`/api/book/update/status?id=${id}`).then(() => {
        alert(`${status == 1 ? "Khóa" : "Mở khóa"} sách giáo khoa thành công!`);
        location.reload();
      }).catch(response => {
        if (response.status === 403) alert("Bạn không có quyền. Vui lòng liên hệ lại với quản trị viên.");
        else {
          alert(`Đã có lỗi xảy ra, ${status === 1 ? "" : "mở "}khóa thất bại!`);
          console.error(response)
        }
      });
    }    
  }
}

export default ABook;