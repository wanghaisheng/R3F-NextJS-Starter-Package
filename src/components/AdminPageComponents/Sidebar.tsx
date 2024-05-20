'use client'

import Image from 'next/image'
import { createContext, useState, useContext } from 'react'
import { CgMoreVertical } from 'react-icons/cg'
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from 'react-icons/md'

interface SidebarContextType {
  expanded: boolean
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <aside className='h-screen'>
      <nav className='fixed left-0 top-0 z-40 flex h-full flex-col bg-slate-950 shadow-sm'>
        <div className='mt-20 flex items-center justify-between p-4 pb-2'>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className='rounded-lg bg-purple-700 p-1.5 hover:bg-purple-900'
          >
            {!expanded ? <MdKeyboardDoubleArrowRight size={20} /> : <MdKeyboardDoubleArrowLeft size={20} />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className='flex-1 px-3'>{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert }) {
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
    >
      {icon}
      <span className={`overflow-hidden transition-all ${expanded ? 'ml-3 w-52' : 'w-0'}`}>{text}</span>

      {alert && <div className={`absolute right-2 size-2 rounded bg-indigo-400 ${expanded ? '' : 'top-2'}`} />}

      {!expanded && (
        <div
          className={`
          invisible absolute left-full ml-6 -translate-x-3 rounded-md
          bg-indigo-100 px-2 py-1
          text-sm text-indigo-800 opacity-20 transition-all
          group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}
