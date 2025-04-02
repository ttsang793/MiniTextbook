import Login from './Login'
import Register from './Register'
import Forget from './Forget'
import { React, useState } from 'react';

const UserForm = () => {
  const [page, setPage] = useState("login");

  const renderPage = page => {
    switch (page) {
      case "login": return <Login />
      case "register": return <Register />
      case "forget": return <Forget />
    }
  }

  return (
    <>
      {renderPage()}
    </>
  )
}