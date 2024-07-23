'use client'

import { useState } from 'react'
import { FaBell, FaBriefcase, FaStore, FaUserCircle, FaUsers, FaTimes, FaExpand } from 'react-icons/fa'
import ShopComponent from '../RightSidebarComponent/SubComponents/ShopComponent'
import SideProfile from '../RightSidebarComponent/Tabs/SideProfile'
import WalletComponent from '../RightSidebarComponent/SubComponents/WalletComponent'
import EmergencyComponent from '../RightSidebarComponent/SubComponents/EmergencyComponent'
import SidebarSearchComponent from '../RightSidebarComponent/SubComponents/SidebarSearchComponent'

const tabs = ['Profile', 'Wallet', 'Shop', 'Emergency', 'Notifications']

const getIcon = (tab) => {
  switch (tab) {
    case 'Profile':
      return <FaUserCircle className='text-blue-500' size={17} />
    case 'Wallet':
      return <FaBriefcase className='text-blue-500' size={17} />
    case 'Shop':
      return <FaStore className='text-blue-500' size={17} />
    case 'Emergency':
      return <FaUsers className='text-blue-500' size={17} />
    case 'Notifications':
      return <FaBell className='text-blue-500' size={17} />
    default:
      return null
  }
}

export default function RightSideHud({
  setShowSignIn,
  setShowSignUp,
  showSignIn,
  showSignUp,
}: {
  setShowSignUp: any
  setShowSignIn: any
  showSignIn: any
  showSignUp: any
}) {
  const [selectedTab, setSelectedTab] = useState('Profile')

  const [isMobileViewVisible, setIsMobileViewVisible] = useState(false)

  const renderMobileViewContent = () => {
    switch (selectedTab) {
      case 'Profile':
        return (
          <div className='flex size-full overflow-auto'>
            <SideProfile
              showSignUp={showSignUp}
              setShowSignUp={setShowSignUp}
              showSignIn={showSignIn}
              setShowSignIn={setShowSignIn}
              setActiveTab={selectedTab}
            />
          </div>
        )
      case 'Wallet':
        return <WalletComponent setActiveTab={selectedTab} setShowSignUp={setShowSignUp} />
      case 'Shop':
        return <ShopComponent />
      case 'Emergency':
        return <EmergencyComponent setActiveTab={selectedTab} setShowSignUp={setShowSignUp} />
      case 'Notifications':
        return <SidebarSearchComponent />
      default:
        return null
    }
  }

  // Handle tab click
  const handleTabClick = (tab) => {
    if (tab === selectedTab) {
      // If the tab is already selected minimize the view
      setIsMobileViewVisible(!isMobileViewVisible)
    } else {
      setSelectedTab(tab)
      setIsMobileViewVisible(true)
    }
  }

  const toggleMobileView = () => {
    setIsMobileViewVisible(!isMobileViewVisible)
  }

  return (
    <>
      <div className='fixed right-[20px] top-1/2 z-50 flex w-[32px] -translate-y-1/2 flex-col items-center space-y-[6px] rounded-full bg-gray-200 px-[6px] py-[4px] shadow-lg shadow-black/50'>
        {tabs.map((tab, i) => (
          <div
            key={i}
            onClick={() => handleTabClick(tab)}
            className={`flex size-[26px] items-center justify-center rounded-full bg-white shadow-black drop-shadow-lg hover:bg-blue-100 ${
              selectedTab === tab && isMobileViewVisible ? 'bg-blue-100' : ''
            }`}
          >
            {getIcon(tab)}
          </div>
        ))}
      </div>

      <div
        className={`fixed right-[76px] top-1/2 z-40 h-[73%] w-[20%] -translate-y-1/2 overflow-hidden rounded-md bg-white text-black shadow-lg shadow-black/50 transition-all duration-500 ease-in-out ${
          isMobileViewVisible ? ' translate-x-0 scale-100 opacity-100' : 'translate-x-full scale-0 opacity-0'
        }`}
      >
        <div
          className='absolute inset-0 p-4 transition-all duration-500 ease-in-out'
          style={{
            transform: isMobileViewVisible ? 'translateY(0)' : 'translateY(-100%)',
            opacity: isMobileViewVisible ? 1 : 0,
          }}
        >
          <button
            className='absolute right-2  top-2 z-40 rounded-full bg-gray-200 p-1 transition-transform duration-300 ease-in-out hover:rotate-180 hover:bg-gray-300'
            onClick={toggleMobileView}
          >
            <FaTimes size={14} />
          </button>
          {renderMobileViewContent()}
        </div>
      </div>
    </>
  )
}
