import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '../components/Input'
import { User, Mail, Lock, Loader } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'
import { useAuthStore } from '../../store/authStore'
const SignUpPage = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signup, error, isLoading } = useAuthStore()
    const navigate = useNavigate()
    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            await signup(email, password, name)
            navigate('/verify-email')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-800 text-transparent bg-clip-text'>
                    Create Account
                </h2>
                <form onSubmit={handleSignUp}>
                    <Input icon={User} type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
                    <Input icon={Mail} type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
                    <Input icon={Lock} type="text" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    {error && <p className='text-red-400 font-semibold text-xs mt-2 text-right'>{error}</p>}
                    {/* password strength */}
                    <PasswordStrengthMeter password={password} />
                    <motion.button disabled={isLoading} type='submit' whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-900 transition duration-200'>
                        {isLoading ? <Loader className='mx-auto animate-spin' size={24} /> : "Sign Up"}
                    </motion.button>
                </form>
            </div>
            <div className='px-8 py-4 bg-blue-950 bg-opacity-50 flex justify-center'>
                <p className='text-sm text-blue-400'>
                    Already have an account? {" "}
                    <Link to={'/login'} className='text-blue-400 hover:underline font-bold'>Login</Link>
                </p>
            </div>
        </motion.div>
    )
}

export default SignUpPage