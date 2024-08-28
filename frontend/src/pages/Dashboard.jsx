import React from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import { formatDate } from '../utils/date'
const Dashboard = () => {
  const { user, logout } = useAuthStore()
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full rounded-lg mx-auto mt-10 p-8 bg-blue-950 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-2xl border border-blue-800'
    >
      <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-800 text-transparent bg-clip-text'>
        Dashboard
      </h2>
      <div className='space-y-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className='p-4 bg-blue-800 bg-opacity-50 rounded-lg border border-blue-700'
        >
          <h3 className='text-xl font-semibold text-blue-400 mb-3'>Profile Information</h3>
          <p className='text-gray-300'>Name: {user.name}</p>
          <p className='text-gray-300'>Email: {user.email}</p>
        </motion.div>
        <motion.div
          className='p-4 bg-blue-900 bg-opacity-50 rounded-lg border border-blue-700'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className='text-xl font-bold mb-3 text-blue-400'>Account Activity</h3>
          <p className='text-gray-300'>
            <span className='font-bold'>Joined: </span>
            {new Date(user.createdAt).toDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </p>
          <p className='text-gray-300'>
            <span className='font-bold'>Last Login: </span>
            {formatDate(user.lastLogin)}
          </p>

        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='mt-4'
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className='w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-800 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-900
          '
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard