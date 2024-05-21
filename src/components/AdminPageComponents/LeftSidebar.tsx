'use client'

import Image from 'next/image'
import { createContext, useState, useContext } from 'react'
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from 'react-icons/md'

interface SidebarContextType {
  expanded: boolean
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export default function LeftSidebar({ children }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <aside className='h-full'>
      <nav className='flex h-full flex-col bg-slate-950 shadow-sm'>
        <div className='flex items-center justify-between p-4 pb-2'>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className='rounded-lg bg-purple-700 p-1.5 hover:bg-purple-900'
          >
            {!expanded ? <MdKeyboardDoubleArrowRight size={20} /> : <MdKeyboardDoubleArrowLeft size={20} />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className='flex-1 px-2'>{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  )
}

export function LeftSidebarItem({ icon, text, active, alert, onClick }) {
  const { expanded } = useContext(SidebarContext)
  return (
    <li
      className={`
        group relative my-1 flex cursor-pointer items-center
        rounded-md px-3 py-2
        font-medium transition-colors
        ${
          active
            ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
            : 'text-gray-600 hover:bg-indigo-50'
        }
    `}
      onClick={onClick}
    >
      {icon}
      <span className={`overflow-hidden whitespace-nowrap transition-all ${expanded ? 'ml-3 w-44' : 'w-0'}`}>
        {text}
      </span>

      {alert && <div className={`absolute right-2 size-2 rounded bg-indigo-400 ${expanded ? '' : 'top-2'}`} />}

      {!expanded && (
        <div
          className={`
          invisible absolute left-full ml-6 -translate-x-3
          whitespace-nowrap rounded-md bg-indigo-100 px-2
          py-1 text-sm text-indigo-800 opacity-20
          transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}
