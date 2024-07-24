'use client'

import { useEffect, useRef, useState } from 'react'
import { FaBell, FaBriefcase, FaStore, FaUserCircle, FaUsers, FaTimes } from 'react-icons/fa'
import ShopComponent from '../RightSidebarComponent/SubComponents/ShopComponent'
import SideProfile from '../RightSidebarComponent/Tabs/SideProfile'
import WalletComponent from '../RightSidebarComponent/SubComponents/WalletComponent'
import EmergencyComponent from '../RightSidebarComponent/SubComponents/EmergencyComponent'
import SidebarSearchComponent from '../RightSidebarComponent/SubComponents/SidebarSearchComponent'
import CustomToolTipLeftRight from '../MyComponents/CustomToolTipLeftRight'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

const tabs = ['Profile', 'Wallet', 'Shop', 'Emergency', 'Notifications']

const getIcon = (tab) => {
  switch (tab) {
    case 'Profile':
      return <FaUserCircle className='text-black' size={17} />
    case 'Wallet':
      return <FaBriefcase className='text-black' size={17} />
    case 'Shop':
      return <FaStore className='text-black' size={17} />
    case 'Emergency':
      return <FaUsers className='text-black' size={17} />
    case 'Notifications':
      return <FaBell className='text-black' size={17} />
    default:
      return null
  }
}

export default function RightSideHud({
  openSignIn,
  setShowSignIn,
  setShowSignUp,
  showSignIn,
  showSignUp,
}: {
  openSignIn: boolean
  setShowSignUp: any
  setShowSignIn: any
  showSignIn: any
  showSignUp: any
}) {
  const pathname = usePathname()
  const [selectedTabs, setSelectedTabs] = useState([])
  const [removingTab, setRemovingTab] = useState(null) // state to track tabs being removed
  const firstTabRef = useRef(null)

  // Handle tab click
  const handleTabClick = (tab) => {
    setSelectedTabs((prevTabs) => {
      if (prevTabs.includes(tab)) {
        setRemovingTab(tab) // Set the tab being removed
        setTimeout(() => setRemovingTab(null), 500) // Clear after animation
        return prevTabs.filter((t) => t !== tab)
      } else {
        if (prevTabs.length >= 4) {
          return [tab, ...prevTabs.slice(0, 3)]
        } else {
          return [tab, ...prevTabs]
        }
      }
    })
  }

  // Render mobile view content
  const renderMobileViewContent = (tab) => {
    switch (tab) {
      case 'Profile':
        return (
          <div className='flex size-full overflow-auto'>
            <SideProfile
              showSignUp={showSignUp}
              setShowSignUp={setShowSignUp}
              showSignIn={showSignIn}
              setShowSignIn={setShowSignIn}
              setActiveTab={tab}
            />
          </div>
        )
      case 'Wallet':
        return <WalletComponent setActiveTab={tab} setShowSignUp={setShowSignUp} />
      case 'Shop':
        return <ShopComponent />
      case 'Emergency':
        return <EmergencyComponent setActiveTab={tab} setShowSignUp={setShowSignUp} />
      case 'Notifications':
        return <SidebarSearchComponent />
      default:
        return null
    }
  }

  // Set selected tabs when openSignIn changes
  useEffect(() => {
    if (openSignIn) {
      setSelectedTabs(['Profile'])
    } else {
      setSelectedTabs([])
    }
  }, [openSignIn])

  // Focus the first tab when a tab is selected
  useEffect(() => {
    if (selectedTabs.length > 0 && firstTabRef.current) {
      firstTabRef.current.focus()
    }
  }, [selectedTabs])

  return (
    <>
      {/* Right side hud */}
      {pathname !== '/' && (
        <div className='fixed right-[20px] top-1/2 z-50 flex w-[33px] -translate-y-1/2 flex-col items-center space-y-[6px] rounded-full bg-gray-200 px-[6px] py-[4px] shadow-lg shadow-black/50'>
          {tabs.map((tab, i) => (
            <div
              key={i}
              onClick={() => handleTabClick(tab)}
              className={`group flex size-[26px] items-center justify-center rounded-full font-semibold shadow-black drop-shadow-lg hover:bg-blue-100 ${
                selectedTabs.includes(tab) ? 'bg-blue-400' : 'bg-white'
              }`}
            >
              {getIcon(tab)}
              <CustomToolTipLeftRight content={tab} top='0' left='-35' translateY='0' />
            </div>
          ))}
        </div>
      )}

      {/* Bg black for focus */}
      {selectedTabs.length > 0 && <div className='fixed inset-0 z-30 bg-black/50'></div>}

      {/* mobile views */}
      <div className='fixed right-[76px] top-1/2 z-40 flex h-[73%] -translate-y-1/2'>
        <LayoutGroup>
          <AnimatePresence mode='popLayout'>
            {selectedTabs.map((tab, index) => (
              <motion.div
                key={tab}
                ref={index === 0 ? firstTabRef : null}
                tabIndex={0}
                layout // Enable layout animations
                className='ml-4 h-full w-[300px] overflow-hidden rounded-md bg-white text-black shadow-lg shadow-black/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{
                  x: removingTab === tab ? -300 : 300,
                  opacity: 0,
                  transition: { duration: 0.3 },
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  duration: 0.5,
                }}
              >
                <div className='relative h-full p-4'>
                  <motion.button
                    className='absolute right-2 top-2 z-40 rounded-full bg-gray-200 p-1'
                    onClick={() => handleTabClick(tab)}
                    whileHover={{ rotate: 180, backgroundColor: '#d1d5db' }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaTimes size={14} />
                  </motion.button>
                  {renderMobileViewContent(tab)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </>
  )
}
