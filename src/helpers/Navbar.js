"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Shorten", href: "/shorten" },
    { name: "Contact Us", href: "/contact" },
  ]

  return (
    <nav className='h-16 bg-[#252525]/80 backdrop-blur-md border-b border-white/10 fixed w-full z-50 top-0 left-0 px-6 sm:px-12 flex justify-between items-center text-white'>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="logo font-extrabold text-2xl tracking-wider cursor-pointer"
          onClick={() => router.push('/')}
        >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Srt</span>Links
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex justify-center gap-8 items-center">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <motion.li 
                  whileHover={{ scale: 1.1, color: "#60a5fa" }}
                  whileTap={{ scale: 0.95 }}
                  className="font-medium relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
                </motion.li>
              </Link>
            ))}
            
            <li className='flex gap-4 ml-4'>
                <Link href="/shorten">
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
                    whileTap={{ scale: 0.95 }}
                    className='bg-blue-600 px-5 py-2 font-bold rounded-full text-sm shadow-lg shadow-blue-500/30 transition-colors'
                  > 
                    Try Me
                  </motion.button>
                </Link>
                <Link href="/github">
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: "#333" }}
                    whileTap={{ scale: 0.95 }}
                    className='bg-black border border-white/20 px-5 py-2 font-bold rounded-full text-sm hover:border-white/50 transition-colors' 
                  >
                    GitHub
                  </motion.button>
                </Link>
            </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-16 left-0 w-full bg-[#252525] border-b border-white/10 md:hidden overflow-hidden"
            >
              <ul className="flex flex-col items-center gap-6 py-8">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
                    <motion.li 
                      whileHover={{ scale: 1.1 }}
                      className="font-medium text-lg"
                    >
                      {link.name}
                    </motion.li>
                  </Link>
                ))}
                <div className="flex flex-col gap-4 mt-2 w-full px-8">
                  <Link href="/shorten" onClick={() => setIsOpen(false)}>
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      className='bg-blue-600 w-full py-3 font-bold rounded-full shadow-lg'
                    > 
                      Try Me
                    </motion.button>
                  </Link>
                  <Link href="/github" onClick={() => setIsOpen(false)}>
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      className='bg-black border border-white/20 w-full py-3 font-bold rounded-full' 
                    >
                      GitHub
                    </motion.button>
                  </Link>
                </div>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
    </nav>
  )
}

export default Navbar
