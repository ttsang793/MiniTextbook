import React, { useState } from 'react';
import axios from 'axios';

const Login = ({onSwitch}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className='text-pink-800'>
      <h1 className='font-bold text-3xl mb-2'>ĐĂNG NHẬP</h1>

      <hr className='mb-4 text-zinc-600' />

      <div className="mb-6">
        <label htmlFor="username" className="block font-bold italic text-xl">Username: </label>
        <input type="text" id="username" value={username} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Username' onChange={e => setUsername(e.target.value)} onInput={() => clearUsernameValidation()} />
        <p id="error-username" className='text-red-700 italic'></p>
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block font-bold italic text-xl">Mật khẩu: </label>
        <input type="password" id="password" value={password} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Mật khẩu' onChange={e => setPassword(e.target.value)} onInput={() => clearPasswordValidation()} />
        <p id="error-password" className='text-red-700 italic'></p>
        <a className='cursor-pointer italic underline! mt-2'>Quên mật khẩu?</a>
      </div>

      <div className="text-center">
      <button className="bg-radial px-4 py-1 cursor-pointer from-pink-700 to-pink-900 hover:from-pink-600 hover:to-pink-800 text-pink-50 text-xl mb-4" onClick={Login}>
        Đăng nhập
      </button>
      <br />
      Đã có tài khoản? <a className='cursor-pointer italic underline!' onClick={onSwitch}>Đăng ký ngay!</a> <br />
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

  function Login() {
    clearUsernameValidation();
    clearPasswordValidation();
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

    if (!errorFlag) {
      axios.post("/user/login", { username, password }, { 'Content-Type': 'application/json' })
      .then(() => {
        alert("Đăng nhập thành công!");
        location.reload();
      })
      .catch(response => {
        if (response.status === 404) {
          const data = response.response.data;

          document.getElementById(`error-${data.input}`).innerHTML = data.message;
          document.getElementById(`${data.input}`).classList.add("focus-error");
          document.getElementById(`${data.input}`).focus();
        }
        else {
          alert("Đã có lỗi xảy ra, vui lòng thử lại!");
          console.error(response);
        }
      })
    }
  }
}

export default Login;