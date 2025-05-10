import React, { useState } from 'react';
import axios from 'axios';

const Register = ({onSwitch}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [fullname, setFullname] = useState("");

  return (
    <div className='text-pink-800'>
      <h1 className='font-bold text-3xl mb-2'>ĐĂNG KÝ</h1>

      <hr className='mb-4 text-zinc-600' />

      <div className="mb-6">
        <label htmlFor="username" className="block font-bold italic text-xl">Username: </label>
        <input type="text" id="username" value={username} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Username' onChange={e => setUsername(e.target.value)} onInput={() => clearUsernameValidation()} />
        <p id="error-username" className="text-red-700 italic"></p>
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block font-bold italic text-xl">Mật khẩu: </label>
        <input type="password" id="password" value={password} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Mật khẩu' onChange={e => setPassword(e.target.value)} onInput={() => clearPasswordValidation()} />
        <p id="error-password" className="text-red-700 italic"></p>
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block font-bold italic text-xl">Xác nhận mật khẩu: </label>
        <input type="password" id="confirm" value={confirm} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Nhập lại mật khẩu' onChange={e => setConfirm(e.target.value)} onInput={() => clearConfirmValidation()} />
        <p id="error-confirm" className="text-red-700 italic"></p>
      </div>
      
      <div className="mb-6">
        <label htmlFor="fullname" className="block font-bold italic text-xl">Họ và tên: </label>
        <input type="text" id="fullname" value={fullname} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Họ và tên' onChange={e => setFullname(e.target.value)} onInput={() => clearFullnameValidation()} />
        <p id="error-fullname" className="text-red-700 italic"></p>
      </div>

      <div className="text-center">
      <button className="bg-radial px-4 py-1 cursor-pointer from-pink-700 to-pink-900 hover:from-pink-600 hover:to-pink-800 text-pink-50 text-xl mb-4" onClick={Register}>
        Đăng ký
      </button>
      <br />
      Đã có tài khoản? <a className='cursor-pointer italic underline!' onClick={onSwitch}>Đăng nhập ngay!</a> <br />
      </div>
    </div>
  )

  function clearUsernameValidation() {
    document.getElementById("error-username").innerHTML = "";
    document.getElementById("username").classList.remove("focus-error");
  }

  function clearPasswordValidation() {
    document.getElementById("error-password").innerHTML = "";
    document.getElementById("password").classList.remove("focus-error");
  }

  function clearConfirmValidation() {
    document.getElementById("error-confirm").innerHTML = "";
    document.getElementById("confirm").classList.remove("focus-error");
  }

  function clearFullnameValidation() {
    document.getElementById("error-fullname").innerHTML = "";
    document.getElementById("fullname").classList.remove("focus-error");
  }
  
  function Register(e) {
    e.preventDefault();

    clearUsernameValidation();
    clearPasswordValidation();
    clearConfirmValidation();
    clearFullnameValidation();

    let errorFlag = false;

    if (username === "") {
      document.getElementById("error-username").innerHTML = "Vui lòng nhập username.";
      document.getElementById("username").classList.add("focus-error");
      document.getElementById("username").focus();
      errorFlag = true;
    }

    if (password === "") {
      document.getElementById("error-password").innerHTML = "Vui lòng nhập mật khẩu.";
      document.getElementById("password").classList.add("focus-error");
      if (!errorFlag) document.getElementById("password").focus();
      errorFlag = true;
    }
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)) {
      document.getElementById("error-password").innerHTML = "Mật khẩu cần có 1 chữ hoa, 1 chữ thường, 1 chữ số, và có tối thiểu 6 ký tự";
      document.getElementById("password").classList.add("focus-error");
      if (!errorFlag) document.getElementById("password").focus();
      errorFlag = true;
    }

    if (confirm !== password) {
      document.getElementById("error-confirm").innerHTML = "Cần nhập lại mật khẩu trùng với mật khẩu ở trên.";
      document.getElementById("confirm").classList.add("focus-error");
      if (!errorFlag) document.getElementById("confirm").focus();
      errorFlag = true;
    }

    if (fullname === "") {
      document.getElementById("error-fullname").innerHTML = "Vui lòng nhập họ tên đầy đủ.";
      document.getElementById("fullname").classList.add("focus-error");
      if (!errorFlag) document.getElementById("fullname").focus();
      errorFlag = true;
    }

    if (!errorFlag) {
      axios.post("/user/register", { username, password, fullname }, { 'Content-Type': 'application/json' })
      .then(() => {
        alert("Đăng ký thành công!");
        location.reload();
      })
      .catch(response => {
        if (response.status === 404) {
          document.getElementById("error-username").innerHTML = "Username đã tồn tại.";
          document.getElementById("username").classList.add("focus-error");
          document.getElementById("username").focus();
        }
        else {
          alert("Đã có lỗi xảy ra, vui lòng thử lại!");
          console.error(response);
        }
      })
    }
  }
}

export default Register;