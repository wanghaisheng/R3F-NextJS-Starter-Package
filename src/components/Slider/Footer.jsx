'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const tabs = ['Home', 'Cards', 'Map', 'Profile', 'Avatar', 'Security']

const ChipTabs = () => {
  const [selected, setSelected] = useState(tabs[0])

  return (
    <div className='flex justify-center'>
      <div className='my-7 flex h-12 w-fit items-center justify-center gap-2 rounded-full border-x-2 border-[#6B37CA] bg-[#D1CACA]/20 p-6 shadow-md  shadow-[#6B37CA] backdrop-blur-md md:gap-7'>
        {tabs.map((tab) => (
          <Chip text={tab} selected={selected === tab} setSelected={setSelected} key={tab} />
        ))}
      </div>
    </div>
  )
}

const Chip = ({ text, selected, setSelected }) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected ? 'text-white' : 'text-slate-200 hover:bg-slate-700 hover:text-slate-200'
      } relative rounded-md px-2.5 py-0.5 text-sm transition-colors`}
    >
      <span className='relative z-10 pt-4'>{text}</span>
      {selected && (
        <motion.span
          layoutId='pill-tab'
          transition={{ type: 'spring', duration: 0.5 }}
          className='absolute inset-0 z-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600'
        ></motion.span>
      )}
    </button>
  )
}

export default ChipTabs
