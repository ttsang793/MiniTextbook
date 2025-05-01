import React, { useState, useEffect } from "react";
import { Heart, ShoppingCartSimple, User, MagnifyingGlass } from "@phosphor-icons/react";
import axios from "axios";
import LoginForm from "./Login/LoginForm";

const Header = () => {
  const [search, setSearch] = useState("");
  const [fullname, setFullname] = useState("");
  const [avatar, setAvater] = useState("");

  const openModal = () => {
    document.getElementById("login-modal").classList.add("visible");
    document.body.style.overflow = "hidden";
  }
  const closeModal = () => {
    document.getElementById("login-modal").classList.remove("visible");
    document.body.style.overflow = "";
  }

  useEffect(() => {
    axios.get("/user/get-session").then(response => {
      setFullname(response.data.fullname || "");
      setAvater(response.data.avatar || "");
    });
  }, []);

  return (
    <header className="mb-8">
      <div className="flex justify-between ms-12 me-15 items-center">
        <div>
          <a href="/san-pham" title="Xem tất cả sản phẩm">
            <button className="text-pink-700 cursor-pointer h-[32px] hover:text-white hover:bg-linear-to-br hover:from-pink-700 hover:to-pink-900 duration-200 px-3">Sản phẩm</button>
          </a>
          <a href="/san-pham?lop=10" title="Xem sách giáo khoa lớp 10">
            <button className="text-pink-700 cursor-pointer h-[32px] hover:text-white hover:bg-linear-to-br hover:from-pink-700 hover:to-pink-900 duration-200 px-3">Lớp 10</button>
          </a>
          <a href="/san-pham?lop=11" title="Xem sách giáo khoa lớp 11">
            <button className="text-pink-700 cursor-pointer h-[32px] hover:text-white hover:bg-linear-to-br hover:from-pink-700 hover:to-pink-900 duration-200 px-3">Lớp 11</button>
          </a>
          <a href="/san-pham?lop=12" title="Xem sách giáo khoa lớp 12">
            <button className="text-pink-700 cursor-pointer h-[32px] hover:text-white hover:bg-linear-to-br hover:from-pink-700 hover:to-pink-900 duration-200 px-3">Lớp 12</button>
          </a>
        </div>

        <div className="flex items-center">
          {
            (fullname !== "") ? (
              //Temporary
              <>              
                <a href="/nguoi-dung/yeu-thich">
                  <button className="align-middle text-pink-700 cursor-pointer h-[32px] hover:text-white hover:bg-linear-to-br hover:from-pink-700 hover:to-pink-900 duration-200 px-1">
                    <Heart size={28} className="cursor-pointer" />
                  </button>
                </a>
                <a href="/nguoi-dung/gio-hang">
                  <button className="align-middle text-pink-700 cursor-pointer h-[32px] hover:text-white hover:bg-linear-to-br hover:from-pink-700 hover:to-pink-900 duration-200 px-1">
                    <ShoppingCartSimple size={28} className="cursor-pointer" />
                  </button>
                </a>
                <button
                  className="text-pink-700 cursor-pointer h-[32px] flex gap-x-2 items-center hover:text-white hover:bg-linear-to-br hover:from-pink-700 hover:to-pink-900 duration-200 ps-2"
                  onClick={logOut}
                >
                  {`${fullname}`}
                  <img src={`${avatar}`} alt={`${fullname}`} className="size-[32px]" />
                </button>
              </>
            ) : (
              <>
                <button
                  className="text-pink-700 cursor-pointer h-[32px] hover:text-white hover:bg-linear-to-br hover:from-pink-700 hover:to-pink-900 duration-200 px-2"
                  onClick={openModal}
                >
                  Đăng nhập
                </button>
                <LoginForm onClose={closeModal} />
              </>
            )
          }
        </div>
      </div>

      <div className="grid grid-cols-[200px_1fr] py-10 px-15 bg-radial from-pink-100 to-pink-300/90 gap-x-10 items-center">
        <a href="/" title="Trang chủ Mini Textbook" className="flex items-center">
          <img src="/mt-vlogo.png" alt="Mini Textbook logo" />
        </a>
        <div className="flex w-full">
          <input
            type="search" id="search-input" className="bg-pink-900/90 text-pink-50 flex-1 rounded-s-full py-2 px-5 text-lg outline-0 placeholder:italic"
            placeholder="Nhập tiêu đề sách bạn cần tìm..." spellCheck="false" value={search} onChange={e => setSearch(e.target.value)}
            onKeyDown={e => {if (e.nativeEvent.key === "Enter") document.getElementById("search-btn").click()}}
          />
          <a id="search-btn" href={(search === "") ? "/san-pham" : `/san-pham?search=${search}`}
            className="rounded-e-full bg-pink-900/90 text-pink-50 cursor-pointer hover:bg-pink-300 hover:text-pink-900 duration-200">
            <button className="p-2">
              <MagnifyingGlass size={28} className="cursor-pointer" />
            </button>
          </a>
        </div>
      </div>
    </header>
  )

  function logOut() {
    axios.post("/user/logout").then(response => location.href = "/");
  }
}

export default Header;