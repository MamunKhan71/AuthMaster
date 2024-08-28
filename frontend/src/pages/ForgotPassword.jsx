import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import Input from '../components/Input'
import { ArrowLeft, Loader, LucideArrowLeftFromLine, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { isLoading, forgotPassword } = useAuthStore()
    const handleReset = async (e) => {
        e.preventDefault()
        const result = await forgotPassword(email)
        setIsSubmitted(true)
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
                    Forgot Password
                </h2>
                {!isSubmitted ? (
                    <form onSubmit={handleReset}>
                        <p className='text-gray-300 mb-6 text-center'>
                            Enter your email address and we&apos;ll send you a link to reset your password
                        </p>
                        <Input icon={Mail} type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
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
                                {isLoading ? <Loader className='animate-spin mx-auto size-6' /> : "Send Reset Link"}
                            </motion.button>
                        </motion.div>

                    </form>

                ) : (
                    <>
                        <div className='bg-blue-700 mx-auto p-4 rounded-full size-16 flex items-center justify-center text-white'>
                            <Mail />
                        </div>
                        <p className='text-gray-300 mb-6 text-center'>
                            If an account exists for {email}, you will receive a password reset link shortly.
                        </p>
                    </>

                )}

            </div>
            <div className='px-8 py-4 bg-blue-950 bg-opacity-50 flex justify-center'>
                <p className='text-sm text-blue-400'>
                    <Link to={'/login'} className='text-blue-400 hover:underline font-bold inline-flex justify-center items-center gap-1'><ArrowLeft size={16} /> Back to Login</Link>
                </p>
            </div>
        </motion.div>

    )
}

export default ForgotPassword