import axios from "axios";
import { React, useState } from "react";
import { Heart } from "@phosphor-icons/react";
import { CartPlusFill, CartCheckFill } from "react-bootstrap-icons";
import { displayPrice } from '/script';
import "./ProductCell.css"

const ProductCell = ({ product, favorite = null }) => {
  const [quantity, setQuantity] = useState(1);
  const incQuantity = () => setQuantity(quantity + 1);
  const decQuantity = () => (quantity > 1) && setQuantity(quantity - 1);

  return (
    <div className="flex flex-col items-center text-center rounded-2xl p-4 select-none cursor-pointer duration-300 text-pink-900 hover:shadow-[10px_10px_10px_rgb(134,16,67,0.25)] hover:bg-linear-to-tl hover:from-white hover:to-pink-200">
      <div className="relative">
        <img src={product.image} alt={product.name} className="h-70" />
      </div>

      <p className="text-2xl font-bold py-2">{product.name}</p>
      <div className="flex text-center justify-center gap-2">
        <p className="font-medium italic text-lg">{displayPrice(product.price)}</p>
      </div>

      <div className="flex justify-center gap-x-2 w-full mt-2">
        <div>
          <button className="bg-pink-100 border-1 border-pink-900 text-pink-900 px-2 cursor-pointer text-xl hover:bg-pink-800/90 hover:text-pink-50 duration-200" onClick={() => decQuantity()}>&#x2212;</button>
          <input type="text" value={quantity} readOnly className="w-10 text-center text-xl bg-pink-800/90 text-pink-50 border-1 border-pink-900 font-bold" />
          <button className="bg-pink-100 border-1 border-pink-900 text-pink-900 px-2 cursor-pointer text-xl hover:bg-pink-800/90 hover:text-pink-50 duration-200" onClick={() => incQuantity()}>+</button>
        </div>

        <div>
          <button className="bg-pink-100 border-1 border-pink-900 text-pink-900 p-1 cursor-pointer text-xl hover:bg-pink-800/90 hover:text-pink-50 duration-200" onClick={() => handleFavorite(product.id, favorite)}>
            <Heart weight="fill" size={20} />
          </button>
          <button className="bg-pink-100 border-1 border-pink-900 text-pink-900 p-1 cursor-pointer text-xl hover:bg-pink-800/90 hover:text-pink-50 duration-200" onClick={() => addToCart(product.id, quantity)}>
            <CartPlusFill size={20} />
          </button>
          <button className="bg-pink-100 border-1 border-pink-900 text-pink-900 p-1 cursor-pointer text-xl hover:bg-pink-800/90 hover:text-pink-50 duration-200">
            <CartCheckFill size={20} />
          </button>
        </div>
      </div>
    </div>
  )

  function handleFavorite(id, favorite) {
    if (favorite === null) {
      //Se hien thi form dang nhap
      alert("Vui lòng đăng nhập")
    }
    else if (favorite === true) {
      if (confirm("Bạn có muốn bỏ sản phẩm này ra khỏi yêu thích?")) {
        const favoriteObj = { book: Number(id), user: Number(1) }
        const headers = { headers: { "Content-Type": "application/json" } }
        axios.delete("/favorite/delete", { data: favoriteObj, headers }).then(response => {
          if (response.status === 200) alert("Đã xóa sản phẩm ra khỏi yêu thích");
          else {
            alert("Đã có lỗi xảy ra, vui lòng thử lại");
            console.error(response);
          }
        })
      }
    }
    else {
      const favoriteObj = { book: Number(id), user: Number(1) }
      const headers = { headers: { "Content-Type": "application/json" } }
      axios.post("/favorite/insert", favoriteObj, headers).then(response => {
        if (response.status === 200) alert("Đã thêm vào yêu thích");
        else {
          alert("Đã có lỗi xảy ra, vui lòng thử lại");
          console.error(response);
        }
      })
    }
  }

  function addToCart(book, quantity) {
    const cart = { book, user: 1, quantity };
    const headers = { headers: {"Content-Type": "application/json"} };

    axios.post("/cart/insert", cart, headers).then(response => {
      if (response.status === 200) alert("Thêm vào giỏ hàng thành công");
      else {
        alert("Đã có lỗi xảy ra, vui lòng thử lại");
        console.error(response);
      }
    })
  }
}

export default ProductCell;