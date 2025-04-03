import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router'

//user
import Header from '/src/components/Header'
import Home from '/src/pages/Home'
import Product from '/src/pages/Product'
import HelloWorld from '/src/pages/HelloWorld'
import FourOFour from '/src/pages/FourOFour'
import Footer from '/src/components/Footer'

//admin
import AHeader from '/src/Admin/components/Header';
import APublisher from '/src/Admin/pages/Publisher';
import ASeries from '/src/Admin/pages/Series';
import ASubject from '/src/Admin/pages/Subject';
import ABook from '/src/Admin/pages/Book';

//temp
//import UserForm from '/src/components/UserForm';

function loadPage() {
  if (location.pathname === "/hello-world") return <HelloWorld />

  else if (location.pathname.startsWith("/quan-tri")) return (
    <StrictMode>
      <AHeader />
      <Router future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
        <Routes>
          <Route path="/quan-tri/nha-xuat-ban" element={<APublisher />} />
          <Route path="/quan-tri/bo-sach" element={<ASeries />} />
          <Route path="/quan-tri/mon-hoc" element={<ASubject />} />
          <Route path="/quan-tri/sach" element={<ABook />} />
        </Routes>
      </Router>
    </StrictMode>
  )

  
  else return (
    <StrictMode>
      <Header />
      <Router future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/san-pham" element={<Product />} />
          <Route path="/san-pham/:tieuChi" element={<Product />} />
          <Route path="/*" element={<Navigate to="/404" replace />} />
          <Route path="/404" element={<FourOFour />} />
          {/*<Route path="/dang-nhap" element={<UserForm />} />*/}
        </Routes>
      </Router>
      <Footer />
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(
  <>
  { loadPage() }
  </>
)
