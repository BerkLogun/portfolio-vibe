'use client'

import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Scene from '../three/Scene'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col relative">
      <Scene />
      <Navbar />
      <main className="flex-grow pt-24 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout 