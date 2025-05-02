import { React, useState, useEffect } from "react";
import axios from "axios";
import { displayPrice } from "/script";

const OrderPlacement = () => {
  const [receiver, setReceiver] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [total, setTotal] = useState(0);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const cartStr = atob(atob(atob(document.cookie.substring(5)))).split("_");
    const cart = [];
    cartStr.forEach(c => cart.push(Number(c)));
    document.title = "Đặt hàng - Nhà sách MiniTextbook";

    axios.post(`/order/get-item`, cart, {headers: {"Content-Type": "application/json"}}).then(response => {
      console.log(response);
      setOrderList(response.data);
      let tempTotal = 0;
      response.data.forEach(order => tempTotal = tempTotal + order.price * order.quantity);
      setTotal(tempTotal);
    });
  }, []);
  
  return (
    <main>
      <h1 className="text-center text-pink-900 font-bold text-4xl">THANH TOÁN</h1>
      
      <section className="mx-15 mt-4 grid grid-cols-[500px_1fr] gap-x-4 text-pink-900">
        {/* Điền thông tin */}
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="block font-bold italic">Họ tên người nhận: </label>
            <input type="text" id="name" value={receiver} required className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150"
              onChange={e => setReceiver(e.target.value)} /> {/* onInvalid={e => e.target.setCustomValidity('Vui lòng nhập họ tên người nhận')} />*/ }
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="block font-bold italic">Địa chỉ: </label>
            <input type="text" id="address" required className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150"
              onChange={e => setAddress(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="block font-bold italic">Số điện thoại: </label>
            <input type="text" id="phone" required className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150"
              onChange={e => setPhone(e.target.value)} />
          </div>

          <div className="flex gap-x-4 pt-3 justify-center">
            <button className="bg-green-900 text-white flex gap-x-1 px-3 py-1 rounded-full cursor-pointer hover:bg-green-600 duration-150" onClick={e => addOrder(e)}>
              Đặt hàng
            </button>

            <button className="bg-sky-900 text-white flex gap-x-1 px-3 py-1 rounded-full cursor-pointer hover:bg-sky-700 duration-150" onClick={e => addOrder(e)}>
              Thanh toán bằng VNPay
            </button>

            <a href="/san-pham" className="bg-yellow-400 text-black flex gap-x-1 px-3 py-1 rounded-full cursor-pointer hover:bg-yellow-400/70 duration-150">
              Lướt tiếp
            </a>
          </div>          
        </form>

        <div className="overflow-y-auto" style={{height: "calc(100dvh - 466px)"}}>
          <table className="text-center w-full">
            <thead>
              <tr className="bg-linear-to-r from-pink-700 to-pink-900">
                <th className="w-[12%] text-pink-50 py-1">Hình ảnh</th>
                <th className="w-[48%] text-pink-50 py-1">Tên sách</th>
                <th className="w-[10%] text-pink-50 py-1">Số lượng</th>
                <th className="w-[10%] text-pink-50 py-1">Giá</th>
                <th className="w-[20%] text-pink-50 py-1">Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {
                orderList.map((order, id) => 
                  <tr key={id} className="even:bg-pink-50">
                    <td className="flex justify-center">
                      <img src={order.image} alt={order.name} className="aspect-7/10" />
                    </td>
                    <td>{order.name}</td>
                    <td>{order.quantity}</td>
                    <td>{displayPrice(order.price)}</td>
                    <td>{displayPrice(order.price * order.quantity)}</td>
                  </tr>
                )
              }
            </tbody>
            <tfoot>
              <tr className="bg-linear-to-r from-pink-700 to-pink-900 text-pink-50 text-xl font-bold ">
                <td colSpan={4} className="text-right py-1">TỔNG:</td>
                <td>{displayPrice(total)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </main>
  );

  function addOrder(e) {
    e.preventDefault();
    const order = { receiver, address, phone, total, carts: orderList }
    const header = { headers: {"Content-Type": "application/json"} };

    axios.post("/order/insert", order, header).then(response => {
      if (response.status === 200) {
        alert("Đặt hàng thành công");
        location.href = "/nguoi-dung/thanh-toan/ket-qua";
      }
      else {
        alert("Đặt hàng thất bại, đã có lỗi xảy ra.")
        console.error(response);
      }
    })
  }
}

export default OrderPlacement;