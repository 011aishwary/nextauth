'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

const login = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        "email": "",
        "password": ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            await axios.post("/api/users/login", user).then(response => {
                setSuccess(true)
                setError("")
                toast.success("Login Successful")
                router.push("/profile")
                console.log(response);
            })
                .catch(error => {
                    setSuccess(false)
                    setError(error.response.data.error)
                    toast.error(error.response.data.error)
                    console.error('Error fetching data:', error.response.data.error)

                });
            
            setLoading(false)

        } catch (error) {
            console.log("Login Failed")
            toast.error(error.message)
            setLoading(false)
        }

    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }


    }, [user])


    return (
        <div className="flex flex-col justify-center min-h-screen p-4 items-center ">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl"
            >
                <div className="text-center mb-0">
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-gray-400">Please sign in to your account</p>
                </div>

                <div className="mb-4 text-center min-h-[24px]">
                     {error && <span className="text-red-400 text-sm bg-red-400/10 px-3 py-1 rounded-full border border-red-400/20">{error}</span>}
                </div>

                <form onSubmit={onLogin} className="space-y-6">
                    <div>
                        <label htmlFor='email' className="text-gray-300 text-sm font-medium mb-2 block">Email Address</label>
                        <input 
                            name="email" 
                            type="text" 
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500" 
                            placeholder="Enter your email" 
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className="text-gray-300 text-sm font-medium mb-2 block">Password</label>
                        <input 
                            name="password" 
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500" 
                            placeholder="Enter your password" 
                        />
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={buttonDisabled || loading}
                        type="submit" 
                        className={`w-full py-3 px-4 text-sm font-bold rounded-lg text-white transition-all duration-300 
                            ${buttonDisabled || loading 
                                ? "bg-gray-600 cursor-not-allowed opacity-50" 
                                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/30"
                            }`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Processing...
                            </div>
                        ) : "Sign In"}
                    </motion.button>
                </form>

                <p className="text-gray-400 text-sm mt-8 text-center">
                    Don't have an account? 
                    <Link href="/signup" className="text-blue-400 font-medium hover:text-blue-300 ml-1 transition-colors">
                        Sign up here
                    </Link>
                </p>
            </motion.div>
        </div>
    )
}




export default login
