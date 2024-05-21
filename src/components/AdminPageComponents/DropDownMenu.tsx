'use client'

import { useState, useEffect, useRef, cloneElement } from 'react'
import { MdNavigateNext } from 'react-icons/md'

const DropdownMenu = ({ title, selectedItem, onSelectItem, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  return (
    <div className='relative' ref={dropdownRef}>
      <div
        className='flex cursor-pointer items-center justify-between rounded p-2 text-gray-600 hover:bg-indigo-50'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedItem ? selectedItem.icon : title}</span>
        <MdNavigateNext className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <div className='absolute -top-36 left-16 z-50 flex flex-col rounded-lg bg-slate-950'>
          {children.map((child, index) =>
            cloneElement(child, {
              key: index,
              onClick: () => {
                onSelectItem(child.props.icon, child.props.text)
                setIsOpen(false)
              },
            }),
          )}
        </div>
      )}
    </div>
  )
}

export default DropdownMenu
