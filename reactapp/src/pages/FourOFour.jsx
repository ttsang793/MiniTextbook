import { React, useState, useEffect } from 'react';

const FourOFour = () => {
  useEffect(() => {
    document.title = "Trang không tìm thấy - Hệ thống MiniTextbook"
  }, []);

  return (
    <main className="h-[56.25dvh] text-center">
      <h1 className="font-bold text-5xl">LỖI 404</h1>
    </main>
  )
}

export default FourOFour;