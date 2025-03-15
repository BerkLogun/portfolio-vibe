'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const HeroSection = () => {
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current) return
      
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 20
      const y = (clientY / window.innerHeight - 0.5) * 20
      
      textRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
      <div className="container mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 
            ref={textRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          >
            Creative. Innovative. Artistic.
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
        >
          Bringing your ideas to life with cutting-edge web development and immersive 3D experiences.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link 
            href="/projects" 
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors duration-300"
          >
            View Projects
          </Link>
          <Link 
            href="/contact" 
            className="px-8 py-3 bg-transparent border border-white hover:bg-white/10 text-white rounded-full font-medium transition-colors duration-300"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col items-center"
        >
          <span className="text-gray-400 mb-2">Scroll to explore</span>
          <svg 
            className="w-6 h-6 text-gray-400 animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection 