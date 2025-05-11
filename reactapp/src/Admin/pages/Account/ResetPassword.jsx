import axios from "axios";
import React, { useState, useEffect } from 'react';

const AResetPassword = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  useEffect(() => {
    document.title = "Đặt lại mật khẩu | Quản trị MiniTextbook";
  }, []);

  return (
    <main className="mx-20">
      <h1 className='font-bold text-center my-4 text-3xl text-pink-800'>ĐẶT LẠI MẬT KHẨU</h1>

      <div className="mb-6">
        <label htmlFor="oldpass" className="block italic medium">Mật khẩu cũ: </label>
        <input type="password" id="oldpass" value={oldPass} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Mật khẩu cũ' onChange={e => setOldPass(e.target.value)} onInput={() => clearOldPassValidation()} />
        <p id="error-oldpass" className="text-red-700 italic"></p>
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
    </main>
  )

  function clearOldPassValidation() {
    document.getElementById("error-oldpass").innerHTML = "";
    document.getElementById("oldpass").classList.remove("focus-error");
  }

  function clearNewPassValidation() {
    document.getElementById("error-newpass").innerHTML = "";
    document.getElementById("newpass").classList.remove("focus-error");
  }

  function clearConfirmValidation() {
    document.getElementById("error-confirm").innerHTML = "";
    document.getElementById("confirm").classList.remove("focus-error");
  }

  function updatePassword() {
    clearOldPassValidation();
    clearNewPassValidation();
    clearConfirmValidation();
    let errorFlag = false;

    if (oldPass === "") {
      document.getElementById("error-oldpass").innerHTML = "Vui lòng nhập mật khẩu cũ.";
      document.getElementById("oldpass").classList.add("focus-error");
      if (!errorFlag) document.getElementById("oldpass").focus();
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
      if(confirm("Bạn có muốn cập nhật mật khẩu không?")) {
        const pass = { oldPassword: oldPass, newPassword: newPass };

        axios.put("/api/admin/password/update", pass, { 'Content-Type': 'application/json' })
        .then(() => {
          alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại!")
          location.href = "/quan-tri";
        })
        .catch(response => {
          if (response.status === 400) {
            document.getElementById("error-oldpass").innerHTML = "Mật khẩu cũ không chính xác!";
            document.getElementById("oldpass").classList.add("focus-error");
            document.getElementById("oldpass").focus();
          }
          else {
            alert("Đã có lỗi xảy ra, vui lòng thử lại!");
            console.error(response);
          }
        })
      }
    }
  }
}

export default AResetPassword;