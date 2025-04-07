import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router'

//user
import Header from '/src/components/Header'
import Home from '/src/pages/Home'
import Product from '/src/pages/Product'
import Favorite from '/src/pages/Favorite'
import Cart from '/src/pages/Cart'
import HelloWorld from '/src/pages/HelloWorld'
import FourOFour from '/src/pages/FourOFour'
import Footer from '/src/components/Footer'

//admin
import AHeader from '/src/Admin/components/Header';
import ABook from '/src/Admin/pages/Book';
import AOrder from '/src/Admin/pages/Order';
import APublisher from '/src/Admin/pages/Publisher';
import ASeries from '/src/Admin/pages/Series';
import ASubject from '/src/Admin/pages/Subject';

//temp
//import UserForm from '/src/components/UserForm';

function loadPage() {
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
        </Routes>
      </Router>
    </>
  )

  
  else return (
    <>
      <Header />
      <Router future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/san-pham" element={<Product />} />
          <Route path="/nguoi-dung">
            <Route path="yeu-thich" element={<Favorite />} />
            <Route path="gio-hang" element={<Cart />} />
          </Route>
          <Route path="/*" element={<Navigate to="/404" replace />} />
          <Route path="/404" element={<FourOFour />} />
          {/*<Route path="/dang-nhap" element={<UserForm />} />*/}
        </Routes>
      </Router>
      <Footer />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <>
  { loadPage() }
  </>
)
