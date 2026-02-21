"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import axios from 'axios'



const Shorten = () => {
    const [url, seturl] = useState("")
    const [shorturl, setshorturl] = useState("")
    const [generated, setgenerated] = useState("")
    const [loading, setLoading] = useState(false)
    const [shortenLinks, setShortenLinks] = useState([])

    const getShortenLinks = async () => {
        try {
            const response = await axios.post("/api/users/shorten")
            console.log("Shorten Links Response:", response.data);
            if (response.data && response.data.error) {
                console.error("API returned error:", response.data.error);
                return;
            }
            setShortenLinks(response.data.urls || [])

        } catch (error) {
            console.log("Error fetching shorten links:", error.message)
            toast.error("Failed to fetch shorten links")
        }
    }
    useEffect(() => {
        getShortenLinks()
    }, [generated])

    const generate = () => {
        if (!url || !shorturl) {
            toast.error("Please fill all fields")
            return
        }

        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "url": url,
            "shorturl": shorturl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/users/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.success || result.message === "Link generated successfully") {
                    setgenerated(`${window.location.origin}/${shorturl}`)
                    seturl("")
                    setshorturl("")
                    toast.success("Link generated successfully!")
                } else {
                    toast.error(result.message || "Something went wrong")
                }
                setLoading(false)
            })
            .catch((error) => {
                console.error(error.message)
                toast.error("Failed to generate link")
                setLoading(false)
            });
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generated)
        toast.success("Copied to clipboard!")
    }

    return (
        <div className="min-h-screen p-4 pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start justify-center">

                {/* Left Column: Shorten Form */}
                <div className="flex flex-col items-center w-full ">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-lg bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
                    >
                        {/* Decorative background gradient */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>

                        <div className="text-center mb-8">
                            <h1 className='text-3xl font-bold text-white mb-2 bg-clip-text text-transarent bg-gradient-to-r from-blue-400 to-purple-500'>
                                Shorten Your
                                <span className="relative inline-block px-2">
                                    <span className="relative z-10">Link</span>
                                    <motion.span
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                        className="absolute inset-0 bg-black ml-1 px-2 -skew-x-12 origin-left rounded-sm"
                                    ></motion.span>
                                </span>
                            </h1>
                            <p className="text-gray-400 text-sm">Create a custom alias for your long URLs</p>
                        </div>

                        <div className='flex flex-col gap-5'>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-400">🔗</span>
                                </div>
                                <input
                                    className='w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500'
                                    type="text"
                                    placeholder='Paste your long URL here'
                                    value={url}
                                    onChange={e => { seturl(e.target.value) }}
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-400">✨</span>
                                </div>
                                <input
                                    className='w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-gray-500'
                                    type="text"
                                    placeholder='Custom alias (e.g. my-cool-link)'
                                    value={shorturl}
                                    onChange={e => { setshorturl(e.target.value) }}
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={generate}
                            disabled={loading}
                            className={`w-full mt-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all text-sm tracking-wide uppercase ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Generating...
                                </div>
                            ) : (
                                "Generate Short Link"
                            )}
                        </motion.button>

                        <AnimatePresence>
                            {generated && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                    animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                    className="bg-white/10 border border-white/10 rounded-xl p-4 overflow-hidden"
                                >
                                    <p className='text-xs text-gray-400 mb-2 font-medium uppercase'>Your Short Link</p>
                                    <div className="flex items-center justify-between gap-2 bg-black/30 rounded-lg p-3">
                                        <Link href={generated} target="_blank" className='text-blue-400 hover:text-blue-300 truncate font-mono text-sm'>
                                            {generated}
                                        </Link>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={copyToClipboard}
                                            className="p-2 text-gray-400 hover:text-white rounded-md hover:bg-white/10"
                                            title="Copy to clipboard"
                                        >
                                            📋
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Right Column: Your Links */}
                <div className="flex flex-col items-center w-full">
                    {shortenLinks.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="w-full max-w-lg bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden h-fit"
                        >
                             <div className="border-b border-white/10 pb-4 mb-4">
                                <h2 className="text-white text-xl font-bold flex items-center gap-2">
                                    <span className="text-purple-400">🔗</span> Your Recent Links
                                </h2>
                                <p className="text-gray-400 text-xs mt-1">Manage your shortened URLs</p>
                            </div>

                            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                {shortenLinks.map((link) => (
                                    <motion.div
                                        key={link._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-black/20 border border-white/5 rounded-lg p-3 hover:border-white/20 transition-all group"
                                    >
                                        <div className="flex justify-between items-center gap-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-purple-400 font-mono text-sm truncate block sm:inline">
                                                        {link.shorturl}
                                                    </span>
                                                    <span className="hidden sm:inline text-xs text-gray-500">•</span>
                                                    <span className="text-xs text-gray-400 truncate max-w-[150px] block sm:inline" title={link.url}>
                                                        {link.url}
                                                    </span>
                                                </div>
                                                <div className="mt-1 flex items-center gap-2">
                                                    <a
                                                        href={`/${link.shorturl}`}
                                                        target="_blank"
                                                        className="text-xs text-blue-400 hover:text-blue-300 hover:underline truncate"
                                                    >
                                                        {typeof window !== 'undefined' ? window.location.origin : ''}/{link.shorturl}
                                                    </a>

                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(`${window.location.origin}/${link.shorturl}`)
                                                    toast.success("Copied!")
                                                }}
                                                className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Copy Link"
                                            >
                                                📋
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <div className="hidden lg:flex w-full h-full min-h-[400px] items-center justify-center text-gray-500 border border-white/5 rounded-3xl bg-white/5 p-8">
                             <div className="text-center">
                                <span className="text-4xl mb-2 block">👋</span>
                                <p>No links generated yet</p>
                             </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Shorten
