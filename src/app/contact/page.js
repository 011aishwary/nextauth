'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';

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

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate loading
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
        setLoading(false);
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 px-4 text-white overflow-hidden relative">
      <Toaster position="top-center" reverseOrder={false} />
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        {/* Contact Info Section */}
        <motion.div variants={fadeInUp} className="flex flex-col justify-center">
            <h1 className="text-5xl font-extrabold mb-6">
              Let's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Talk
              </span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Have questions about SrtLinks? Need help with your account? 
              Or just want to say hi? We'd love to hear from you.
            </p>
            
            <div className="space-y-6">
                <div className="flex items-center gap-4 text-gray-300">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-blue-400 text-xl border border-white/10">
                        📧
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-semibold">Email Us</p>
                        <p className="text-lg font-medium">support@srtlinks.com</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4 text-gray-300">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-purple-400 text-xl border border-white/10">
                        📍
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-semibold">Location</p>
                        <p className="text-lg font-medium">Internet, Worldwide</p>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div variants={fadeInUp} className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="john@example.com"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all resize-none"
                        placeholder="How can we help you?"
                    ></textarea>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? 'Sending...' : 'Send Message'}
                </motion.button>
            </form>
        </motion.div>

      </motion.div>
    </div>
  )
}

export default ContactPage
