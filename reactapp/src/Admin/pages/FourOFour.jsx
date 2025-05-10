import { React, useEffect } from 'react';

const AFourOFour = () => {
  useEffect(() => {
    document.title = "Trang không tìm thấy"
  }, []);

  return (
    <main className="text-center flex justify-center items-center" style={ { "min-height": "calc(100dvh - 60px)" } }>
      <div>
        <img src="/sad-book.png" alt="404" className="h-70 mx-auto" />

        <h1 className="font-bold text-7xl text-pink-900 mb-4">LỖI 404</h1>

        <p className="text-pink-900 text-lg mb-4 italic">
          Trang bạn đang truy cập hiện đang không tồn tại. Hãy kiểm tra liên kết của bạn, và đảm bảo bạn nhập vào đúng liên kết nhé!
        </p>
      </div>
    </main>
  )
}

export default AFourOFour;