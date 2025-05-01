import { React, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ProductCell from '/src/components/Product/ProductCell';
import Pagination from '/src/components/Pagination';
import { arrayNumber } from "/script";

const Product = () => {
  // Hằng số mặc định
  const searchParams = new URLSearchParams(location.search);
  const numPerPage = 9;
  const page = useRef(1);
  const total = useRef(0);
  const [loadingRef, setLoadingRef] = useState(true);

  // Các danh sách
  const [book, setBook] = useState([]);
  const [publisherList, setPublisherList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  let [grade, setGrade] = useState({"10": false, "11": false, "12": false});
  let [publisher, setPublisher] = useState({});
  let [subject, setSubject] = useState({});
  let [series, setSeries] = useState({});

  // Hàm xử lý khi thêm
  const handleGrade = (id) => {
    const updatedGrade = { ...grade }
    updatedGrade[`${id}`] = !updatedGrade[`${id}`];
    setGrade(updatedGrade);
  }

  const handlePublisher = (id) => {
    const updatedPublisher = { ...publisher };
    updatedPublisher[`${id}`] = !updatedPublisher[`${id}`];
    setPublisher(updatedPublisher);
  };

  const handleSubject = (id) => {
    const updatedSubject = { ...subject };
    updatedSubject[`${id}`] = !updatedSubject[`${id}`];
    setSubject(updatedSubject);
  };

  const handleSeries = (id) => {
    const updatedSeries = { ...series };
    updatedSeries[`${id}`] = !updatedSeries[`${id}`];
    setSeries(updatedSeries);
  };

  useEffect(() => {
    if (loadingRef) {
      try {
        const name = searchParams.get('search');
        page.current = Number(searchParams.get('page')) || 1;

        if (name !== null && name !== "") {
          document.title = `Tìm sách ${name} - Nhà sách MiniTextbook`;
          loadData(page, name);
        }
        else {
          document.title = "Sản phẩm - Nhà sách MiniTextbook";
          loadData(page);
        }
      }
      catch (error) { console.error(error) }
      finally { setLoadingRef(false); }
    }
  }, []);

  return loadingRef ? <>Hello World</> : (
    <main>
      <h1 className="text-center text-pink-900 font-bold text-4xl">SẢN PHẨM</h1>

      <div className="mt-4 grid grid-cols-[200px_1fr] gap-x-10 mx-15">
        <section className="bg-pink-100 px-4 py-2">
          <h2 className="text-pink-900 font-bold text-3xl pb-2">BỘ LỌC</h2>
          <div className="mb-4">
            <h3 className="text-pink-900 pb-2 font-bold text-2xl">Khối</h3>
            <div className="text-pink-900 pb-2"><input type="checkbox" checked={grade["10"]} onChange={() => handleGrade("10")} /> Lớp 10</div>
            <div className="text-pink-900 pb-2"><input type="checkbox" checked={grade["11"]} onChange={() => handleGrade("11")} /> Lớp 11</div>
            <div className="text-pink-900 pb-2"><input type="checkbox" checked={grade["12"]} onChange={() => handleGrade("12")} /> Lớp 12</div>
          </div>
          
          <div className="mb-4">
            {
              (subjectList.length === 0) ? "" : (
                <>
                <h3 className="text-pink-900 pb-2 font-bold text-2xl">Bộ môn</h3>
                {
                  subjectList.map(s =>
                    <div className="text-pink-900 pb-2" key={s.name}><input type="checkbox" checked={subject[`${s.id}`]} onChange={() => handleSubject(s.id)} /> {s.name}</div>
                  )
                }
                </>
              )
            }
          </div>
          
          <div>
            {
              (publisherList.length === 0) ? "" : (
                <>
                <h3 className="text-pink-900 pb-2 font-bold text-2xl">Nhà xuất bản</h3>
                {
                  publisherList.map(p =>
                    <div className="text-pink-900 pb-2" key={p.name}><input type="checkbox" checked={publisher[`${p.id}`]} onChange={() => handlePublisher(p.id)} /> {p.name}</div>
                  )
                }
                </>
              )
            }
          </div>
          
          <div>
            {
              (seriesList.length == 0) ? "" : (
                <>
                <h3 className="text-pink-900 pb-2 font-bold text-2xl">Bộ sách</h3>
                {
                  seriesList.map(s =>
                    <div className="text-pink-900 pb-2" key={s.name}><input type="checkbox" checked={series[`${s.id}`]} onChange={() => handleSeries(s.id)} /> {s.name}</div>
                  )
                }
                </>
              )
            }
          </div>

          <button className="cursor-pointer h-[32px] text-white bg-linear-to-br from-pink-700 to-pink-900 px-5 flex justify-self-center items-center" onClick={() => filter()}>
            Lọc
          </button>
        </section>

        <section>
          {
            (book.length === 0) ? (
              <div className="text-center text-xl italic mb-10">
                <img src="sad-book.png" alt="Không có sách" className="h-50 mx-auto" />
                <p>{location.search === "" ? "Hiện tại đang chưa có sản phẩm. Vui lòng thử lại sau!" : "Không tồn tại sản phẩm cần tìm!"}</p>
              </div>
            ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 content-start justify-around">
            {
              book.map(b => <ProductCell product={b} key={b.id} favorite={false} />)
            }
            </div>
            )
          }

          <Pagination page={page.current} total={total.current} />
        </section>
      </div>
    </main>
  )

  async function loadData(page, name = "") {
    if (loadingRef) {
      let temp = {};

      const publisherResponse = await axios.get("/product/get-publisher");
      setPublisherList(publisherResponse.data);
      publisherResponse.data.forEach(r => temp[`${r.id}`] = false);
      setPublisher(publisher = temp);

      temp = {};
      const seriesResponse = await axios.get("/product/get-series");
      setSeriesList(seriesResponse.data);
      seriesResponse.data.forEach(r => temp[`${r.id}`] = false);
      setSeries(series = temp);

      temp = {};
      const subjectResponse = await axios.get("/product/get-subject");
      setSubjectList(subjectResponse.data);
      subjectResponse.data.forEach(r => temp[`${r.id}`] = false);
      setSubject(subject = temp);

      let gradeParam = searchParams.get('lop');
      gradeParam = gradeParam ? arrayNumber(gradeParam.split("_")) : null;
      if (gradeParam) {
        gradeParam.forEach(g => grade[g] = true);
        setGrade(grade);
      }

      let publisherParam = searchParams.get('nxb');
      publisherParam = publisherParam ? arrayNumber(publisherParam.split("_")) : null;
      if (publisherParam) {
        publisherParam.forEach(p => publisher[p] = true);
        setPublisher(publisher);
      }

      let seriesParam = searchParams.get('bo');
      seriesParam = seriesParam ? arrayNumber(seriesParam.split("_")) : null;
      if (seriesParam) {
        seriesParam.forEach(s => series[s] = true);
        console.log(series);
        setSeries(series);
      }

      let subjectParam = searchParams.get('mon');
      subjectParam = subjectParam ? arrayNumber(subjectParam.split("_")) : null;
      if (subjectParam) {
        subjectParam.forEach(s => subject[s] = true);
        console.log(subject);
        setSubject(subject);
      }
      
      const productFilter = { grades: gradeParam, publishers: publisherParam, subjects: subjectParam, series: seriesParam };
      const headers = { headers: { 'Content-Type': 'application/json' }};

      axios.post(`/product/get-all${name !== "" ? `?name=${name}` : ""}`, productFilter, headers).then(response => {
        total.current = Math.ceil(response.data.length / numPerPage);
        setBook(response.data.slice((page.current - 1) * numPerPage, page.current * numPerPage));
      });
    }
  }

  function filter() {
    searchParams.delete("page");
    searchParams.delete("lop");
    searchParams.delete("nxb");
    searchParams.delete("bo");
    searchParams.delete("mon");
    const gradeParam = [];
    const publisherParam = [];
    const seriesParam = [];
    const subjectParam = [];

    for (const [key, value] of Object.entries(grade))
      if (value) gradeParam.push(Number(key));

    for (const [key, value] of Object.entries(publisher))
      if (value) publisherParam.push(Number(key));

    for (const [key, value] of Object.entries(series))
      if (value) seriesParam.push(Number(key));

    for (const [key, value] of Object.entries(subject))
      if (value) subjectParam.push(Number(key));

    if (gradeParam.length > 0) searchParams.set("lop", gradeParam.join("_"));
    if (publisherParam.length > 0) searchParams.set("nxb", publisherParam.join("_"));
    if (seriesParam.length > 0) searchParams.set("bo", seriesParam.join("_"));
    if (subjectParam.length > 0) searchParams.set("mon", subjectParam.join("_"));

    location.href = location.origin + location.pathname + ((searchParams.toString() !== "") ? '?' + searchParams.toString() : "");
  }
}

export default Product;