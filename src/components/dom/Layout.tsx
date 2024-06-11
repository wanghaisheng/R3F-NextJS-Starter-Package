'use client'

import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import StarsCanvas from '@/components/StarsCanvas/StarBackground'
import Navbar from '@/components/Navbar/Navbar'
import Hud from '@/components/Hud/Hud'
import RightSidebar2 from '../RightSidebarComponent/RightSidebar2'

import PurpleVoid from '@/components/PurpleVoid/PurpleVoid'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const Layout = ({ children }) => {
  const ref = useRef()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [showSignUp, setShowSignUp] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)

  return (
    <div
      ref={ref}
      className='bg-black'
      style={{
        position: 'relative',
        width: ' 100%',
        height: '100%',
        overflow: 'auto',
        touchAction: 'auto',
        zIndex: '2',
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
      {/* <StarsCanvas />
      <PurpleVoid /> */}
      {children}
      {/* <Scene
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
        eventSource={ref}
        eventPrefix='client'
      /> */}

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

      <div className='absolute bottom-0 w-full '>
        <div className='flex justify-center'>
          <Hud />
        </div>
      </div>
    </div>
  )
}

export { Layout }
