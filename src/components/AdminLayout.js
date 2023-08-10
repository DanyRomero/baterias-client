import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'

const AdminLayout = (props) => {

  const {user, handleLogout} = props
  return (
    <>
      <Navbar user={user} handleLogout={handleLogout} />
      <Outlet />
    </>
  )
}

export default AdminLayout
