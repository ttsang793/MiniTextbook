import { React, useEffect } from 'react';

const FourOOne = () => {
  useEffect(() => {
    document.title = "Vui lòng đăng nhập - Hệ thống MiniTextbook"
  }, []);

  return (
    <main className="text-center mb-10 py-8">
      <div className="flex justify-center">
        <img src="/sad-book.png" alt="404" className="h-70" />
      </div>

      <h1 className="font-bold text-7xl text-pink-900 mb-4">LỖI 401</h1>

      <div className="text-pink-900 text-lg mb-4 italic">
        Vui lòng đăng nhập để tiếp tục sử dụng chức năng này
      </div>
      
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

export default FourOOne;