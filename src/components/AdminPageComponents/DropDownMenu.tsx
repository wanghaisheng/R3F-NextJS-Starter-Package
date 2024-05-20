'use client'

import { useState, useEffect, useRef } from 'react'
import { MdNavigateNext } from 'react-icons/md'

const DropdownMenu = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const eventListener = document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  return (
    <div className='relative' ref={dropdownRef}>
      <div
        className='flex cursor-pointer items-center gap-x-2 rounded p-2 text-gray-600 hover:bg-indigo-50'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <MdNavigateNext className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </div>
      {isOpen && <div className='absolute -top-36 left-20 z-50 flex flex-col rounded-lg bg-slate-950'>{children}</div>}
    </div>
  )
}

export default DropdownMenu
