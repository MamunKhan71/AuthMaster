import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { ArrowLeft, Loader, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import Input from '../components/Input'
import toast from 'react-hot-toast'
const ResetPasswordPage = () => {
    const { token } = useParams()
    const { isLoading, resetPassword } = useAuthStore()
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleReset = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error("Password Mismatch")
        }
        await resetPassword(token, password)
        toast.success("Password Changed Succssfully!")
        navigate('/login')
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-blue-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
        >
            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-800 text-transparent bg-clip-text'>
                    Reset Password
                </h2>
                <form onSubmit={handleReset}>
                    <Input icon={Lock} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <Input icon={Lock} type="password" placeholder="Confirm new password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='mt-4'
                    >
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                            className='w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-800 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-900
      '
                        >
                            {isLoading ? <Loader className='animate-spin mx-auto size-6' /> : "Set New Password"}
                        </motion.button>
                    </motion.div>
                </form>
            </div>
            <div className='px-8 py-4 bg-blue-950 bg-opacity-50 flex justify-center'>
                <p className='text-sm text-blue-400'>
                    <Link to={'/login'} className='text-blue-400 hover:underline font-bold inline-flex justify-center items-center gap-1'><ArrowLeft size={16} /> Back to Login</Link>
                </p>
            </div>
        </motion.div>
    )
}

export default ResetPasswordPage