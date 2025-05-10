import React, { useState, useEffect } from 'react';
import User from './Account/User';
import Admin from './Account/Admin';
import Role from './Account/Role';
import "./Account.css";

const AAccount = () => {
  const [showUser, setShowUser] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showRole, setShowRole] = useState(false);

  const changeCurrent = e => {
    document.querySelectorAll(".account-btn").forEach(btn => btn.classList.remove("account-current"));
    e.target.classList.add("account-current");
  }

  const handleShowUser = e => {
    setShowUser(true);
    setShowAdmin(false);
    setShowRole(false);
    changeCurrent(e);
  }

  const handleShowAdmin = e => {
    setShowUser(false);
    setShowAdmin(true);
    setShowRole(false);
    changeCurrent(e);
  }

  const handleShowRole = e => {
    setShowUser(false);
    setShowAdmin(false);
    setShowRole(true);
    changeCurrent(e);
  }
  
  useEffect(() => {
    document.title = "Quản lý tài khoản";
  }, [])

  return (
    <main className="mx-20">
      <h1 className="text-center text-pink-900 font-bold text-4xl mt-4 mb-3">QUẢN LÝ TÀI KHOẢN</h1>
      <hr className="mb-3 border-pink-900" />

      <div className="text-center">
        <button className="account-btn me-2 account-current" onClick={handleShowUser}>
          Khách hàng
        </button>
        <button className="account-btn me-2" onClick={handleShowAdmin}>
          Nhân viên
        </button>
        <button className="account-btn" onClick={handleShowRole}>
          Phân quyền
        </button>
      </div>

      <User show={showUser} />
      <Admin show={showAdmin} />
      <Role show={showRole} />
    </main>
  )
}

export default AAccount;