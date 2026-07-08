import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import ProfilePage from './Pages/ProfilePage'
import { Toaster } from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'


const App = () => {
  const { authUser, isCheckingAuth } = useContext(AuthContext);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#6F36D4] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#6F36D4] min-h-screen">
      <Toaster/>      
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to="/"/>}/>
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
      </Routes>
    </div>
  )
}

export default App