'use client'
import React, { useRef, ReactNode, useState } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar/Navbar'
import RightSideHud from '../GGHuds/RightSideHud'
import { SidebarProvider, useSidebar } from './SidebarProvider'
import { useLoadingState } from '@/components/CustomHooks/useLoadingState'
import Loading from '@/loading'
import UserProfileHud from '../GGHuds/UserProfileHud'
import StatusHud from '../GGHuds/StatusHud'
import { usePathname } from 'next/navigation'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)
  const { setIsSidebarOpen, showSignUp, setShowSignUp, showSignIn, setShowSignIn } = useSidebar()
  const isLoading = useLoadingState(1200)
  const [openSignIn, setOpenSignIn] = useState(false)

  const handleOpenSignIn = () => {
    setOpenSignIn(!openSignIn)
  }

  return (
    <div ref={ref}>
      {pathname !== '/slider' && (
        <RightSideHud
          openSignIn={openSignIn}
          setShowSignIn={setShowSignIn}
          setShowSignUp={setShowSignUp}
          showSignIn={showSignIn}
          showSignUp={showSignUp}
        />
      )}
      <Navbar
        handleOpenSignIn={handleOpenSignIn}
        setIsSidebarOpen={setIsSidebarOpen}
        setShowSignIn={setShowSignIn}
        setShowSignUp={setShowSignUp}
        showSignIn={showSignIn}
        showSignUp={showSignUp}
      />
      {isLoading && <Loading />}
      {children}

      {/* user profile and wallet info and status hud  */}
      {pathname !== '/' && pathname !== '/slider' && pathname !== '/hud' && (
        <>
          <div className='fixed bottom-8 right-16 z-40'>
            <UserProfileHud />
          </div>
          <StatusHud />
        </>
      )}
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
