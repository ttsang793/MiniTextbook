import axios from "axios";
import { X } from "@phosphor-icons/react";

const OrderOverlay = ({onOverlay, onClick}) => {
  return (
    <div
      className={`fixed top-0 right-0 left-0 bottom-0 bg-black/50 flex justify-center items-center ${onOverlay ? "flex" : "hidden"}`}
    >
      <div className="bg-white box-shadow rounded-xl p-6 w-[90dvw] h-[90dvh] relative">
        <button className="absolute top-3 right-3 cursor-pointer rounded-full bg-transparent hover:bg-zinc-300 duration-300 p-0 hover:p-1 hover:top-2 hover:right-2" onClick={onClick}>
          <X size={24} />
        </button>
        <h1 className="text-pink-900 font-bold text-2xl italic mb-2">
          Danh sách đơn hàng
        </h1>

        <hr className="mb-3 border-pink-900" />

        <div className="text-3xl overflow-auto h-[75dvh]">
          Lorem ipsum dolor sit.<br />
          Lorem ipsum dolor sit.<br />
          Lorem ipsum dolor sit.<br />
          Lorem ipsum dolor sit.<br />
          Lorem ipsum dolor sit.<br />
          Lorem ipsum dolor sit.<br />
          Lorem ipsum dolor sit.<br />
          Lorem ipsum dolor sit.<br />
          Lorem ipsum dolor sit.<br />
          Lorem ipsum dolor sit.<br />
          Lorem ipsum dolor sit.<br />
          Lorem ipsum dolor sit.<br />
          Lorem ipsum dolor sit.<br />
          Lorem ipsum dolor sit.<br />
          Lorem ipsum dolor sit.<br />
          Lorem ipsum dolor sit.<br />
          Lorem ipsum dolor sit.<br />
          Lorem ipsum dolor sit.<br />
        </div>
      </div>
    </div>
  );
}

export default OrderOverlay