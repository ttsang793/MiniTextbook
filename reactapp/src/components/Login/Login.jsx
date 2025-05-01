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
        <input type="text" id="username" value={username} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Username' onChange={e => setUsername(e.target.value)} />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block font-bold italic text-xl">Mật khẩu: </label>
        <input type="password" id="password" value={password} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150 mb-2" placeholder='Mật khẩu' onChange={e => setPassword(e.target.value)} />
        <a className='cursor-pointer italic underline!'>Quên mật khẩu?</a>
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

  function Login() {
    axios.post("/user/login", { username, password }, { 'Content-Type': 'application/json' }).then(response => {
      if (response.status === 200) {
        alert("Đăng nhập thành công!");
        location.reload();
      }
      else {
        //temp
        alert("Đã có lỗi xảy ra!")
      }
    })
  }
}

export default Login;