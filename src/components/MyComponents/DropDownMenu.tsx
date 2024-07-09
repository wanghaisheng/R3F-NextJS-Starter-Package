'use client'
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DropdownComponentProps {
  data: string[]
  onSelect: (selected: string) => void
  placeholder: string
  disabled: boolean
  value: string
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ data, onSelect, placeholder, disabled, value }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (item: string) => {
    setIsOpen(false)
    onSelect(item)
  }

  return (
    <div ref={dropdownRef}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex items-center justify-between whitespace-nowrap rounded-full border border-gray-300 bg-violet-400 px-4 py-2 text-left text-sm text-white shadow-sm transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
        disabled={disabled}
      >
        <p>{value || placeholder}</p>
        <span className='float-right'>▼</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='absolute left-0 top-16 z-20 grid w-full grid-cols-3 justify-center gap-4 overflow-auto rounded-2xl border border-gray-300 bg-white p-4 text-black shadow-lg'
          >
            {data.map((item) => (
              <motion.li
                key={item}
                whileHover={{ backgroundColor: '#f3f4f6' }}
                onClick={() => handleSelect(item)}
                className='flex h-32 cursor-pointer items-center justify-center rounded-lg border bg-gray-200 px-4 py-2'
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DropdownComponent
