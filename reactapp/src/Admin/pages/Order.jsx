import { React, useState, useEffect, useRef } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import axios from "axios";
import { displayPrice, displayDate, displayDateJS, dateParse } from "/script";
import OrderOverlay from "/src/Admin/components/order/OrderOverlay";
import Loading from "/src/components/Loading";

const AOrder = () => {
  let [order, setOrder] = useState({});
  const ORDER_STATUS = ["Đã hủy", "Chưa xác nhận", "Đã xác nhận", "Đang giao hàng", "Đã giao hàng", "Đã nhận hàng"];
  const loadingRef = useRef(true);

  const searchParams = new URLSearchParams();
  const [orderList, setOrderList] = useState([]);
  const [sUserList, setSUsernameList] = useState([]);
  const [sReceiverList, setSReceiverList] = useState([]);
  const [sAddressList, setSAddressList] = useState([]);
  const [sProductList, setSProductList] = useState([]);
  const sGradeList = [10, 11, 12];
  const [sSeriesList, setSSeriesList] = useState([]);

  const [sID, setSID] = useState("");
  const [sUser, setSUsername] = useState("");
  const [sReceiver, setSReceiver] = useState("");
  const [sAddress, setSAddress] = useState("");
  const [sProduct, setSProduct] = useState("");
  const [sGrade, setSGrade] = useState("");
  const [sSeries, setSSeries] = useState("");
  const [sStatus, setSStatus] = useState("");
  const [sDate, setSDate] = useState("");

  const [advanced, setAdvanced] = useState(false);

  useEffect(() => {
    if (loadingRef.current) {
      document.title = "Quản lý đơn hàng";
      setSUsername(searchParams.get("userid") || "");
      setSReceiver(searchParams.get("receiver") || "");
      setSAddress(searchParams.get("address") || "");
      setSProduct(searchParams.get("product") || "");
      setSGrade(searchParams.get("grade") || "");
      setSSeries(searchParams.get("series") || "");
      setSStatus(searchParams.get("status") || "");

      if (location.search.includes("?id")) {
        axios.get(`/api/order/search${location.search}`).then(response => setOrderList(response.data));
        return
      }

      axios.get(`/api/order/get${location.search}`).then(response => setOrderList(response.data));
      axios.get("/api/order/get/user").then(response => {
        const temp = [];
        response.data.forEach(user => temp.push({id: user.id, username: user.username}));
        setSUsernameList(temp);
      })
      axios.get("/api/order/get/receiver").then(response => {
        const temp = [];
        response.data.forEach(receiver => temp.push(receiver));
        setSReceiverList(temp);
      })
      axios.get("/api/order/get/address").then(response => {
        const temp = [];
        response.data.forEach(address => temp.push(address));
        setSAddressList(temp);
      })
      axios.get("/api/book/get-all").then(response => {
        const temp = [];
        response.data.forEach(product => temp.push({id: product.id, name: product.name}));
        setSProductList(temp);
      })
      axios.get("/api/series/get-all").then(response => {
        const temp = [];
        response.data.forEach(series => temp.push({id: series.id, name: series.name}));
        setSSeriesList(temp);
      })

      loadingRef.current = false;
    }
  }, [])

  return loadingRef.current ? <Loading /> : (
    <main className="mx-20">
      <OrderOverlay order={order} ORDER_STATUS={ORDER_STATUS} onClose={closeOrderRender} />      
      <h1 className="text-center text-pink-900 font-bold text-4xl mt-4 mb-3">QUẢN LÝ ĐƠN HÀNG</h1>
      <hr className="mb-3 border-pink-900" />

      <div className="relative mb-3">
        <div className="absolute top-0 left-0">
          <input type="checkbox" id="advance-search" checked={advanced} onChange={e => setAdvanced(e.target.checked)} />&nbsp;Tìm kiếm nâng cao
        </div>

        <div className={`${advanced ? "hidden" : "flex"} w-1/4 ml-auto justify-end items-center`}>
          <p className="me-2">Mã đơn:</p>
          <input
            type="search" id="search-input" className="bg-gray-300/70 text-gray-900 flex-1 rounded-s-full py-2 px-5 placeholder:italic"
            placeholder="Tìm kiếm..." spellCheck="false" value={sID} onChange={e => setSID(e.target.value)}
            onKeyDown={e => {if (e.nativeEvent.key === "Enter") document.getElementById("search-btn").click()}}
          />
          <button id="search-btn" className="p-2 rounded-e-full bg-gray-300/70 text-gray-900 cursor-pointer hover:bg-pink-900 hover:text-pink-300 duration-200" onClick={Search}>
            <MagnifyingGlass size={24} className="cursor-pointer" />
          </button>
        </div>        

        <div className={`${advanced ? "grid" : "hidden"} grid-cols-1 lg:grid-cols-2 gap-x-4 pt-8`}>
          <section>
            <div className="mb-3">
              <label htmlFor="username" className="block font-bold italic">Username:</label>
              <input list="usernames" id="username" className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" value={sUser} onChange={e => setSUsername(e.target.value)} />
              <datalist id="usernames">
              {
                sUserList.map(user => <option>{user.id} - {user.username}</option>)
              }
              </datalist>
            </div>

            <div className="mb-3">
              <label htmlFor="receiver" className="block font-bold italic">Tên người nhận:</label>
              <input list="receivers" id="receiver" className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" value={sReceiver} onChange={e => setSReceiver(e.target.value)} />
              <datalist id="receivers">
              {
                sReceiverList.map(receiver => <option>{receiver}</option>)
              }
              </datalist>
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="block font-bold italic">Địa chỉ:</label>
              <input list="addresses" id="address" className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" value={sAddress} onChange={e => setSAddress(e.target.value)} />
              <datalist id="addresses">
              {
                sAddressList.map(address => <option>{address}</option>)
              }
              </datalist>
            </div>
          </section>

          <section>
            <div className="mb-3">
              <label htmlFor="product" className="block font-bold italic">Tên sách:</label>
              <input list="products" id="product" className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" value={sProduct} onChange={e => setSProduct(e.target.value)} />
              <datalist id="products">
              {
                sProductList.map(product => <option>{product.id} - {product.name}</option>)
              }
              </datalist>
            </div>

            <div className="mb-3">
              <label htmlFor="grade" className="block font-bold italic">Khối:</label>
              <input list="grades" id="grade" className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" value={sGrade} onChange={e => setSGrade(e.target.value)} />
              <datalist id="grades">
              {
                sGradeList.map(grade => <option>{grade}</option>)
              }
              </datalist>
            </div>

            <div className="mb-3">
              <label htmlFor="series" className="block font-bold italic">Bộ sách:</label>
              <input list="serieses" id="series" className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" value={sSeries} onChange={e => setSSeries(e.target.value)} />
              <datalist id="serieses">
              {
                sSeriesList.map(series => <option>{series.id} - {series.name}</option>)
              }
              </datalist>
            </div>

          </section>
          
          <div className="mb-5">
            <label htmlFor="status" className="block font-bold italic">Ngày đặt hàng:</label>
            <input type="date" id="date" max={displayDateJS(new Date())} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" value={sDate} onChange={e => setSDate(e.target.value)} />
          </div>

          <div className="mb-5">
            <label htmlFor="status" className="block font-bold italic">Tình trạng:</label>
            <input list="statuses" id="status" className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" value={sStatus} onChange={e => setSStatus(e.target.value)} />
            <datalist id="statuses">
              <option>0 - Chưa xác nhận</option>
              <option>1 - Đã xác nhận</option>
              <option>2 - Đang giao hàng</option>
              <option>3 - Đã giao hàng</option>
              <option>4 - Đã nhận hàng</option>
              <option>-1 - Đã hủy</option>
            </datalist>
          </div>

          <div className="text-center col-span-2">
            <button className="bg-radial px-4 py-1 cursor-pointer from-pink-700 to-pink-900 hover:from-pink-600 hover:to-pink-800 text-pink-50 text-xl" onClick={Filter}>
              Lọc
            </button>
          </div>
        </div>
      </div>

      <hr className="mb-3 border-pink-900" />

      <table className="text-center w-full text-pink-900">
        <thead>
          <tr className="bg-linear-to-r from-pink-700 to-pink-900 text-lg">
            <th className="text-pink-50 py-1 w-[5%]">ID</th>
            <th className="text-pink-50 py-1 w-[15%]">Người nhận hàng</th>
            <th className="text-pink-50 py-1 w-[25%]">Địa chỉ</th>
            <th className="text-pink-50 py-1 w-[10%]">Số điện thoại</th>
            <th className="text-pink-50 py-1 w-[10%]">Trạng thái</th>
            <th className="text-pink-50 py-1 w-[10%]">Cập nhật</th>
            <th className="text-pink-50 py-1 w-[10%]">Tổng</th>
            <th className="text-pink-50 py-1 w-[15%]"></th>
          </tr>
        </thead>
        <tbody>
          {
            (orderList.length === 0) ? (<tr><td colSpan={8}>Không tồn tại dữ liệu</td></tr>) :
            orderList.map(order => 
              <tr key={order.id} className="even:bg-pink-50">
                <td className="py-1">{order.id}</td>
                <td className="py-1">{order.receiver}</td>
                <td className="py-1">{order.address}</td>
                <td className="py-1">{order.phone}</td>
                <td>{order.status}</td>
                <td>{getLatestDay(order)}</td>
                <td>{displayPrice(order.total)}</td>
                <td className="py-1">
                  {
                    order.status !== ORDER_STATUS[0] && order.status !== ORDER_STATUS[4] && order.status !== ORDER_STATUS[5] &&
                    <button
                      className="bg-yellow-400 text-black flex gap-x-1 mb-1 px-3 py-1 rounded-[7px] hover:bg-yellow-400/50 duration-150 cursor-pointer"
                      onClick={() => updateStatus(order.id, ORDER_STATUS[ORDER_STATUS.indexOf(order.status) + 1])}
                    >
                      {order.status === ORDER_STATUS[1] ? "Xác nhận đơn hàng" : (order.status === ORDER_STATUS[2] ? "Bắt đầu giao hàng" : "Hoàn tất giao hàng")}
                    </button>
                  }
                  <button
                    className="bg-green-600 text-white flex gap-x-1 px-3 py-1 rounded-[7px] hover:bg-green-600/80 duration-150 cursor-pointer"
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

  function getLatestDay(order) {
    let latest = order.datePurchased;

    if (dateParse(order.dateVertified) > dateParse(order.datePurchased)) latest = order.dateVertified;
    if (dateParse(order.dateCanceled) > dateParse(latest)) latest = order.dateCanceled;
    if (dateParse(order.dateReceived) > dateParse(latest)) latest = order.dateReceived;

    return displayDate(latest);
  }

  function updateStatus(id, status) {
    if (confirm("Bạn có muốn cập nhật trạng thái cho đơn hàng này?")) {
      axios.put(`/api/order/update/status?id=${id}&status=${status}`).then(() => {
        alert("Cập nhật trạng thái đơn hàng thành công!");
        location.reload();
      }).catch(response => {
        if (response.status === 403) alert("Bạn không có quyền. Vui lòng liên hệ lại với quản trị viên.");
        else {
          alert("Đã có lỗi xảy ra, vui lòng thử lại.")
          console.error(response);
        }
      })
    }
  }

  function orderRender(displayOrder) {
    document.getElementById("blur-background").classList.remove("hidden");
    setOrder(order = displayOrder);
    document.body.style.overflow = "hidden";
  }

  function closeOrderRender() {
    document.getElementById("blur-background").classList.add("hidden");
    document.body.style.overflow = "";
  }

  function Filter() {
    if (sUser !== "") searchParams.set("userid", sUser.substring(0, sUser.indexOf("-") - 1));
    if (sReceiver !== "") searchParams.set("receiver", sReceiver);
    if (sAddress !== "") searchParams.set("address", sAddress);
    if (sProduct !== "") searchParams.set("product", sProduct.substring(0, sProduct.indexOf("-") - 1));
    if (sGrade !== "") searchParams.set("grade", sGrade);
    if (sSeries !== "") searchParams.set("series", sSeries.substring(0, sSeries.indexOf("-") - 1));
    if (sStatus !== "") searchParams.set("status", sStatus.substring(0, sStatus.indexOf("-") - 1));
    if (sDate !== "") searchParams.set("date", sDate);

    location.href = location.origin + location.pathname + "?" + searchParams.toString();
  }

  function Search() {
    location.href = `/quan-tri/don-hang${sID !== "" ? `?id=${sID}` : ""}`;
  }
}

export default AOrder;