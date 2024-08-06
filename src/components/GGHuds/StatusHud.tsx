'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

import { CiTimer } from 'react-icons/ci'
import { TiWeatherCloudy } from 'react-icons/ti'
import { FaCircle } from 'react-icons/fa'

const tabs = ['sm', 'sn', 'Time', 'Status', 'Weather']

const statuses = [
  { label: 'Online', color: 'green' },
  { label: 'Offline', color: 'black' },
  { label: 'Busy', color: 'red' },
  { label: 'Traveling', color: 'yellow' },
  { label: 'Meeting', color: 'blue' },
]

export default function StatusHud() {
  const [selectedTab, setSelectedTab] = useState('Time')
  const [currentStatus, setCurrentStatus] = useState(statuses[0])
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsStatusDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleTabClick = (tab) => {
    if (tab === selectedTab) {
      // If the tab is already selected minimize the view
      setSelectedTab('')
    } else {
      setSelectedTab(tab)
      if (tab === 'Status') {
        setIsStatusDropdownOpen(!isStatusDropdownOpen)
      } else {
        setIsStatusDropdownOpen(false)
      }
    }
  }

  const handleStatusSelect = (status: { label: string; color: string }) => {
    setCurrentStatus(status)
    setIsStatusDropdownOpen(false)
  }

  const getIcon = (tab) => {
    switch (tab) {
      case 'Time':
        return <CiTimer className='text-blue-500' size={17} />
      case 'Status':
        // eslint-disable-next-line tailwindcss/no-custom-classname
        return <FaCircle className={`text-${currentStatus.color}-500`} size={17} />
      case 'Weather':
        return <TiWeatherCloudy className='text-blue-500' size={17} />
      default:
        return null
    }
  }

  return (
    <div className='fixed bottom-[20px] left-[20px] z-40 flex h-[33px] select-none items-center space-x-[6px] rounded-full bg-gray-200 px-[4px] py-[6px] shadow-lg shadow-black/50'>
      {tabs.map((tab, i) => (
        <div
          key={i}
          onClick={() => handleTabClick(tab)}
          className={`flex size-[26px] items-center justify-center rounded-full shadow-black drop-shadow-lg hover:bg-blue-100 ${
            selectedTab === tab ? 'bg-blue-100' : 'bg-white'
          }`}
        >
          {getIcon(tab)}
        </div>
      ))}

      {/* <div className='size-full bg-yellow-400'>k</div> */}
      <AnimatePresence>
        {isStatusDropdownOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className='absolute -left-2 bottom-12 flex w-full flex-col items-center rounded-lg border border-white bg-white/40 p-2 shadow-lg shadow-black/40 backdrop-blur-md'
          >
            {statuses.map((status, index) => (
              <div
                key={index}
                className={`my-1 w-[100px] cursor-pointer rounded-full border-2 bg-white/90 py-1 text-center`}
                style={{ borderColor: status.color, color: status.color, opacity: 0.8 }}
                onClick={() => handleStatusSelect(status)}
              >
                {status.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
