import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'

const AdminLayout = ({ user, handleLogout }) => {
  return (
    <>
      <Navbar user={user} handleLogout={handleLogout} />
      <Outlet />
    </>
  )
}

export default AdminLayout