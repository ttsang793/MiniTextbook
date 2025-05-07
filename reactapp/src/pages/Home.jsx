import { React, useState, useEffect } from 'react';
import axios from 'axios';
import ProductCell from '/src/components/Product/ProductCell';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const Home = ({fullname}) => {
  const [series, setSeries] = useState([]);
  const [newestBook, setNewestBook] = useState([]);

  useEffect(() => {
    document.title = "Trang chủ - Nhà sách MiniTextbook";
    axios.get("/series/get").then(response => setSeries(response.data)).catch();
    axios.get("/product/get-newest").then(response => setNewestBook(response.data)).catch();
  }, []);

  return (
    <main className="py-8">
      {/* Banner quang cao */}
      <section className="-mt-8 mb-8">
        <Splide
          options={{
            type: "loop",
            speed: 1000,
            autoplay: true,
            interval: 3000,
            pauseOnHover: false,
            pauseOnFocus: false,
          }}
        >
          <SplideSlide>
            <img src="/src/images/banner/banner1.png" />
          </SplideSlide>
          <SplideSlide>
            <img src="/src/images/banner/banner2.png" />
          </SplideSlide>
          <SplideSlide>
            <img src="/src/images/banner/banner3.jpg" />
          </SplideSlide>
        </Splide>
      </section>

      {/* Bo sach */ }
      <h2 className="font-bold text-4xl mb-2 text-pink-900 text-center">CÁC BỘ SÁCH GIÁO KHOA</h2>
      <hr className="border-2 border-pink-900 mx-[35%] mb-6" />
      {
        (series.length === 0) ? (
          <div className="text-center text-xl italic mb-10">
            <img src="sad-book.png" alt="Không có bộ sách" className="h-30 mx-auto" />
            <p>Hiện tại chưa có bộ sách nào!</p>
          </div>
          ) : (
            <section className="mx-15 flex justify-center gap-x-10">
              {
                series.map(s => 
                  <a href={`/san-pham?bo=${s.id}`} key={s.id} className="size-50 bg-white flex justify-center items-center mb-4 rounded-xl hover:scale-[1.2] duration-300">
                      <img src={s.image} alt={s.name} className="h-8/10" />
                  </a>
                )
              }
            </section>
          )
      }

      {/* Sach moi nhat */ }
      <h2 className="font-bold text-4xl my-2 text-pink-900 text-center">SÁCH MỚI NHẤT</h2>
      <hr className="border-2 border-pink-900 mx-[35%] mb-6" />
      {
        (newestBook.length === 0) ? (
          <div className="text-center text-xl italic mb-10">
            <img src="sad-book.png" alt="Không có sách" className="h-30 mx-auto" />
            <p>Hiện tại chưa có sách giáo khoa nào!</p>
          </div>
          ) : (
          <section className="mx-15 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-center gap-x-10">
            {
              newestBook.map(b => <ProductCell product={b} key={b.id} fullname={fullname} />)
            }
          </section>
        )
      }


    </main>
  )
}

export default Home;