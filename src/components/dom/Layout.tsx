'use client'
import React, { useRef, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar/Navbar'
import Hud from '@/components/Hud/Hud'
import RightSidebar2 from '../RightSidebarComponent/RightSidebar2'
import { SidebarProvider, useSidebar } from './SidebarProvider'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { isSidebarOpen, setIsSidebarOpen, showSignUp, setShowSignUp, showSignIn, setShowSignIn } = useSidebar()

  return (
    <div
      ref={ref}
      className='bg-black'
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        touchAction: 'auto',
        zIndex: 2,
      }}
    >
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setShowSignIn={setShowSignIn}
        setShowSignUp={setShowSignUp}
        showSignIn={showSignIn}
        showSignUp={showSignUp}
      />
      {children}
      <div>
        <RightSidebar2
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          setShowSignIn={setShowSignIn}
          setShowSignUp={setShowSignUp}
          showSignIn={showSignIn}
          showSignUp={showSignUp}
        />
      </div>
      <div className='absolute bottom-0 w-full'>
        <div className='flex justify-center'>
          <Hud />
        </div>
      </div>
    </div>
  )
}

const LayoutWithProvider: React.FC<LayoutProps> = ({ children }) => (
  <SidebarProvider>
    <Layout>{children}</Layout>
  </SidebarProvider>
)

export { LayoutWithProvider as Layout }
