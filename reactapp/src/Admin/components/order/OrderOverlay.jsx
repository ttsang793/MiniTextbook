import { displayPrice, displayDate } from "/script";
import { X } from "@phosphor-icons/react";

const OrderOverlay = ({order, onClose}) => {
  return (
    <div className="bg-black/50 hidden fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-100" id="blur-background">
      <div className="bg-white rounded-xl w-[75dvw] h-[75dvh] p-6 pt-3 relative overflow-y-auto">
        <button className="absolute top-3 right-3 cursor-pointer rounded-full bg-transparent hover:bg-zinc-300 duration-300 p-0 hover:p-1 hover:top-2 hover:right-2" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="text-2xl font-bold mb-2 text-pink-800">Đơn hàng #{order.id}</div>
        <hr className="my-2 text-zinc-300" />

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <ul>
            <li className="mb-1">Người nhận: <span className="font-medium italic">{order.receiver}</span></li>
            <li className="mb-1">Địa chỉ: <span className="font-medium italic">{order.address}</span></li>
            <li className="mb-1">Số điện thoại: <span className="font-medium italic">{order.phone}</span></li>
            {
              order.status === -1 ? "" :
              <>
                <li className="mb-1">Đã thanh toán: <span className="font-medium italic">{order.isPaid ? "Đã hoàn thành" : "Chưa thanh toán"}</span></li>
                <li className="mb-1">Hình thức thanh toán: <span className="font-medium italic">{order.paidMethod}</span></li>
              </>
            }
          </ul>

          <ul>
            <li className="mb-1">Trạng thái đơn hàng: <span className="font-medium italic">{order.status}</span></li>
            <li className="mb-1">Nhân viên xác nhận: <span className="font-medium italic">{order.vertifyAdmin || "Đơn chưa được xác nhận"}</span></li>
            <li className="mb-1">Ngày đặt hàng: <span className="font-medium italic">{displayDate(order.datePurchased)}</span></li>
            <li className="mb-1">Ngày xác nhận: <span className="font-medium italic">{displayDate(order.dateVertified) || "Chưa xác nhận"}</span></li>
            {
              order.status === -1 ?
                <li className="mb-1">Ngày hủy hàng: <span className="font-medium italic">{displayDate(order.dateCanceled)}</span></li> :
                <li className="mb-1">Ngày giao hàng: <span className="font-medium italic">{displayDate(order.dateReceived) || "Đơn chưa được giao"}</span></li>
            }
          </ul>
        </div>
        <hr className="my-2 text-zinc-300" />
        
        <h2 className="text-xl font-bold text-pink-800 mb-2">Danh sách sản phẩm:</h2>
        <table className="text-center w-full">
          <thead>
            <tr className="bg-linear-to-r from-pink-700 to-pink-900 text-lg">
              <th className="w-[5%] text-pink-50 py-1">STT</th>
              <th className="w-[50%] text-pink-50 py-1">Tên sách</th>
              <th className="w-[10%] text-pink-50 py-1">Số lượng</th>
              <th className="w-[15%] text-pink-50 py-1">Giá</th>
              <th className="w-[20%] text-pink-50 py-1">Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {
              (order.orderDetails !== undefined) && order.orderDetails.map((o, i) => 
                <tr class="even:bg-pink-50 text-pink-900" key={"od-" + i}>
                  <td class="py-1">{i + 1}</td>
                  <td class="text-start ps-2">{o.bookNavigation.name}</td>
                  <td>{o.quantity}</td>
                  <td>{displayPrice(o.price)}</td>
                  <td>{displayPrice(o.price * o.quantity)}</td>
                </tr>
              )
            }
          </tbody>
          <tfoot>
            <tr className="bg-pink-200 text-pink-900 text-xl font-bold">
              <td colSpan={4} className="text-right py-1">TỔNG:</td>
              <td>{displayPrice(order.total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default OrderOverlay;