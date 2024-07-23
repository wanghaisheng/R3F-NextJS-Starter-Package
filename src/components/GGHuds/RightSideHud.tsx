'use client'

import { useState } from 'react'
import { FaBell, FaBriefcase, FaStore, FaUserCircle, FaUsers } from 'react-icons/fa'

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

export default function RightSideHud() {
  const [selectedTab, setSelectedTab] = useState('Profile')

  const renderMobileViewContent = () => {
    switch (selectedTab) {
      case 'Profile':
        return <div>Profile Content</div>
      case 'Wallet':
        return <div>Wallet Content</div>
      case 'Shop':
        return <div>Shop Content</div>
      case 'Emergency':
        return <div>Emergency Content</div>
      case 'Notifications':
        return <div>Notifications Content</div>
      default:
        return null
    }
  }

  return (
    <>
      <div className='fixed right-[20px] top-1/2 z-50 flex w-[32px] -translate-y-1/2 flex-col items-center space-y-[6px] rounded-full bg-gray-200 px-[6px] py-[4px] shadow-lg shadow-black/50'>
        {tabs.map((tab, i) => (
          <div
            key={i}
            onClick={() => setSelectedTab(tab)}
            className={`flex size-[26px] items-center justify-center rounded-full bg-white shadow-black drop-shadow-lg hover:bg-blue-100 ${
              selectedTab === tab ? 'bg-blue-100' : ''
            }`}
          >
            {getIcon(tab)}
          </div>
        ))}
      </div>

      {selectedTab && (
        <div className='fixed right-[76px] top-1/2 z-40 h-[70%] w-[20%] -translate-y-1/2 rounded-md bg-white p-4 text-black shadow-lg shadow-black/50'>
          {renderMobileViewContent()}
        </div>
      )}
    </>
  )
}
