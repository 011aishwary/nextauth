'use client'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Profile = () => { // Changed to CapitalCase
  const router = useRouter()
  const [data, setData] = useState(null)
  
  const getUserDetails = async ()=>{
    try {
      const res = await axios.post("/api/users/me")
      console.log(res.data.data._id)
      setData(res.data.data._id)
      toast.success("User Details Fetched")
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  const logout = async ()=>{
    try {
      await axios.get("/api/users/logout")
      toast.success("Logout Success")
      router.push("/login")
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        
        <div className="text-center mb-8">
            <h1 className='text-3xl font-bold text-white mb-2'>User Profile</h1>
            <p className="text-gray-400">Manage your account details</p>
        </div>

        <div className="bg-black/20 rounded-xl p-6 mb-8 text-center border border-white/5">
            <p className="text-sm text-gray-400 mb-2">User ID</p>
            <h2 className="text-xl font-mono text-blue-300 break-all">
                {data ? (
                    <Link href={`/profile/${data}`} className="hover:text-blue-200 transition-colors">
                        {data}
                    </Link>
                ) : (
                    "Not Loaded" 
                )}
            </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={getUserDetails} 
                className='px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg hover:shadow-green-500/30 transition-all flex-1'
            >
                Get User ID
            </motion.button>
            
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout} 
                className='px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg hover:shadow-red-500/30 transition-all flex-1'
            >
                Logout
            </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default Profile
