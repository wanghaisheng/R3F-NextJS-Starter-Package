'use client'

import LineComponent from '@/components/charts/LineChart'
import AreaChartComponent from '@/components/charts/AreaChart'
import BubbleChartComponent from '@/components/charts/BubbleChart'
import PieChartComponent from '@/components/charts/PieChart'
import RadarChartComponent from '@/components/charts/RadarChartComparision'
import DonutComponent from '@/components/charts/DonutChart'
import SkillsRadarComponent from '@/components/charts/SkillsRadarChart'

import { DndContext } from '@dnd-kit/core'

import { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { MdSpaceDashboard } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { FaCalendarCheck } from 'react-icons/fa'
import { IoIosSettings } from 'react-icons/io'
import { FaRegChartBar } from 'react-icons/fa'

//icons
import { FaTasks } from 'react-icons/fa'
import { FaRegClock } from 'react-icons/fa6'
import { MdTask } from 'react-icons/md'

function SideNav({ selected, setSelected }) {
  return (
    <nav className='top-20 flex size-fit w-[20%] flex-col gap-2 rounded-xl bg-slate-950/40 p-4'>
      <NavItem selected={selected === 0} id={0} setSelected={setSelected}>
        <div className='flex items-center justify-between'>
          <MdSpaceDashboard />
          <p>Dashboard</p>
        </div>
      </NavItem>
      <NavItem selected={selected === 1} id={1} setSelected={setSelected}>
        <div className='flex items-center justify-between'>
          <FaCalendarCheck />
          <p>Calendar</p>
        </div>
      </NavItem>
      <NavItem selected={selected === 2} id={2} setSelected={setSelected}>
        <div className='flex items-center justify-between'>
          <CgProfile />
          <p>Profile</p>
        </div>
      </NavItem>
      <NavItem selected={selected === 3} id={3} setSelected={setSelected}>
        <div className='flex items-center justify-between'>
          <IoIosSettings />
          <p>Settings</p>
        </div>
      </NavItem>
      <NavItem selected={selected === 4} id={4} setSelected={setSelected}>
        <div className='flex items-center justify-between'>
          <FaRegChartBar />
          <p>Chart</p>
        </div>
      </NavItem>
    </nav>
  )
}

const NavItem = ({ children, selected, id, setSelected }) => {
  return (
    <motion.button
      className='relative rounded-md bg-slate-800 p-3 text-xl transition-colors hover:bg-slate-700'
      onClick={() => setSelected(id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className='relative z-10 block'>{children}</span>
      <AnimatePresence>
        {selected && (
          <motion.span
            className='absolute inset-0 z-0 rounded-md bg-indigo-600'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          ></motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

const AdminDashboard = () => {
  const [selected, setSelected] = useState(0)
  return (
    <DndContext>
      <div className='flex bg-slate-900/20 text-slate-100'>
        <SideNav selected={selected} setSelected={setSelected} />
        {selected === 0 ? (
          <div className='mx-4 size-full'>
            <div className='my-4 h-[35px] rounded'>Welcome, Admin</div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4'>
              <div className='my-4 flex justify-between rounded-xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
                <div className='flex items-center gap-x-5'>
                  <FaTasks />
                  <h1>Total Projects</h1>
                </div>

                <p>---</p>
              </div>
              <div className='my-4 flex justify-between rounded-xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
                <div className='flex items-center gap-x-5'>
                  <FaRegClock />
                  <h1>Hours Logged</h1>
                </div>
                <p>---</p>
              </div>
              <div className='my-4 flex justify-between rounded-xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
                <div className='flex items-center gap-x-5'>
                  <MdTask />
                  <p>Total Tasks Completed</p>
                </div>
                <p>---</p>
              </div>

              <div className='my-4 flex justify-between rounded-xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
                <div className='flex items-center justify-between gap-x-5'>
                  <MdTask />
                  <p>Total Tasks Completed</p>
                </div>
                <p>---</p>
              </div>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6'>
              <div className='my-4 flex size-fit justify-between rounded-2xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
                <LineComponent />
              </div>
              <div className='my-4 flex size-fit justify-between rounded-2xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
                <AreaChartComponent />
              </div>
            </div>
            <div className='m-4 flex size-fit flex-col justify-between rounded-2xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
              <div>
                <h1>Radar Chart for comparision</h1>
                <p className='mt-5'>Some description about the chart</p>
              </div>
              <DonutComponent />
            </div>

            <div className=' grid grid-flow-row grid-cols-2 gap-2 '>
              <div className='m-4 flex size-fit flex-col justify-between rounded-2xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
                <div>
                  <h1>Pie Chart</h1>
                  <p className='mt-5'>Some description about the chart</p>
                </div>
                <PieChartComponent />
              </div>
              <div className='m-4 flex size-fit flex-col justify-between rounded-2xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
                <div>
                  <h1>Radar Chart for comparision</h1>
                  <p className='mt-5'>Some description about the chart</p>
                </div>
                <RadarChartComponent />
              </div>

              <div className='m-4 flex size-fit flex-col justify-between rounded-2xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
                <div>
                  <h1>Radar Chart for comparision</h1>
                  <p className='mt-5'>Some description about the chart</p>
                </div>
                <SkillsRadarComponent />
              </div>
            </div>
            <div className='m-4 flex size-fit flex-col justify-center rounded-2xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
              <div>Login Data Of Ram of a week</div>
              <BubbleChartComponent />
            </div>
          </div>
        ) : selected === 1 ? (
          <div>Calendar</div>
        ) : selected === 2 ? (
          <div>Profile</div>
        ) : selected === 3 ? (
          <div>Settings</div>
        ) : selected === 4 ? (
          <div>Chart</div>
        ) : (
          <div>OK</div>
        )}
      </div>
    </DndContext>
  )
}

export default AdminDashboard
