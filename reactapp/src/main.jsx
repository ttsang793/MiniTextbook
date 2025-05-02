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
import FourOOne from '/src/pages/FourOOne'
import FourOFour from '/src/pages/FourOFour'
import Footer from '/src/components/Footer'

//order_user
import OrderHistory from '/src/pages/OrderHistory'
import OrderPlacement from '/src/pages/OrderPlacement'
import OrderResult from '/src/pages/OrderResult'

//admin
import AHeader from '/src/Admin/components/Header';
import ABook from '/src/Admin/pages/Book';
import AOrder from '/src/Admin/pages/Order';
import APublisher from '/src/Admin/pages/Publisher';
import ASeries from '/src/Admin/pages/Series';
import ASubject from '/src/Admin/pages/Subject';

function App() {
  const [fullname, setFullname] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    axios.get("/user/get-session").then(response => {
      setFullname(response.data.fullname || "");
      setAvatar(response.data.avatar || "");
    });
  }, []);

  const loadPage = () => {
    if (location.pathname === "/hello-world") return <HelloWorld />

    else if (location.pathname.startsWith("/quan-tri")) return (
      <>
        <AHeader />
        <Router future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
          <Routes>
            <Route path="/quan-tri/nha-xuat-ban" element={<APublisher />} />
            <Route path="/quan-tri/sach" element={<ABook />} />
            <Route path="/quan-tri/bo-sach" element={<ASeries />} />
            <Route path="/quan-tri/mon-hoc" element={<ASubject />} />
            <Route path="/quan-tri/don-hang" element={<AOrder />} />
            <Route path="/quan-tri/*" element={<FourOFour />} />
          </Routes>
        </Router>
      </>
    )
    
    else {
      return (
        <>
          <Header fullname={fullname} avatar={avatar} />
          <Router future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/san-pham" element={<Product />} />
              <Route path="/nguoi-dung">
                {
                  (fullname === "") ? <Route path="*" element={<Navigate to="/401" replace />} /> : (
                  <>
                    <Route path="yeu-thich" element={<Favorite />} />
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
              <Route path="/*" element={<Navigate to="/404" replace />} />
              <Route path="/401" element={<FourOOne />} />
              <Route path="/404" element={<FourOFour />} />
            </Routes>
          </Router>
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
