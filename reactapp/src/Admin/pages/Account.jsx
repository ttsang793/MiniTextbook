import React, { useState, useEffect } from 'react';
import User from './Account/User';
import Admin from './Account/Admin';
import Role from './Account/Role';
import "./Account.css";

const getMinPermission = agroup => {
  const result = [0, 0];

  if (agroup.includes(6)) {
    result[0] = 6;
    result[1]++;
  }
  if (agroup.includes(7)) {
    result[0] = result[0] ? result[0] : 7;
    result[1]++;
  }
  if (agroup.includes(8)) {
    result[0] = result[0] ? result[0] : 8;
    result[1]++;
  }

  return result;
}

const AAccount = ({agroup}) => {
  const minPermission = getMinPermission(agroup)
  const [showUser, setShowUser] = useState(minPermission[0] === 6);
  const [showAdmin, setShowAdmin] = useState(minPermission[0] === 7);
  const [showRole, setShowRole] = useState(minPermission[0] === 8);

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
      
      {
        minPermission[1] <= 1 ? <></> : (
          <div className="text-center">
            {
              agroup.includes(6) &&
              <button className={`account-btn me-2 ${minPermission[0] === 6 && "account-current"}`} onClick={handleShowUser}>
                Khách hàng
              </button>
            }
            {
              agroup.includes(7) &&
              <button className={`account-btn ${agroup.includes(8) && "me-2"} ${minPermission[0] === 7 && "account-current"}`} onClick={handleShowAdmin}>
                Nhân viên
              </button>
            }
            {
              agroup.includes(8) &&
              <button className="account-btn" onClick={handleShowRole}>
                Phân quyền
              </button>
            }
          </div>
        )
      }

      <User show={showUser} agroup={agroup} />
      <Admin show={showAdmin} agroup={agroup} />
      <Role show={showRole} agroup={agroup} />
    </main>
  )
}

export default AAccount;