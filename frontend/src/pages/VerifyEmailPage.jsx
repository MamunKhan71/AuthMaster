import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Loader } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'
const VerifyEmailPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""])
    const inputRefs = useRef([])
    const navigate = useNavigate()
    const { error, isLoading, verifyEmail } = useAuthStore()
    const handleVerify = async (e) => {
        e.preventDefault()
        const verificationCode = code.join("")
        try {
            await verifyEmail(verificationCode)
            navigate('/')
            toast.success("Email Verified Successfully!")
        } catch (error) {
            
        }
    }
    const handleChange = (index, value) => {
        const newCode = [...code]
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("")
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || ""
            }
            setCode(newCode)
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "")
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5
            inputRefs.current[focusIndex].focus()
        } else {
            newCode[index] = value
            setCode(newCode)
            if (value && index < 5) {
                inputRefs.current[index + 1].focus()
            }
        }
    }
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus()
        }
    }
    useEffect(() => {
        if (code.every(digit => digit !== '')) {
            handleVerify(new Event('submit'))
        }
    }, [code])

    return (
        <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-gray-800 bg-opacity-50 p-8 max-w-md w-full backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-800 text-transparent bg-clip-text'>
                Verify Email
            </h2>
            <p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email address.</p>
            <form onSubmit={handleVerify}>
                <div className='flex justify-between'>
                    {
                        code.map((digit, index) => (
                            <input
                                key={index}
                                ref={e => (inputRefs.current[index] = e)}
                                type='text'
                                maxLength='6'
                                value={digit}
                                onChange={e => handleChange(index, e.target.value)}
                                onKeyDown={e => handleKeyDown(index, e)}
                                className='size-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-blue-800 rounded-lg focus:border-blue-400 focus:outline-none'
                            >

                            </input>
                        ))
                    }
                </div>
                {error && <p className='text-red-400 font-semibold text-xs mt-2 text-right'>{error}</p>}

                <motion.button disabled={isLoading || code.some((digit) => !digit)} type='submit' whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-900 transition duration-200'>
                    {isLoading ? "Verifying..." : "Verify Email"}
                </motion.button>
            </form>
        </motion.div>
    )
}

export default VerifyEmailPage