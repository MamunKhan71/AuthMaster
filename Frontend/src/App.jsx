import { useEffect, useState } from 'react'
import FloatingShape from './components/FloatingShape'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from '../store/authStore'
import Dashboard from './pages/Dashboard'
import LoadingSpinner from './components/LoadingSpinner'
import ForgotPassword from './pages/ForgotPassword'
import ResetPasswordPage from './pages/ResetPasswordPage'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace />
  }
  if (!user.isVerified) {
    return <Navigate to={'/verify-email'} replace />
  }
  return children;
}

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()
  if (isAuthenticated && user.isVerified) {
    return <Navigate to={'/'} replace></Navigate>
  }
  return children;
}
function App() {
  const [count, setCount] = useState(0)
  const { isCheckingAuth, checkAuth } = useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) return <LoadingSpinner />

  return (
    <div className='min-h-screen bg-gradient-to-tr from-[#440027] via-[#011437] to-[#071414] flex items-center justify-center relative overflow-hidden'>
      <FloatingShape color="bg-blue-950" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-blue-800" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-blue-900" size="w-32 h-32" top="40%" left="0%" delay={2} />
      <Routes>
        <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}></Route>
        <Route path='/signup' element={<RedirectAuthenticatedUser><SignUpPage /></RedirectAuthenticatedUser>}></Route>
        <Route path='/login' element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>}></Route>
        <Route path='/verify-email' element={<VerifyEmailPage />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        <Route path='/reset-password/:token' element={<ResetPasswordPage />}></Route>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
