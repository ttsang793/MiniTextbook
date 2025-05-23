import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { displayPrice } from "/script";
import Loading from "/src/components/Loading";

const OrderPlacement = () => {
  const [receiver, setReceiver] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [total, setTotal] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(false);
  const locationParam = new URLSearchParams(location.search).get("location");
  const loadingRef = useRef(false);
  const isEmpty = useRef(false);

  useEffect(() => {
    document.title = "Đặt hàng - Nhà sách MiniTextbook";

    if (!loadingRef.current) {
      axios.get("/user/get").then(response => {
        const user = response.data;
        setReceiver(user.fullname);
        setAddress(user.address);
        setPhone(user.phone);
      })
      
      if (locationParam == "cart") {
        const cartStr = atob(atob(atob(document.cookie.substring(5)))).split("_");
        if (cartStr.length === 0) isEmpty.current = true;
        else {
          const cart = [];
          cartStr.forEach(c => cart.push(Number(c)));

          axios.post(`/order/get-item`, cart, {headers: {"Content-Type": "application/json"}}).then(response => {
            setOrderList(response.data);
            let tempTotal = 0;
            response.data.forEach(order => tempTotal = tempTotal + order.price * order.quantity);
            setTotal(tempTotal);
          });
        }
      }
      else {
        const productStr = atob(atob(atob(document.cookie.substring(5)))).split("_");
        if (productStr[0] === "") isEmpty.current = true;
        else {
          axios.get(`/product/get?id=${Number(productStr[0])}`).then(response => {
            const product = response.data;
            product.bookId = Number(productStr[0]);
            product.quantity = Number(productStr[1]);

            setOrderList([product]);
            setTotal(product.price * product.quantity);
          })
        }
      }
      loadingRef.current = true;
    }    
  }, []);
  
  return (!loadingRef.current) ? <Loading /> : (
    (isEmpty).current ? (
      <main className="text-center mb-10 py-8">
        <img src="/sad-book.png" alt="404" className="h-70 mx-auto" />

        <h1 className="font-bold text-7xl text-pink-900 mb-4">LỖI THANH TOÁN</h1>

        <div className="text-pink-900 text-lg mb-4 italic">
          Lỗi xảy ra khi bạn tải lại trang. Vui lòng quay về giỏ hàng để thanh toán sản phẩm, hoặc ấn nút thanh toán từ trang sản phẩm để tiến hành thanh toán!
        </div>
        
        <div className="flex justify-center gap-x-4">
          <button onClick={() => history.back()} className="bg-radial px-4 py-1 cursor-pointer from-pink-700 to-pink-900 hover:from-pink-600 hover:to-pink-800 text-pink-50 text-xl">
            Quay lại trang trước
          </button>
        </div>
      </main>
    ) : (
      <main className="py-8">
        <h1 className="text-center text-pink-900 font-bold text-4xl">THANH TOÁN</h1>
        
        <section className="mx-15 mt-4 grid grid-cols-[500px_1fr] gap-x-4 text-pink-900">
          {/* Điền thông tin */}
          <form>
            <div className="mb-3">
              <label htmlFor="receiver" className="block font-bold italic">Họ tên người nhận: </label>
              <input type="text" id="receiver" value={receiver} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150"
                onChange={e => setReceiver(e.target.value)} onInput={() => clearReceiverValidation()} />
              <p id="error-receiver" className="text-red-700 italic"></p>
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="block font-bold italic">Địa chỉ: </label>
              <input type="text" id="address" value={address} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150"
                onChange={e => setAddress(e.target.value)} onInput={() => clearAddressValidation()} />
              <p id="error-address" className="text-red-700 italic"></p>
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="block font-bold italic">Số điện thoại: </label>
              <input type="tel" id="phone" value={phone} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150"
                onChange={e => setPhone(e.target.value)} onInput={() => clearPhoneValidation()} />
              <p id="error-phone" className="text-red-700 italic"></p>
            </div>

            <div className="mb-3">
              <input type="checkbox" className="accent-pink-700" checked={defaultAddress} onChange={e => setDefaultAddress(e.target.checked)} /> Đặt làm địa chỉ mặc định.
            </div>

            <div className="flex gap-x-4 pt-3 justify-center">
              <button className="bg-green-900 text-white flex gap-x-1 px-3 py-1 rounded-full cursor-pointer hover:bg-green-600 duration-150" onClick={e => addOrder(e)}>
                Đặt hàng
              </button>

              <button className="bg-sky-900 text-white flex gap-x-1 px-3 py-1 rounded-full cursor-pointer hover:bg-sky-700 duration-150" onClick={e => addOrderVnPay(e)}>
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
  ));

  function updateDefaultAddress() {
    const user = { address, phone }
    const header = { headers: {"Content-Type": "application/json"} };

    axios.put("/user/update/address", user, header)
    .catch(response => {
      alert("Đã có lỗi xảy ra, vui lòng thử lại!");
      console.error(response);
    })
  }

  function clearReceiverValidation() {
    document.getElementById("error-receiver").innerHTML = "";
    document.getElementById("receiver").classList.remove("focus-error");
  }

  function clearAddressValidation() {
    document.getElementById("error-address").innerHTML = "";
    document.getElementById("address").classList.remove("focus-error");
  }

  function clearPhoneValidation() {
    document.getElementById("error-phone").innerHTML = "";
    document.getElementById("phone").classList.remove("focus-error");
  }

  function checkError() {
    clearReceiverValidation();
    clearAddressValidation();
    clearPhoneValidation();
    let errorFlag = false;

    if (receiver === "") {
      document.getElementById("error-receiver").innerHTML = "Vui lòng nhập họ tên người nhận.";
      document.getElementById("receiver").classList.add("focus-error");
      if (!errorFlag) document.getElementById("receiver").focus();
      errorFlag = true;
    }

    if (address === "") {
      document.getElementById("error-address").innerHTML = "Vui lòng nhập địa chỉ.";
      document.getElementById("address").classList.add("focus-error");
      if (!errorFlag) document.getElementById("address").focus();
      errorFlag = true;
    }

    if (phone === "") {
      document.getElementById("error-phone").innerHTML = "Vui lòng nhập số điện thoại.";
      document.getElementById("phone").classList.add("focus-error");
      if (!errorFlag) document.getElementById("phone").focus();
      errorFlag = true;
    }
    else if (/^0(([1,3-5,7-9]\d{8})|(2\d{9}))$/.test(phone) == false) {
      document.getElementById("error-phone").innerHTML = "Số điện thoại phải bắt đầu bằng số 0, và có 10 hoặc 11 số.";
      document.getElementById("phone").classList.add("focus-error");
      if (!errorFlag) document.getElementById("phone").focus();
      errorFlag = true;
    }

    return errorFlag;
  }

  function addOrder(e) {
    e.preventDefault();

    if (!checkError()) {
      if (defaultAddress) updateDefaultAddress();

      const order = { receiver, address, phone, total, carts: orderList, instant: locationParam == "instant" };
      const header = { headers: {"Content-Type": "application/json"} };

      axios.post(`/order/insert`, order, header).then(response => {
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

  function addOrderVnPay(e) {
    e.preventDefault();

    if (!checkError()) {
      if (defaultAddress) updateDefaultAddress();

      const order = { receiver, address, phone, total, carts: orderList, instant: locationParam == "instant" };
      const header = { headers: {"Content-Type": "application/json"} };

      axios.post("/order/vnpay/payment", order, header).then(response => {
        location.href = response.data;
      })
    }
  }
}

export default OrderPlacement;