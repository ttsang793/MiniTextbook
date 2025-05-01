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
        <input type="text" id="username" value={username} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Username' onChange={e => setUsername(e.target.value)} />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block font-bold italic text-xl">Mật khẩu: </label>
        <input type="password" id="password" value={password} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Mật khẩu' onChange={e => setPassword(e.target.value)} />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block font-bold italic text-xl">Xác nhận mật khẩu: </label>
        <input type="password" id="confirm" value={confirm} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Nhập lại mật khẩu' onChange={e => setConfirm(e.target.value)} />
      </div>
      
      <div className="mb-6">
        <label htmlFor="fullname" className="block font-bold italic text-xl">Họ và tên: </label>
        <input type="text" id="fullname" value={fullname} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Nhập lại mật khẩu' onChange={e => setFullname(e.target.value)} />
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
  
  function Register() {
    axios.post("/user/register", { username, password, fullname }, { 'Content-Type': 'application/json' }).then(response => {
      if (response.status === 200) {
        alert("Đăng ký thành công!");
        location.reload();
      }
      else {
        //temp
        alert("Đăng ký thất bại!")
      }
    })
  }
}

export default Register;