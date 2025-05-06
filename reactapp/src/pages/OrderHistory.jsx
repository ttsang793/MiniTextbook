import { React, useState, useEffect, Fragment } from "react";
import axios from "axios";
import { displayPrice, displayDate } from "/script";
import { Trash, Check } from "@phosphor-icons/react";

const OrderHistory = () => {
  const [orderList, setOrderList] = useState([]);
  const [deliverList, setDeliverList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  useEffect(() => {
    document.title = "Lịch sử đơn hàng - Nhà sách MiniTextbook";

    axios.get(`/order/get-history`).then(response => {
      setOrderList(response.data.filter(s => s.status === 0 || s.status === 1));
      setDeliverList(response.data.filter(s => s.status === 2 || s.status === 3));
      setDoneList(response.data.filter(s => s.status === -1 || s.status === 4));
    })
  }, []);
  
  return (
    <main className="py-8">
      <h1 className="text-center text-pink-900 font-bold text-4xl">LỊCH SỬ ĐƠN HÀNG</h1>
      
      <section className="mx-15 mt-4 grid grid-cols-[1fr_1fr] gap-4 text-pink-900">
        {/* Đơn chưa giao hàng */}
        <div>
          <h2 className="border-b-1 border-b-pink-900 text-2xl italic font-bold mb-3">CHỜ GIAO HÀNG</h2>
          {
            orderList.length === 0 ? <p className="text-xl">Không tồn tại đơn hàng chờ giao</p> : 
            <table className="text-center w-full">
              <tbody>
                {
                  orderList.map((order, id) =>
                    <Fragment key={id}>
                      <tr className="bg-linear-to-r from-pink-700 to-pink-900 font-medium text-white text-lg">
                        <td colSpan={3}>
                          ĐƠN HÀNG {order.id}: {displayDate(order.datePurchased)} (Trạng thái: {order.status === 0 ? "Chưa xác thực" : "Đã xác thực"})
                        </td>
                        <td className="py-1">{displayPrice(order.total)}</td>
                        <td className="py-1">
                          <button
                            className="bg-red-600 text-white flex gap-x-1 px-2 py-1 rounded-[7px] hover:bg-red-600/70 duration-150 cursor-pointer"
                            onClick={() => cancelDelivery(order.id)}
                          >
                            <Trash size={28} /> Hủy đơn
                          </button>
                        </td>
                      </tr>
                      {
                        order.orderDetails.map((od, id) => 
                          <tr key={id} className="even:bg-pink-50 odd:bg-pink-100">
                            <td className="flex justify-center">
                              <img src={od.bookNavigation.image} alt={od.bookNavigation.name} className="aspect-7/10 h-30" />
                            </td>
                            <td className="w-[43%]">{od.bookNavigation.name}</td>
                            <td className="w-[10%]">{od.quantity}</td>
                            <td className="w-[15%]">{displayPrice(od.price)}</td>
                            <td className="w-[17%]"></td>
                          </tr>
                        )
                      }
                    </Fragment>
                  )
                }
              </tbody>
            </table>
          }
        </div>

        {/* Đơn đang giao hàng */}
        <div>
          <h2 className="border-b-1 border-b-pink-900 text-2xl italic font-bold mb-3">CHỜ NHẬN HÀNG</h2>
          {
            deliverList.length === 0 ? <p className="text-xl">Không tồn tại đơn hàng chờ nhận</p> : 
            <table className="text-center w-full">
              <tbody>
                {
                  deliverList.map((order, id) =>
                    <Fragment key={id}>
                      <tr className="bg-linear-to-r from-pink-700 to-pink-900 font-medium text-white text-lg">
                        <td colSpan={3}>
                          ĐƠN HÀNG {order.id}: {displayDate(order.datePurchased)}
                        </td>
                        <td className="py-1">{displayPrice(order.total)}</td>
                        <td className="py-1">
                          {
                            (order.status === 3) &&
                            <button
                              className="bg-green-600 text-white flex gap-x-1 px-2 py-1 rounded-[7px] hover:bg-green-600/70 duration-150 cursor-pointer"
                              onClick={() => receiveDelivery(order.id)}
                            >
                              <Check size={28} /> Nhận hàng
                            </button>
                          }
                        </td>
                      </tr>
                      {
                        order.orderDetails.map((od, id) => 
                          <tr key={id} className="even:bg-pink-50 odd:bg-pink-100">
                            <td className="flex justify-center">
                              <img src={od.bookNavigation.image} alt={od.bookNavigation.name} className="aspect-7/10 h-30" />
                            </td>
                            <td className="w-[40%]">{od.bookNavigation.name}</td>
                            <td className="w-[10%]">{od.quantity}</td>
                            <td className="w-[15%]">{displayPrice(od.price)}</td>
                            <td className="w-[20%]"></td>
                          </tr>
                        )
                      }
                    </Fragment>
                  )
                }
              </tbody>
            </table>
          }
        </div>

        {/* Đơn đã giao hoặc hủy */}
        <div className="col-span-2">
          <h2 className="border-b-1 border-b-pink-900 text-2xl italic font-bold mb-3">ĐÃ GIAO & ĐÃ HỦY</h2>
          {
            doneList.length === 0 ? <p className="text-xl">Bạn chưa nhận hoặc hủy đơn hàng nào</p> : 
            <table className="text-center w-full">
              <tbody>
                {
                  doneList.map((order, id) =>
                    <Fragment key={id}>
                      <tr className="bg-linear-to-r from-pink-700 to-pink-900 font-medium text-white text-lg">
                        <td colSpan={3}>
                          ĐƠN HÀNG {order.id}: {displayDate(order.datePurchased)} (Trạng thái: {order.status === 4 ? "Đã nhận hàng" : "Đã hủy"})
                        </td>
                        <td className="py-1">{displayPrice(order.total)}</td>
                      </tr>
                      {
                        order.orderDetails.map((od, id) => 
                          <tr key={id} className="even:bg-pink-50 odd:bg-pink-100">
                            <td className="flex justify-center">
                              <img src={od.bookNavigation.image} alt={od.bookNavigation.name} className="aspect-7/10 h-40" />
                            </td>
                            <td className="w-[60%]">{od.bookNavigation.name}</td>
                            <td className="w-[10%]">{od.quantity}</td>
                            <td className="w-[15%]">{displayPrice(od.price)}</td>
                          </tr>
                        )
                      }
                    </Fragment>
                  )
                }
              </tbody>
            </table>
          }
        </div>
      </section>
    </main>
  );

  function cancelDelivery(id) {
    if (confirm("Bạn có muốn hủy đơn hàng này?")) {
      axios.put(`/order/cancel?id=${id}`).then(response => {
        if (response.status === 200) {
          alert("Hủy đơn hàng thành công");
          location.reload();
        }
        else {
          alert("Đã có lỗi xảy ra, vui lòng thử lại.")
          console.error(response);
        }
      })
    }
  }

  function receiveDelivery(id) {
    if (confirm("Bạn có chắc chắn là mình đã nhận đơn hàng này?")) {
      axios.put(`/order/receive?id=${id}`).then(response => {
        if (response.status === 200) {
          alert("Xác nhận nhận hàng thành công");
          location.reload();
        }
        else {
          alert("Đã có lỗi xảy ra, vui lòng thử lại.")
          console.error(response);
        }
      })
    }
  }
}

export default OrderHistory;