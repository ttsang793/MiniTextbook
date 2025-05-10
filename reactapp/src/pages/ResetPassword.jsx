import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";

const ResetPassword = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  return (
    <main className="bg-pink-100 p-8">
      <form className="bg-white rounded-2xl box-shadow p-4 md:mx-auto md:max-w-150">
        <h1 className='font-bold text-center mb-4 text-3xl text-pink-800'>ĐẶT LẠI MẬT KHẨU</h1>

        <div className="mb-6">
          <label htmlFor="username" className="block italic medium">Username: </label>
          <input type="text" id="username" value={username} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Username' onChange={e => setUsername(e.target.value)} onInput={() => clearUsernameValidation()} />
          <p id="error-username" className="text-red-700 italic"></p>
        </div>

        <div className="mb-6">
          <label htmlFor="fullname" className="block italic medium">Họ và tên: </label>
          <input type="text" id="fullname" value={fullname} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Họ và tên' onChange={e => setFullname(e.target.value)} onInput={() => clearFullnameValidation()} />
          <p id="error-fullname" className="text-red-700 italic"></p>
        </div>

        <div className="mb-6">
          <label htmlFor="newpass" className="block italic medium">Mật khẩu mới: </label>
          <input type="password" id="newpass" value={newPass} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Mật khẩu mới' onChange={e => setNewPass(e.target.value)} onInput={() => clearNewPassValidation()} />
          <p id="error-newpass" className="text-red-700 italic"></p>
        </div>

        <div className="mb-6">
          <label htmlFor="confirm" className="block italic medium">Xác nhận mật khẩu: </label>
          <input type="password" id="confirm" value={confirmPass} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Nhập lại mật khẩu' onChange={e => setConfirmPass(e.target.value)} onInput={() => clearConfirmValidation()} />
          <p id="error-confirm" className="text-red-700 italic"></p>
        </div>

        <div className="text-center">
          <button className="bg-radial px-4 py-1 cursor-pointer from-pink-700 to-pink-900 hover:from-pink-600 hover:to-pink-800 text-pink-50 text-lg mb-4" onClick={updatePassword}>
            Đổi mật khẩu
          </button>
        </div>
      </form>
    </main>
  )

  function clearUsernameValidation() {
    document.getElementById("error-username").innerHTML = "";
    document.getElementById("username").classList.remove("focus-error");
  }

  function clearFullnameValidation() {
    document.getElementById("error-fullname").innerHTML = "";
    document.getElementById("fullname").classList.remove("focus-error");
  }

  function clearNewPassValidation() {
    document.getElementById("error-newpass").innerHTML = "";
    document.getElementById("newpass").classList.remove("focus-error");
  }

  function clearConfirmValidation() {
    document.getElementById("error-confirm").innerHTML = "";
    document.getElementById("confirm").classList.remove("focus-error");
  }

  function updatePassword(e) {
    e.preventDefault();

    clearUsernameValidation();
    clearFullnameValidation();
    clearNewPassValidation();
    clearConfirmValidation();
    let errorFlag = false;

    if (username === "") {
      document.getElementById("error-username").innerHTML = "Vui lòng nhập username.";
      document.getElementById("username").classList.add("focus-error");
      document.getElementById("username").focus();
      errorFlag = true;
    }

    if (fullname === "") {
      document.getElementById("error-fullname").innerHTML = "Vui lòng nhập họ tên.";
      document.getElementById("fullname").classList.add("focus-error");
      if (!errorFlag) document.getElementById("fullname").focus();
      errorFlag = true;
    }

    if (newPass === "") {
      document.getElementById("error-newpass").innerHTML = "Vui lòng nhập mật khẩu mới.";
      document.getElementById("newpass").classList.add("focus-error");
      if (!errorFlag) document.getElementById("newpass").focus();
      errorFlag = true;
    }
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(newPass)) {
      document.getElementById("error-newpass").innerHTML = "Mật khẩu cần có 1 chữ hoa, 1 chữ thường, 1 chữ số, và có tối thiểu 6 ký tự";
      document.getElementById("newpass").classList.add("focus-error");
      if (!errorFlag) document.getElementById("newpass").focus();
      errorFlag = true;
    }

    if (confirmPass !== newPass) {
      document.getElementById("error-confirm").innerHTML = "Cần nhập lại mật khẩu trùng với mật khẩu mới ở trên.";
      document.getElementById("confirm").classList.add("focus-error");
      if (!errorFlag) document.getElementById("confirm").focus();
      errorFlag = true;
    }

    if (!errorFlag) {
      if (confirm("Bạn có muốn cập nhật mật khẩu không?")) {
        axios.put("/user/password/reset", { username, password: newPass, fullname }, { 'Content-Type': 'application/json' })
        .then(() => {
          alert("Đặt lại mật khẩu thành công!");
          location.href = "/"
        })
        .catch(response => {
          if (response.status === 400) {
            alert("Vui lòng kiểm tra lại thông tin tài khoản.");
            console.error(response);
          }
          else {
            alert("Đã có lỗi xảy ra, vui lòng thử lại!");
            console.error(response);
          }
        })}
      }
    }
}

export default ResetPassword