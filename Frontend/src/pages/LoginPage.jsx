import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '../components/Input'
import { Lock, Mail, Loader } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, isLoading, error } = useAuthStore()
  const handleLogin = async (e) => {
    e.preventDefault()
    await login(email, password)
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-blur-xl backdrop-filter rounded-2xl shadow-xl overflow-hidden'
    >
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-800 text-transparent bg-clip-text'>
          Welcome Back
        </h2>
        <form onSubmit={handleLogin}>
          <Input icon={Mail} type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
          <Input icon={Lock} type="password" placeholder="Passowrd" value={password} onChange={e => setPassword(e.target.value)} />
          <div className='flex items-center'>
            <Link className='text-sm text-blue-400 hover:underline' to={'/forgot-password'}>Forgot password?</Link>
          </div>
          <motion.button disabled={isLoading} type='submit' whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-900 transition duration-200'>
            {isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Login"}
          </motion.button>
        </form>
        {error && <p className='text-red-400 font-semibold text-xs mt-2 text-right'>{error}</p>}
      </div>
      <div className='px-8 py-4 bg-blue-950 bg-opacity-50 flex justify-center'>
        <p className='text-sm text-blue-400'>
          Don&apos;t have an account? {" "}
          <Link to={'/signup'} className='text-blue-400 hover:underline font-bold'>Sign Up</Link>
        </p>
      </div>
    </motion.div>
  )
}

export default LoginPage