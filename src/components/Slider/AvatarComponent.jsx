'use client'

import { FiChevronDown } from 'react-icons/fi'
import { AiOutlineRadarChart } from 'react-icons/ai'
import { FaChartPie, FaRegChartBar } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useState } from 'react'
import FormModal from '@/components/FormModal/Modal'

import { Avatar } from 'src/components/Avatar'

import {
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='flex flex-col gap-4 rounded-md bg-slate-900 p-4'>
        <p className='text-medium text-lg'>{label}</p>
        <p className='text-sm text-indigo-400'>
          <span className='ml-2'>{payload[0].payload.percentage}</span>%
        </p>
      </div>
    )
  }
}

export default function AvatarComponent() {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)

  const openCardModal = () => {
    setIsCardModalOpen(true)
  }

  const [open, setOpen] = useState(false)

  return (
    <div className='mx-20 flex items-center'>
      <div className='bg-[#F8F8F8]/7 flex h-screen w-fit rounded-[30px] border-4 border-[#2E2B3C] px-10 py-4'>
        <div className='flex flex-col'>
          <div className='flex justify-center text-7xl drop-shadow'>My Avatar</div>

          <Avatar
            modelSrc='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0'
            shadows
            animationSrc='/male-idle-3.fbx'
            style={{ background: 'rgb(9,20,26)' }}
            fov={40}
            cameraTarget={1.5}
            cameraInitialDistance={30}
            effects={{
              ambientOcclusion: true,
            }}
          />
          <div>Hello</div>
          <div>Hello</div>
          <div className='flex justify-end'>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='rounded-2xl border-2 p-2 text-white shadow-md '
              href='#'
            >
              Create New Avatar &emsp;&emsp; +
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  )
}

const Option = ({ text, Icon, setOpen }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => setOpen(false)}
      className='flex w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded-md p-2 text-xs font-medium text-slate-700 transition-colors hover:bg-indigo-100 hover:text-indigo-500'
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  )
}

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
}
