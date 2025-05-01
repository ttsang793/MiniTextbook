import React, { useState } from "react";
import { X } from "@phosphor-icons/react";
import "./LoginForm.css"
import Login from "./Login";
import Register from "./Register";

const LoginForm = ({onClose}) => {
  const [isRegister, setIsRegister] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => setIsRegister(false), 500)
  }

  return (
    <div className="modal-overlay" id="login-modal">
      <div className="bg-white rounded-xl box-shadow relative p-6">
        <button className="absolute top-3 right-3 cursor-pointer rounded-full bg-transparent hover:bg-zinc-300 duration-300 p-0 hover:p-1 hover:top-2 hover:right-2" onClick={handleClose}>
          <X size={24} />
        </button>
        {isRegister ? <Register onSwitch={() => setIsRegister(false)} /> : <Login onSwitch={() => setIsRegister(true)} />}
      </div>
    </div>
  )
}

export default LoginForm;