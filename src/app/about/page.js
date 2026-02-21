
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 px-4 mt-10 text-white overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-4xl w-full"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-6xl font-extrabold mb-8 text-center"
        >
          About{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            SrtLinks
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-lg md:text-xl text-gray-300 mb-12 text-center leading-relaxed"
        >
          SrtLinks is a powerful and easy-to-use URL shortener built to help you manage your links efficiently. 
          Whether you're a content creator, a business, or just sharing something with friends, 
          we make your links short, memorable, and trackable.
        </motion.p>

        <motion.div
            variants={fadeInUp} 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors">
                <h3 className="text-2xl font-bold mb-3 text-blue-400">⚡ Fast & Reliable</h3>
                <p className="text-gray-400">Lightning fast redirects ensuring your audience gets to your content without delay.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-colors">
                <h3 className="text-2xl font-bold mb-3 text-purple-400">🔒 Secure</h3>
                <p className="text-gray-400">Built with modern security standards to keep your data and your users safe.</p>
            </div>
             <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-colors">
                <h3 className="text-2xl font-bold mb-3 text-pink-400">📊 Analytics</h3>
                <p className="text-gray-400">Track clicks and understand your audience better with detailed link analytics.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 hover:border-teal-500/50 transition-colors">
                <h3 className="text-2xl font-bold mb-3 text-teal-400">🎨 Custom Aliases</h3>
                <p className="text-gray-400">Create personalized efficient links that reflect your brand identity.</p>
            </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="text-center">
             <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
             <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 rounded-full font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
                >
                  Create Your First Link
                </motion.button>
             </Link>
        </motion.div>

      </motion.div>
    </div>
  )
}

export default AboutPage
