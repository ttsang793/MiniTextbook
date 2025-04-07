import { React, useState, useEffect, useRef } from "react";
import { Trash } from "@phosphor-icons/react";
import axios from "axios";
import { displayPrice } from "/script";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const [cartList, setCartList] = useState([]);
  const loadingRef = useRef(true);

  useEffect(() => {
    document.title = "Giỏ hàng - Nhà sách MiniTextbook";

    if (loadingRef.current) {

      axios.get("/cart/get?userID=1").then(response => {
        setCartList(response.data);
        calcTotal(response.data);
      });
      loadingRef.current = false;
    }
  })

  return loadingRef.current ? <>Hello World</> : (
    <main>
      <h1 className="text-center text-pink-900 font-bold text-4xl">GIỎ HÀNG</h1>
      
      <section className="mx-15 my-4 text-lg">
        <table className="text-center w-full">
          <thead>
            <tr className="bg-linear-to-r from-pink-700 to-pink-900">
              <th className="w-[5%] text-pink-50 py-1">
                <input type="checkbox" id="all" />
              </th>
              <th className="w-[10%] text-pink-50 py-1">Hình ảnh</th>
              <th className="w-[35%] text-pink-50 py-1">Tên sách</th>
              <th className="w-[15%] text-pink-50 py-1">Số lượng</th>
              <th className="w-[10%] text-pink-50 py-1">Giá</th>
              <th className="w-[5%] text-pink-50 py-1"></th>
            </tr>
          </thead>
          <tbody>
            {
              cartList.map((cart, id) => 
                <tr key={id} className="even:bg-pink-50">
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td className="flex justify-center">
                    <img src={cart.image} alt={cart.name} className="h-50 aspect-7/10" />
                  </td>
                  <td className="py-3 text-left">{cart.name}</td>
                  <td>                    
                    <button className="bg-pink-100 border-1 border-pink-900 text-pink-900 px-2 cursor-pointer hover:bg-pink-800/90 hover:text-pink-50 duration-200" onClick={e => updateCart(e, cart, -1)}>&#x2212;</button>
                    <input type="text" value={cart.quantity} readOnly className="w-10 text-center bg-pink-800/90 text-pink-50 border-1 border-pink-900 font-bold" />
                    <button className="bg-pink-100 border-1 border-pink-900 text-pink-900 px-2 cursor-pointer hover:bg-pink-800/90 hover:text-pink-50 duration-200" onClick={e => updateCart(e, cart, 1)}>+</button>
                  </td>
                  <td>{displayPrice(cart.price)}</td>
                  <td>                    
                    <button
                      className="bg-red-600 text-white flex gap-x-1 px-4 py-1 rounded-[7px] hover:bg-red-600/70 duration-150 cursor-pointer"
                      onClick={() => removeCart(cart.id)}
                    >
                      <Trash size={28} /> Xóa
                    </button>
                  </td>
                </tr>
              )
            }
          </tbody>
          <tfoot>
            <tr className="bg-linear-to-r from-pink-700 to-pink-900 text-pink-50 text-xl font-bold ">
              <td colSpan={4} className="text-right py-1">TỔNG:</td>
              <td colSpan={2}>{displayPrice(total)}</td>
            </tr>
          </tfoot>
        </table>
      </section>

      <section className="flex justify-center gap-x-4 text-lg">
        <a href="" className="bg-green-600 text-white px-4 py-1 rounded-[7px] hover:bg-green-600/70 duration-150 cursor-pointer">
          Thanh toán
        </a>

        <a href="/san-pham" className="bg-sky-700 text-white px-4 py-1 rounded-[7px] hover:bg-sky-700/70 duration-150 cursor-pointer">
          Xem thêm sản phẩm khác
        </a>

        <a onClick={() => {}} className="bg-red-600 text-white px-4 py-1 rounded-[7px] hover:bg-red-600/70 duration-150 cursor-pointer">
          Xóa giỏ hàng
        </a>
      </section>
    </main>
  )

  function calcTotal(list = cartList) {
    let tempTotal = 0;
    list.forEach(cart => tempTotal = tempTotal + cart.price * cart.quantity);
    setTotal(tempTotal);
  }

  function updateCart(e, cart, quantity) {
    if (cart.quantity + quantity > 0) {
      const updateCart = { id: cart.id, book: cart.bookId, user: 1, quantity: cart.quantity + quantity };
      const headers = { headers: {"Content-Type": "application/json"} };
      axios.put("/cart/update", updateCart, headers).then(response => {
        if (response.status === 200) {
          cart.quantity += quantity;
          e.target.parentElement.children[1].value = cart.quantity;
          calcTotal();
        }
        else console.error(response);
      })
    }
  }

  function removeCart(id) {
    if (confirm("Bạn có muốn xóa sản phẩm này?")) {
      axios.delete(`/cart/delete?id=${id}`).then(response => {
        if (response.status === 200) {
          alert("Xóa thành công");
          location.reload();
        }
        else {
          alert("Đã có lỗi xảy ra, vui lòng thử lại");
          console.error(response);
        }
      })
    }
  }
}

export default Cart;