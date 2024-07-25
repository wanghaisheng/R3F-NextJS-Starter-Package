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
import { VscClearAll } from 'react-icons/vsc'

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

export default function RightSideHud({ openSignIn }: { openSignIn: boolean }) {
  const pathname = usePathname()
  const [selectedTabs, setSelectedTabs] = useState([])
  const [removingTab, setRemovingTab] = useState(null) // state to track tabs being removed
  const [showClearAll, setShowClearAll] = useState(false)
  const firstTabRef = useRef(null)

  // function to close all tabs
  const closeAllTabs = () => {
    setSelectedTabs([])
  }

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

  // Handle sign in click
  const handleSignInClick = () => {
    setSelectedTabs((prevTabs) => {
      if (prevTabs.includes('Profile')) {
        return prevTabs
      } else {
        if (prevTabs.length >= 4) {
          return ['Profile', ...prevTabs.slice(0, 3)]
        } else {
          return ['Profile', ...prevTabs]
        }
      }
    })
  }

  // Render mobile view content
  const renderMobileViewContent = (tab) => {
    switch (tab) {
      case 'Profile':
        return <SideProfile />
      case 'Wallet':
        return <WalletComponent onSignInClick={handleSignInClick} />
      case 'Shop':
        return <ShopComponent />
      case 'Emergency':
        return <EmergencyComponent onSignInClick={handleSignInClick} />

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

  // Show clear all button after 1.5 seconds
  useEffect(() => {
    let timer
    if (selectedTabs.length > 0) {
      timer = setTimeout(() => {
        setShowClearAll(true)
      }, 300) // 0.3 seconds delay
    } else {
      setShowClearAll(false)
    }

    return () => clearTimeout(timer)
  }, [selectedTabs])

  return (
    <>
      {/* Right side hud */}
      {pathname !== '/' && (
        <>
          <motion.div
            layout
            className='fixed right-[20px] top-1/2 z-50 flex w-[33px] -translate-y-1/2 select-none flex-col items-center space-y-[6px] rounded-full bg-gray-200 px-[6px] py-[4px] shadow-lg shadow-black/50 transition-all duration-300 ease-in-out'
          >
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
            <AnimatePresence>
              {showClearAll && selectedTabs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.3 }}
                  className='group absolute -bottom-8 right-1 flex size-[26px] items-center justify-center rounded-full bg-white font-semibold text-black shadow-black drop-shadow-lg hover:bg-blue-100'
                  onClick={closeAllTabs}
                >
                  <VscClearAll size={17} />
                  <CustomToolTipLeftRight content='Clear All' top='0' left='-35' translateY='0' />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
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
                className='relative ml-4 h-full w-[306px] overflow-hidden rounded-md bg-custom-gradient-purple p-2 text-black shadow-lg shadow-black/50 backdrop-blur-lg focus:outline-none focus:ring-4 focus:ring-blue-500'
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
                {/* minimize button */}
                <motion.button
                  className='absolute right-1 top-1 z-40 rounded-full bg-gray-200 p-1'
                  onClick={() => handleTabClick(tab)}
                  whileHover={{ rotate: 180, backgroundColor: '#d1d5db' }}
                  transition={{ duration: 0.3 }}
                >
                  <FaTimes size={14} />
                </motion.button>

                {/* content */}
                <div className='size-full'>{renderMobileViewContent(tab)}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </>
  )
}
