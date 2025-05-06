import { React, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ProductCell from '/src/components/Product/ProductCell';
import Pagination from '/src/components/Pagination';

const Favorite = ({fullname}) => {
  let [favoriteList, setFavoriteList] = useState([]);
  const numPerPage = 9;
  const pageRef = useRef(1);
  const totalRef = useRef(0);
  const loadingRef = useRef(true);

  useEffect(() => {
    document.title = "Sản phẩm yêu thích - Nhà sách MiniTextbook";
    if (loadingRef.current) {
      axios.get(`/favorite/get`).then(response => {
        totalRef.current = Math.ceil(response.data.length / numPerPage);
        setFavoriteList(response.data.slice((pageRef.current - 1) * numPerPage, pageRef.current * numPerPage));
      });
      loadingRef.current = false;
    }
  }, []);

  return loadingRef.current ? <h1>Loading...</h1> : (
    <main className="py-8">
      <h1 className="text-center text-pink-900 font-bold text-4xl">SẢN PHẨM YÊU THÍCH</h1>
      
      <section className="mx-15 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 content-start justify-around">
          {
            favoriteList.map(fb => <ProductCell key={fb.id} product={fb} fullname={fullname} />)
          }
        </div>

        <Pagination page={pageRef.current} total={totalRef.current} />
      </section>
    </main>
  );
};

export default Favorite;