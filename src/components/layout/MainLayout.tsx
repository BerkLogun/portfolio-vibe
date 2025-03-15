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
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Scene />
      <Navbar />
      <main className="flex-grow pt-24">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout 