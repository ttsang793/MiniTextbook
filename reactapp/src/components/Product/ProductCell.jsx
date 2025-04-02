import { Heart } from "@phosphor-icons/react";
import { CartPlusFill, CartCheckFill } from "react-bootstrap-icons";
import { displayPrice } from '/script';
import "./ProductCell.css"

const ProductCell = ({ product }) => {
  return (
    <div className="flex flex-col items-center text-center rounded-2xl p-4 select-none cursor-pointer duration-300 text-pink-900 hover:shadow-[10px_10px_10px_rgb(134,16,67,0.25)] hover:bg-linear-to-tl hover:from-white hover:to-pink-200">
      <div className="relative">
        <img src={`/src/images/products/${product.image}`} alt={product.name} className="h-70" />
      </div>

      <p className="text-2xl font-bold py-2">{product.name}</p>
      <div className="flex text-center justify-center gap-2">
        <p className="font-medium italic text-lg">{displayPrice(product.price)}</p>
      </div>

      <div className="flex justify-center gap-x-2 w-full mt-2">
        <div>
          <button className="bg-pink-100 border-1 border-pink-900 text-pink-900 px-2 cursor-pointer text-xl hover:bg-pink-800/90 hover:text-pink-50 duration-200">&#x2212;</button>
          <input type="text" value="1" readOnly className="w-10 text-center text-xl bg-pink-800/90 text-pink-50 border-1 border-pink-900 font-bold" />
          <button className="bg-pink-100 border-1 border-pink-900 text-pink-900 px-2 cursor-pointer text-xl hover:bg-pink-800/90 hover:text-pink-50 duration-200">+</button>
        </div>

        <div>
          <button className="bg-pink-100 border-1 border-pink-900 text-pink-900 p-1 cursor-pointer text-xl hover:bg-pink-800/90 hover:text-pink-50 duration-200">
            <Heart weight="fill" size={20} />
          </button>
          <button className="bg-pink-100 border-1 border-pink-900 text-pink-900 p-1 cursor-pointer text-xl hover:bg-pink-800/90 hover:text-pink-50 duration-200">
            <CartPlusFill size={20} />
          </button>
          <button className="bg-pink-100 border-1 border-pink-900 text-pink-900 p-1 cursor-pointer text-xl hover:bg-pink-800/90 hover:text-pink-50 duration-200">
            <CartCheckFill size={20} />
          </button>
        </div>
      </div>
    </div>
    /*
    <div className="flex flex-col items-center text-center bg-linear-to-br from-pink-100 to-pink-500 rounded-xl p-4 select-none">
      <div className="relative">
        <img src="/src/images/TIN_10_CD.jpg" alt="Tin học 10 - Cánh diều" />
        <div className="product-sale-tag"></div>
        <p className="product-sale-percent">&#x2212;25%</p>
      </div>
      
      <p className="text-2xl text-white font-bold py-2">Tin học 10 - Cánh diều</p>
      <div className="flex text-center justify-center gap-2">
        <p className="font-bold italic text-white text-xl">15.000đ</p>
        <p className="text-white text-sm line-through">30.000đ</p>
      </div>

      <div className="flex justify-center gap-x-2 w-full mt-2">
        <div>
          <button className="bg-pink-100 border-1 border-pink-900 text-pink-900 px-2 cursor-pointer text-xl hover:bg-pink-800/90 hover:text-pink-50 duration-200">&#x2212;</button>
          <input type="text" value="1" readOnly className="w-10 text-center text-xl bg-pink-800/90 text-pink-50 border-1 border-pink-900 font-bold" />
          <button className="bg-pink-100 border-1 border-pink-900 text-pink-900 px-2 cursor-pointer text-xl hover:bg-pink-800/90 hover:text-pink-50 duration-200">+</button>
        </div>

        <div>
          <button className="bg-pink-100 border-1 border-pink-900 text-pink-900 p-1 cursor-pointer text-xl hover:bg-pink-800/90 hover:text-pink-50 duration-200">
            <Heart weight="fill" size={20} />
          </button>
          <button className="bg-pink-100 border-1 border-pink-900 text-pink-900 p-1 cursor-pointer text-xl hover:bg-pink-800/90 hover:text-pink-50 duration-200">
            <CartPlusFill size={20} />
          </button>
          <button className="bg-pink-100 border-1 border-pink-900 text-pink-900 p-1 cursor-pointer text-xl hover:bg-pink-800/90 hover:text-pink-50 duration-200">
            <CartCheckFill size={20} />
          </button>
        </div>
      </div>
    </div>
    */
  )
}

export default ProductCell;