import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCell from '/src/components/Product/ProductCell';
import axios from 'axios';

const Product = () => {
  const { tieuChi } = useParams("tieuChi");
  const [book, setBook] = useState([]);

  useEffect(() => {
    switch (tieuChi) {
      case "lop-10": document.title = "Sách lớp 10 - Nhà sách MiniTextbook"; break;
      case "lop-11": document.title = "Sách lớp 11 - Nhà sách MiniTextbook"; break;
      case "lop-12": document.title = "Sách lớp 12 - Nhà sách MiniTextbook"; break;
      case undefined: document.title = "Sản phẩm - Nhà sách MiniTextbook"; break;
      default: location.href = "/404";
    }

    axios.get('/book/get-all').then(response => setBook(response.data));
  }, []);

  return (
    <main>
      <h1 className="text-center text-pink-900 font-bold text-4xl">SẢN PHẨM</h1>

      <div className="mt-4 grid grid-cols-[200px_1fr] gap-x-10 mx-15">
        <section className="bg-pink-100 px-4 py-2">
          <h2 className="text-pink-900 font-bold text-3xl pb-2">BỘ LỌC</h2>
          <div className="mb-4">
            <h3 className="text-pink-900 pb-2 font-bold text-2xl">Khối</h3>
            <div className="text-pink-900 pb-2"><input type="checkbox" /> Lớp 10</div>
            <div className="text-pink-900 pb-2"><input type="checkbox" /> Lớp 11</div>
            <div className="text-pink-900 pb-2"><input type="checkbox" /> Lớp 12</div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-pink-900 pb-2 font-bold text-2xl">Bộ môn</h3>
            <div className="text-pink-900 pb-2"><input type="checkbox" /> Ngữ văn</div>
            <div className="text-pink-900 pb-2"><input type="checkbox" /> Toán</div>
            <div className="text-pink-900 pb-2"><input type="checkbox" /> Tin học</div>
            <div className="text-pink-900 pb-2"><input type="checkbox" /> Lịch sử</div>
          </div>
          
          <div>
            <h3 className="text-pink-900 pb-2 font-bold text-2xl">Bộ sách</h3>
            <div className="text-pink-900 pb-2"><input type="checkbox" /> Chân trời sáng tạo</div>
            <div className="text-pink-900 pb-2"><input type="checkbox" /> Cánh diều</div>
            <div className="text-pink-900 pb-2"><input type="checkbox" /> Kết nối tri thức</div>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-8 content-start justify-around">
          {
            book.map(b => <ProductCell product={b} key={b.id} />)
          }
        </section>
      </div>
    </main>
  )
}

export default Product;