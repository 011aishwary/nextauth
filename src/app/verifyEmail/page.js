'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { div } from 'framer-motion/client'

const VerifyPage = () => { // Changed component name to CapitalCase
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyUser", { token })
            setVerified(true)
            setLoading(false)
        } catch (error) {
            console.log("Token Error", error.response?.data)
            setError(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token');
        setToken(urlToken || "")
        if (!urlToken) setLoading(false)
    }, [])

    useEffect(() => {
        if (token.length > 0 && !verified) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl text-center"
            >
                {!verified &&(
                    <div className="">

                        <h1 className='text-3xl font-bold text-white mb-6 '>Check Your Email</h1>
                        <h2 className='text-xl bg-blue-500/80 rounded-lg font-medium text-white mb-6 '>Click on the verification link to  Verify Your Account</h2>
                    </div>
                )}

                {loading && !verified && !error && (
                    <div className="flex flex-col items-center gap-4 py-8">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-300">Verifying your email...</p>
                    </div>
                )}

                {verified && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-6"
                    >
                        <div className="text-6xl mb-4">✅</div>
                        <h2 className='text-2xl font-bold text-white mb-2'>Verified Successfully!</h2>
                        <p className="text-gray-400 mb-8">Your email has been verified. You can now login.</p>

                        <Link href="/login">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className='px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-blue-500/30 transition-all'
                            >
                                Continue to Login
                            </motion.button>
                        </Link>
                    </motion.div>
                )}

                {error && (
                    <div className="py-6">
                        <div className="text-6xl mb-4">❌</div>
                        <h2 className="text-xl font-bold text-red-400 mb-2">Verification Failed</h2>
                        <p className="text-gray-400">Invalid or expired token.</p>
                    </div>
                )}
            </motion.div>
        </div>
    )
}

export default VerifyPage
