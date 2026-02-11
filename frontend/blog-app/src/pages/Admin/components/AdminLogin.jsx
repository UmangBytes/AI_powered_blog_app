import React, { useState } from 'react'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import LOGO from '../../../assets/logo.png' 
import Login from '../../../components/auth/Login'
import SignUp from '../../../components/auth/SignUp'

const AdminLogin = () => {

  const [currentPage,setCurrentPage]=useState("login")

  return (
    <>
    <div className='bg-white py-5 '>
      <div className='container mx-auto'>
        <img src={LOGO} alt="logo" className='h-[26px] pl-6'/>
      </div>
    </div>

    <div className='min-h-[calc(100vh-67px)] flex items-center justify-center'>
      <div className='bg-white rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/60'>
        {currentPage==='login'?(
          <Login setCurrentPage={setCurrentPage} />
        ):(
          <SignUp setCurrentPage={setCurrentPage} />
        )}
      </div>
    </div>
    </>
  )
}

export default AdminLogin
