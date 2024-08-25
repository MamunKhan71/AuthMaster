import { useState } from 'react'
import FloatingShape from './components/FloatingShape'
import { Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-screen bg-gradient-to-tr from-[#440027] via-[#011437] to-[#071414] flex items-center justify-center relative overflow-hidden'>
      <FloatingShape color="bg-blue-950" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-blue-800" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-blue-900" size="w-32 h-32" top="40%" left="0%" delay={2} />
      <Routes>
        <Route path='/' element={"Home"}></Route>
        <Route path='/signup' element={<SignUpPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/verify-email' element={<VerifyEmailPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
