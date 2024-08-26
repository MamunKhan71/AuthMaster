import React from 'react'
import { motion } from 'framer-motion'
const LoadingSpinner = () => {
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-700 via-gray-950 to-blue-950 flex items-center justify-center relative overflow-hidden'>
            <div class="flex gap-2">
                <div class="w-3 h-3 rounded-full animate-pulse bg-blue-600"></div>
                <div class="w-3 h-3 rounded-full animate-pulse bg-blue-600"></div>
                <div class="w-3 h-3 rounded-full animate-pulse bg-blue-600"></div>
            </div>
        </div>
    )
}

export default LoadingSpinner