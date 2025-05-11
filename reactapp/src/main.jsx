import React, { useState, useEffect } from "react";
import axios from "axios";
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router'

//user
import Header from '/src/components/Header'
import Home from '/src/pages/Home'
import Product from '/src/pages/Product'
import Favorite from '/src/pages/Favorite'
import Cart from '/src/pages/Cart'
import UserDetail from '/src/pages/userDetail'
import HelloWorld from '/src/pages/HelloWorld'
import ResetPassword from '/src/pages/ResetPassword'
import FourOOne from '/src/pages/FourOOne'
import FourOFour from '/src/pages/FourOFour'
import BackToTop from "/src/components/BackToTop";
import Footer from '/src/components/Footer'

//order_user
import OrderHistory from '/src/pages/OrderHistory'
import OrderPlacement from '/src/pages/OrderPlacement'
import OrderResult from '/src/pages/OrderResult'

//admin
import AHeader from '/src/Admin/components/Header';
import ALogin from '/src/Admin/pages/Login'
import AAcount from '/src/Admin/pages/Account';
import ABook from '/src/Admin/pages/Book';
import AOrder from '/src/Admin/pages/Order';
import APublisher from '/src/Admin/pages/Publisher';
import AResetPassword from '/src/Admin/pages/Account/ResetPassword';
import ASeries from '/src/Admin/pages/Series';
import AStatistic from '/src/Admin/pages/Statistic';
import ASubject from '/src/Admin/pages/Subject';
import AFourOThree from '/src/Admin/pages/FourOThree';
import AFourOFour from '/src/Admin/pages/FourOFour';

function App() {
  const [fullname, setFullname] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [aid, setAId] = useState(null);
  const [afullname, setAFullname] = useState(null);
  const [agroup, setAGroup] = useState([]);

  useEffect(() => {
    axios.get("/user/get-session").then(response => {
      setFullname(response.data.fullname || "");
      setAvatar(response.data.avatar || "");
    }).catch(() => {});
    axios.get("/api/admin/get-session").then(response => {
      setAId(response.data.aid);
      setAFullname(response.data.afullname);
      setAGroup(response.data.agroup);
    }).catch(() => {});
  }, []);

  const loadPage = () => {
    if (location.pathname === "/hello-world") return <HelloWorld />

    else if (location.pathname.startsWith("/quan-tri")) {
      if (afullname == null) return <ALogin />

      return (
        <>
          <AHeader aid={aid} afullname={afullname} agroup={agroup} />
          <Router future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
            <Routes>
              <Route path="/quan-tri/" element={<AStatistic />} />
              <Route path="/quan-tri/thong-ke" element={<AStatistic />} />
              <Route path="/quan-tri/sach" element={agroup.includes(1) ? <ABook /> : <Navigate to="/quan-tri/403" replace />} />
              <Route path="/quan-tri/bo-sach" element={agroup.includes(2) ? <ASeries /> : <Navigate to="/quan-tri/403" replace />} />
              <Route path="/quan-tri/nha-xuat-ban" element={agroup.includes(3) ? <APublisher /> : <Navigate to="/quan-tri/403" replace />} />
              <Route path="/quan-tri/mon-hoc" element={agroup.includes(4) ? <ASubject /> : <Navigate to="/quan-tri/403" replace />} />
              <Route path="/quan-tri/don-hang" element={agroup.includes(5) ? <AOrder /> : <Navigate to="/quan-tri/403" replace />} />
              <Route path="/quan-tri/tai-khoan" element={(agroup.includes(6) || agroup.includes(7) || agroup.includes(8)) ? <AAcount agroup={agroup} /> : <Navigate to="/quan-tri/403" replace />} />
              <Route path="/quan-tri/dat-lai-mat-khau" element={<AResetPassword />} />
              <Route path="/quan-tri/403" element={<AFourOThree />} />
              <Route path="/quan-tri/*" element={<AFourOFour />} />
            </Routes>
          </Router>
        </>
      )
    }
    
    else {
      return (
        <>
          <Header fullname={fullname} avatar={avatar} />
          <Router future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
            <Routes>
              <Route path="/" element={<Home fullname={fullname} />} />
              <Route path="/san-pham" element={<Product fullname={fullname} />} />
              <Route path="/nguoi-dung">
                {
                  (fullname === "") ? <Route path="*" element={<Navigate to="/401" replace />} /> : (
                  <>
                    <Route path="yeu-thich" element={<Favorite fullname={fullname} />} />
                    <Route path="gio-hang" element={<Cart />} />
                    <Route path="don-hang" element={<OrderHistory />} />
                    <Route path="thanh-toan">
                      <Route path="" element={<OrderPlacement />} />
                      <Route path="ket-qua" element={<OrderResult />} />
                      <Route path="*" element={<Navigate to="/404" replace />} />
                    </Route>
                    <Route path="" element={<UserDetail />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                  </>
                  )
                }
              </Route>
              <Route path="/dat-lai-mat-khau" element={<ResetPassword />} />
              <Route path="/*" element={<Navigate to="/404" replace />} />
              <Route path="/401" element={<FourOOne />} />
              <Route path="/404" element={<FourOFour />} />
            </Routes>
          </Router>
          <BackToTop />
          <Footer />
        </>
      )
    }
  }

  return (
    <>
    { loadPage() }
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <App />
)
