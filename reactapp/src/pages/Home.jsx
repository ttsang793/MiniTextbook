import { React, useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    document.title = "Trang chủ - Nhà sách MiniTextbook";
    axios.get("/series/get").then(response => setSeries(response.data));
  }, []);

  return (
    <main>
      {/* Banner quang cao */}
      <section className="-mt-8 mb-8">
        <img src="/src/images/banners/banner1.png" alt="banner1" />
      </section>

      {/* Bo sach */ }
      <h2 className="font-bold text-4xl mb-2 text-pink-900 text-center">CÁC BỘ SÁCH GIÁO KHOA</h2>
      <hr className="border-2 border-pink-900 mx-[35%] mb-6" />
      <section className="mx-15 flex justify-center gap-x-10">
        {
          series.map(s => 
            <a href={`/san-pham?bo=${s.id}`} key={s.id} className="flex flex-col items-center text-center bg-radial from-pink-100 to-pink-300/90 text-pink-900 w-[25%] px-10 py-4 hover:from-pink-500 hover:to-pink-700 hover:text-pink-50 duration-300">
              <div className="size-50 bg-white flex justify-center items-center mb-4 rounded-xl">
                <img src={s.image} alt={s.name} className="h-8/10" />
              </div>
    
              <div className="italic text-center">{s.description}</div>
            </a>
          )
        }
      </section>

    </main>
  )
}

export default Home;