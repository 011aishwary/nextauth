"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-white overflow-x-hidden">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center min-h-[90vh] px-4 py-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl"
          >
            Shorten Your Links, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Expand Your Reach
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Transform long, ugly links into short, memorable ones. Track clicks, analyze data, and manage your brand with our secure and powerful URL shortener.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/shorten">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                Get Started Free
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg rounded-full transition-all"
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black/30 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: "1000+", label: "Links Shortened" },
              { number: "50+", label: "Happy Users" },
              { number: "99.9%", label: "Uptime" },
              { number: "0.2s", label: "Redirect Speed" }
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <h3 className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">{stat.number}</h3>
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto lg:px-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-center mb-16 relative w-fit mx-auto"
          >
            Why Choose Us?
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "circOut" }}
              viewport={{ once: false }}
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-center rounded-full"
            ></motion.span>
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: "🚀",
                title: "Fast & Secure",
                desc: "Lightning fast redirection with top-tier security standards to protect your users."
              },
              {
                icon: "📊",
                title: "Detailed Analytics",
                desc: "Track clicks, locations, and devices in real-time with our powerful dashboard."
              },
              {
                icon: "✨",
                title: "Custom Aliases",
                desc: "Create branded links that people trust and remember. Boost your click-through rates."
              },
              {
                icon: "📱",
                title: "Mobile Friendly",
                desc: "Manage your links on the go with our fully responsive design."
              },
              {
                icon: "🛡️",
                title: "Malware Protection",
                desc: "We scan every link to ensure your users stay safe from phishing and malware."
              },
              {
                icon: "🌐",
                title: "Global CDN",
                desc: "Your links work fast anywhere in the world thanks to our global network."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-colors"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-black/20 px-12">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-center mb-16 relative w-fit mx-auto group"
          >
            How It Works
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
          </motion.h2>

          <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[28%] left-0 w-full h-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 -z-10"></div>

            {[
              { step: "1", title: "Paste Your Link", desc: "Enter your long URL into our shortener." },
              { step: "2", title: "Shorten It", desc: "Click the button to generate a short link instantly." },
              { step: "3", title: "Share & Track", desc: "Copy your new link and watch the clicks roll in." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center text-center max-w-xs"
              >
                <div className="py-10">

                  <div className="w-16 h-16  rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold mb-6 shadow-xl shadow-purple-500/20">
                    {item.step}
                  </div>
                </div>
                <div className="flex flex-col items-center text-center min-h-20">

                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-5xl font-bold text-center mb-12"
          >
            Frequently Asked

            <span className="relative inline-block px-2">
              <span className="relative z-10">Questions</span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 bg-black ml-1 -skew-x-12 origin-left rounded-sm"
              ></motion.span>
            </span>
          </motion.h2>

          <div className="space-y-6">
            {[
              { q: "Is it free?", a: "Yes! You can shorten links for free. Sign up for more features like analytics and custom aliases." },
              { q: "Do links expire?", a: "Free links are permanent. They do not expire as long as they comply with our terms of service." },
              { q: "Can I customize my link?", a: "Absolutely. Once you create an account, you can create custom aliases for your links." }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.01 }}
              >
                <h3 className="text-xl font-bold mb-2 text-blue-300">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 rounded-3xl p-12 backdrop-blur-md"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-gray-300 mb-10">Sign up today and take control of your links.</p>
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-200 transition-colors"
            >
              Start Shortening Now
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} SrtLinks. All rights reserved.</p>
      </footer>

    </div>
  );
}

