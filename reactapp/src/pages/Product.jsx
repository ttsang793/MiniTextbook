import { React, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import ProductCell from '/src/components/Product/ProductCell';
import axios from 'axios';
import Pagination from '/src/components/Pagination';

const Product = () => {
  // Hằng số mặc định
  const { tieuChi } = useParams("tieuChi");
  const searchParams = new URLSearchParams(location.search);
  const numPerPage = 9;
  const page = useRef(0);
  const total = useRef(0);
  const loading = useRef(true);

  // Các danh sách
  const [book, setBook] = useState([]);
  const [publisherList, setPublisherList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  let [grade, setGrade] = useState([]);
  let [publisher, setPublisher] = useState([]);
  let [subject, setSubject] = useState([]);

  // Hàm xử lý khi thêm
  const handleGrade = (newGrade, add) => {
    if (add) setGrade([...grade, newGrade]);
    else {
      grade.splice(grade.indexOf(newGrade), 1);
      setGrade([...grade]);
    }
  }  
  const handlePublisher = (newPublisher, add) => {
    if (add) setPublisher([...publisher, newPublisher]);
    else {
      publisher.splice(publisher.indexOf(newPublisher), 1);
      setPublisher([...publisher]);
    }
  }
  const handleSubject = (newSubject, add) => {
    if (add) setSubject([...subject, newSubject]);
    else {
      subject.splice(subject.indexOf(newSubject), 1);
      setSubject([...subject]);
    }
  }

  useEffect(() => {
    axios.get("/product/get-publisher").then(response => setPublisherList(response.data));
    axios.get("/product/get-subject").then(response => setSubjectList(response.data));
    
    switch (tieuChi) {
      case "lop-10": {
        document.title = "Sách lớp 10 - Nhà sách MiniTextbook";
        axios.get('/product/search?grade=10').then(response => setBook(response.data));
        break;
      }
      case "lop-11": {
        document.title = "Sách lớp 11 - Nhà sách MiniTextbook";
        axios.get('/product/search?grade=11').then(response => setBook(response.data));
        break;
      }
      case "lop-12": {
        document.title = "Sách lớp 12 - Nhà sách MiniTextbook";
        axios.get('/product/search?grade=12').then(response => setBook(response.data));
        break;
      }
      case undefined: {
        const name = searchParams.get('search');
        page.current = Number(searchParams.get('page')) || 1;

        const gradeParam = searchParams.get('grade');
        setGrade(grade = gradeParam === null ? [] : convertToNumber(gradeParam.split("_")));

        const publisherParam = searchParams.get('publisher');
        setPublisher(publisher = publisherParam === null ? [] : convertToNumber(publisherParam.split("_")));

        const subjectParam = searchParams.get('subject');
        setSubject(subject = subjectParam === null ? [] : convertToNumber(subjectParam.split("_")));

        if (name !== null && name !== "") {
          document.title = `Tìm sách ${name} - Nhà sách MiniTextbook`;
          loadData(name);
        }
        else {
          document.title = "Sản phẩm - Nhà sách MiniTextbook";
          loadData();
        }

        break;
      }
      default: location.href = "/404";
    }
    loading.current = false
  }, []);

  return loading.current ? <>Hello World</> : (
    <main>
      <h1 className="text-center text-pink-900 font-bold text-4xl">SẢN PHẨM</h1>

      <div className="mt-4 grid grid-cols-[200px_1fr] gap-x-10 mx-15">
        <section className="bg-pink-100 px-4 py-2">
          <h2 className="text-pink-900 font-bold text-3xl pb-2">BỘ LỌC</h2>
          <div className="mb-4">
            <h3 className="text-pink-900 pb-2 font-bold text-2xl">Khối</h3>
            <div className="text-pink-900 pb-2"><input type="checkbox" onChange={e => handleGrade(10, e.target.checked)} /> Lớp 10</div>
            <div className="text-pink-900 pb-2"><input type="checkbox" onChange={e => handleGrade(11, e.target.checked)} /> Lớp 11</div>
            <div className="text-pink-900 pb-2"><input type="checkbox" onChange={e => handleGrade(12, e.target.checked)} /> Lớp 12</div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-pink-900 pb-2 font-bold text-2xl">Bộ môn</h3>
            {
              subjectList.map(s =>
                <div className="text-pink-900 pb-2" key={s.name}><input type="checkbox" onChange={e => handleSubject(s.id, e.target.checked)} /> {s.name}</div>
              )
            }
          </div>
          
          <div>
            <h3 className="text-pink-900 pb-2 font-bold text-2xl">Nhà xuất bản</h3>
            {
              publisherList.map(p =>
                <div className="text-pink-900 pb-2" key={p.name}><input type="checkbox" onChange={e => handlePublisher(p.id, e.target.checked)} /> {p.name}</div>
              )
            }
          </div>

          <button className="cursor-pointer h-[32px] text-white bg-linear-to-br from-pink-700 to-pink-900 px-5 flex justify-self-center items-center" onClick={() => filter()}>
            Lọc
          </button>
        </section>

        <section>
          <div className="grid grid-cols-3 gap-8 content-start justify-around">
          {
            book.map(b => <ProductCell product={b} key={b.id} />)
          }
          </div>

          <Pagination page={page.current} total={total.current} />
        </section>
      </div>
    </main>
  )

  async function loadData(name = "") {
    const productFilter = {
      grades: grade.length > 0 ? grade : null,
      publishers: publisher.length > 0 ? publisher : null,
      subjects: subject.length > 0 ? subject : null
    };
    const headers = { headers: { 'Content-Type': 'application/json' }};

    if (name === "" && productFilter.grades === null && productFilter.publishers === null && productFilter.subjects === null) {
      axios.get('/product/get-all').then(response => {        
        total.current = Math.ceil(response.data.length / numPerPage);
        setBook(response.data.slice((page.current - 1) * numPerPage, page.current * numPerPage));
      });
    }
    else {
      axios.post(`/product/search${name !== "" ? `?name=${name}` : ""}`, productFilter, headers).then(response => {
        total.current = Math.ceil(response.data.length / numPerPage);
        setBook(response.data.slice((page.current - 1) * numPerPage, page.current * numPerPage));
      });
    }
  }

  function filter() {
    searchParams.delete("page");
    if (grade.length > 0) searchParams.set("grade", grade.join("_"));
    if (publisher.length > 0) searchParams.set("publisher", publisher.join("_"));
    if (subject.length > 0) searchParams.set("subject", subject.join("_"));

    location.href = location.origin + location.pathname + "?" + searchParams.toString();
  }

  function convertToNumber(arr) {
    for (let i=0; i<arr.length; i++) arr[i] = Number(arr[i]);
    return arr;
  }
}

export default Product;