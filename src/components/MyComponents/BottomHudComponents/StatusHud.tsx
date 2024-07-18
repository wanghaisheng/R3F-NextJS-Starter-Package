'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const statuses = [
  { label: 'Online', color: 'green' },
  { label: 'Offline', color: 'black' },
  { label: 'Busy', color: 'red' },
  { label: 'Traveling', color: 'yellow' },
  { label: 'Meeting', color: 'blue' },
]

export default function StatusHud() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [currentStatus, setCurrentStatus] = useState(statuses[0])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (status: { label: string; color: string }) => {
    setIsOpen(false)
    setCurrentStatus(status)
  }

  return (
    <div className='relative cursor-pointer select-none'>
      <div
        className='mx-auto flex w-[82px] items-center justify-center rounded-full border bg-white/70 py-1 text-xs font-bold uppercase shadow-lg shadow-black/40 backdrop-blur-sm'
        onClick={() => setIsOpen(!isOpen)}
        style={{ borderColor: currentStatus.color, color: currentStatus.color }}
      >
        {currentStatus.label}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className='absolute -left-5 bottom-12 flex flex-col items-center rounded-lg border border-white bg-white/40 p-2 shadow-lg shadow-black/40 backdrop-blur-md '
          >
            {statuses.map((status, index) => (
              <div
                key={index}
                className={`my-1 w-[100px] cursor-pointer rounded-full border-2 bg-white/90 py-1 text-center `}
                style={{ borderColor: status.color, color: status.color, opacity: 0.8 }}
                onClick={() => handleSelect(status)}
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
