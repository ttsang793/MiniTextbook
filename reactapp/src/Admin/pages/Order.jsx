import { React, useState, useEffect, Fragment } from "react";
import axios from "axios";
import { displayPrice, displayDate } from "/script";

const AOrder = () => {
  let [order, setOrder] = useState({});
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    document.title = "Quản lý đơn hàng";
    axios.get("/admin/order/get").then(response => setOrderList(response.data));
  }, [])

  const displayStatus = status => {
    switch (status) {
      case -1: return "Đã hủy";
      case 0: return "Chưa xác nhận";
      case 1: return "Đã xác nhận";
      case 2: return "Đang giao hàng";
      case 3: return "Đã giao hàng";
      case 4: return "Đã nhận hàng";
      default: return "";
    }
  }

  return (
    <main className="mx-20">
      <div className="bg-black/50 hidden fixed top-0 left-0 right-0 bottom-0" id="blur-background" onClick={() => closeOrderRender()}>
        <div className="bg-white rounded-xl m-[12.5%]">
          <div className="bg-linear-to-br from-pink-100 to-pink-300 rounded-t-xl text-xl font-bold text-pink-700 ps-4 py-2">Đơn hàng {order.id} ({displayDate(order.datePurchased)})</div>

          <table className="text-center w-full text-lg">
            <thead>
              <tr className="bg-linear-to-r from-pink-700 to-pink-900">
                <th className="w-[5%] text-pink-50 py-1">STT</th>
                <th className="w-[45%] text-pink-50 py-1">Tên sách</th>
                <th className="w-[10%] text-pink-50 py-1">Số lượng</th>
                <th className="w-[15%] text-pink-50 py-1">Giá</th>
                <th className="w-[25%] text-pink-50 py-1">Tổng tiền</th>
              </tr>
            </thead>
            <tbody id="blur-body"></tbody>
            <tfoot>
              <tr className="bg-linear-to-bl from-pink-100 to-pink-300 text-pink-700 text-xl font-bold ">
                <td colSpan={4} className="text-right py-1">TỔNG:</td>
                <td>{displayPrice(order.total)}</td>
              </tr>
            </tfoot>
          </table>

          <div className="flex justify-end pe-14 py-2">
            <button className="border-1 border-pink-700 text-pink-700 px-2 py-1 text-lg hover:bg-pink-700 hover:text-pink-50 duration-150 cursor-pointer" onClick={() => closeOrderRender()}>
              Đóng
            </button>
          </div>
        </div>
      </div>
      <h1 className="text-center text-pink-900 font-bold text-4xl mt-4 mb-3">QUẢN LÝ ĐƠN HÀNG</h1>
      <hr className="mb-3 border-pink-900" />

      <table className="text-center w-full text-pink-900 text-lg">
        <thead>
          <tr className="bg-linear-to-r from-pink-700 to-pink-900">
            <th className="text-pink-50 py-1 w-[5%]">ID</th>
            <th className="text-pink-50 py-1 w-[15%]">Ngày đặt hàng</th>
            <th className="text-pink-50 py-1 w-[15%]">Ngày xác nhận</th>
            <th className="text-pink-50 py-1 w-[15%]">Ngày nhận hàng</th>
            <th className="text-pink-50 py-1 w-[15%]">Ngày hủy hàng</th>
            <th className="text-pink-50 py-1 w-[10%]">Trạng thái</th>
            <th className="text-pink-50 py-1 w-[10%]">Tổng</th>
            <th className="text-pink-50 py-1 w-[15%]"></th>
          </tr>
        </thead>
        <tbody>
          {
            orderList.map(order => 
              <tr key={order.id} className="even:bg-pink-50">
                <td className="py-1">{order.id}</td>
                <td>{displayDate(order.datePurchased)}</td>
                <td>
                  {order.dateVertified === null ? "" : displayDate(order.dateVertified)} <br />
                  {order.dateVertified === null ? "" : `(${order.vertifyAdmin})`}
                </td>
                <td>{order.dateReceived === null ? "" : displayDate(order.dateReceived)}</td>
                <td>{order.dateCanceled === null ? "" : displayDate(order.dateCanceled)}</td>
                <td>{displayStatus(order.status)}</td>
                <td>{displayPrice(order.total)}</td>
                <td className="py-1">
                  {
                    order.status > -1 && order.status < 3 &&
                    <button
                      className="bg-yellow-400 text-black flex gap-x-1 mb-1 px-3 py-1 rounded-[7px] hover:bg-yellow-400/50 duration-150 cursor-pointer"
                      onClick={() => updateStatus(order.id, order.status + 1)}
                    >
                      {order.status === 0 ? "Xác nhận đơn hàng" : (order.status === 1 ? "Bắt đầu giao hàng" : "Hoàn tất giao hàng")}
                    </button>
                  }
                  <button
                    className="bg-green-600 text-white flex gap-x-1 px-3 py-1 rounded-[7px] hover:bg-green-600/50 duration-150 cursor-pointer"
                    onClick={() => orderRender(order)}
                  >
                    Xem đơn hàng
                  </button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </main>
  )

  function updateStatus(id, status) {
    if (confirm("Bạn có muốn cập nhật trạng thái cho đơn hàng này?")) {
      axios.put(`/admin/order/update-status?id=${id}&status=${status}${status === 1 ? `&vertify=250101` : ""}`).then(response => {
        if (response.status === 200) {
          alert("Cập nhật trạng thái đơn hàng thành công!");
          location.reload();
        }
        else {
          alert("Đã có lỗi xảy ra, vui lòng thử lại.")
          console.error(response);
        }
      })
    }
  }

  function orderRender(displayOrder) {
    console.log(orderList);
    document.getElementById("blur-background").classList.remove("hidden");
    setOrder(order = displayOrder);
    document.body.style.overflow = "hidden";

    let blurBody = "";
    displayOrder.orderDetails.forEach((o, i) => 
      blurBody += `
        <tr class="even:bg-pink-50 text-pink-900">
          <td class="py-1">${i + 1}</td>
          <td>${o.bookNavigation.name}</td>
          <td>${o.quantity}</td>
          <td>${displayPrice(o.price)}</td>
          <td>${displayPrice(o.price * o.quantity)}</td>
        </tr>
      `
    )

    document.getElementById("blur-body").innerHTML = blurBody;
  }

  function closeOrderRender() {
    document.getElementById("blur-background").classList.add("hidden");
    document.body.style.overflow = "initial";
  }
}

export default AOrder;