'use client'
import React, { useRef, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar/Navbar'
const RightSidebar2 = dynamic(() => import('@/components/RightSidebarComponent/RightSidebar2'), { ssr: false })
import { SidebarProvider, useSidebar } from './SidebarProvider'
import { useLoadingState } from '@/components/CustomHooks/useLoadingState'
import Loading from '@/loading'
import UserProfileHud from '../MyComponents/BottomHudComponents/UserProfileHud'
import StatusHud from '../MyComponents/BottomHudComponents/StatusHud'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { isSidebarOpen, setIsSidebarOpen, showSignUp, setShowSignUp, showSignIn, setShowSignIn } = useSidebar()
  const isLoading = useLoadingState(1200)

  return (
    <div ref={ref}>
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setShowSignIn={setShowSignIn}
        setShowSignUp={setShowSignUp}
        showSignIn={showSignIn}
        showSignUp={showSignUp}
      />
      {isLoading && <Loading />}
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

      {/* user profile and wallet info */}
      <div className='fixed bottom-8 right-16 z-40'>
        <UserProfileHud
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          setShowSignIn={setShowSignIn}
          setShowSignUp={setShowSignUp}
          showSignIn={showSignIn}
          showSignUp={showSignUp}
        />
      </div>

      {/* status hud */}
      <div className={`fixed bottom-8 left-1/3 z-50`}>
        <StatusHud />
      </div>
    </div>
  )
}

const LayoutWithProvider: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <Layout>{children}</Layout>
    </SidebarProvider>
  )
}

export { LayoutWithProvider as Layout }
