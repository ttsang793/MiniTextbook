import { React, useState, useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.title = "Trang chủ - Nhà sách MiniTextbook"
  }, []);

  return <h1 className="text-9xl text-center text-red-500">HOME</h1>
}

export default Home;