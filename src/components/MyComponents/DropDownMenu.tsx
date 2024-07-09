'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DropdownComponent({ data, onSelect, placeholder, disabled }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (item) => {
    setSelectedItem(item)
    setIsOpen(false)
    onSelect(item)
  }

  return (
    <div className='relative mb-4 w-64' ref={dropdownRef}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full rounded-md border border-gray-300 bg-white p-2 text-left shadow-sm transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
        disabled={disabled}
      >
        <p
          className={`bg-white transition-all duration-300 ease-in-out ${selectedItem ? 'absolute left-4 top-[-8px] text-[10px]' : 'text-sm'}`}
        >
          {placeholder}
        </p>
        {selectedItem}
        <span className='float-right'>▼</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg'
          >
            {data.map((item) => (
              <motion.li
                key={item}
                whileHover={{ backgroundColor: '#f3f4f6' }}
                onClick={() => handleSelect(item)}
                className='cursor-pointer px-4 py-2 hover:bg-gray-100'
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
