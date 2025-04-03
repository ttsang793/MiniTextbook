import { React, useState, useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.title = "Trang chủ - Nhà sách MiniTextbook"
  }, []);

  return <h1 className="text-9xl text-center text-red-500" style={{height: "calc(100dvh - 404px)"}}>HOME</h1>
}

export default Home;