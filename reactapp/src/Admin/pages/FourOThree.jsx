import { React, useEffect } from 'react';

const AFourOThree = () => {
  useEffect(() => {
    document.title = "Không có quyền truy cập"
  }, []);

  return (
    <main className="text-center flex justify-center items-center" style={ { "min-height": "calc(100dvh - 60px)" } }>
      <div>
        <img src="/sad-book.png" alt="404" className="h-70 mx-auto" />

        <h1 className="font-bold text-7xl text-pink-900 mb-4">LỖI 403</h1>

        <p className="text-pink-900 text-lg mb-4 italic">
          Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ với quản trị viên.
        </p>
      </div>
    </main>
  )
}

export default AFourOThree;