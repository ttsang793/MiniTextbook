import { React, useEffect } from "react";

const OrderResult = () => {
  useEffect(() => {
    document.title = "Kết quả đặt hàng - Nhà sách MiniTextbook"
  }, []);

  return (
    <main className="text-center">
      <h1 className="text-center text-pink-900 font-bold text-5xl">CẢM ƠN BẠN ĐÃ ĐẶT HÀNG</h1>
      
      <div className="mx-[12.5%] mt-4 text-lg text-pink-900">
        Đơn hàng của bạn đã được đưa lên hệ thống. Bạn hãy thường xuyên cập nhật trạng thái đơn hàng của bạn. Bây giờ, bạn có thể tiếp tục xem tiếp các sản phẩm, và nhớ quay lại ủng hộ chúng mình nhé!
      </div>

      <div className="flex justify-center">
        <img src="/success.png" alt="success" className="h-70" /> 
      </div>           

      <div className="flex justify-center gap-x-4 text-xl">
        <a href="/nguoi-dung/don-hang" className="bg-sky-900 text-white flex gap-x-1 px-4 py-1 rounded-full cursor-pointer hover:bg-sky-700 duration-150">
          Xem lịch sử đơn hàng
        </a>

        <a href="/san-pham" className="bg-yellow-400 text-black flex gap-x-1 px-4 py-1 rounded-full cursor-pointer hover:bg-yellow-400/70 duration-150">
          Tiếp tục mua sắm
        </a>
      </div>

    </main>
  )
}

export default OrderResult;