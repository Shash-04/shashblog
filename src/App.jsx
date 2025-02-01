import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authslice';
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL);
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  
  return !loading ? (
    <div className=' flex flex-col min-h-screen  bg-sky-300'>
      <div className='w-full block'>
        <Header />
        <main className=' '>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
