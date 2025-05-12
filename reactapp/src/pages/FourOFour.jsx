import { React, useEffect } from 'react';

const FourOFour = () => {
  useEffect(() => {
    document.title = "Trang không tìm thấy - Hệ thống MiniTextbook"
  }, []);

  return (
    <main className="text-center mb-10 py-8">
      <img src="/sad-book.png" alt="404" className="h-70 mx-auto" />
      <h1 className="font-bold text-7xl text-pink-900 mb-4">LỖI 404</h1>

      <p className="text-pink-900 text-lg mb-4 italic">
        Trang bạn đang truy cập hiện đang không tồn tại. Hãy kiểm tra liên kết của bạn, và đảm bảo bạn nhập vào đúng liên kết nhé!
      </p>
      
      <div className="flex justify-center gap-x-4">
        <button onClick={() => location.href = "/"} className="bg-radial px-4 py-1 cursor-pointer from-pink-700 to-pink-900 hover:from-pink-600 hover:to-pink-800 text-pink-50 text-xl">
          Trang chủ
        </button>

        <button onClick={() => history.back()} className="bg-radial px-4 py-1 cursor-pointer from-pink-700 to-pink-900 hover:from-pink-600 hover:to-pink-800 text-pink-50 text-xl">
          Quay lại trang trước
        </button>
      </div>
    </main>
  )
}

export default FourOFour;