'use client'

import LineComponent from '@/components/charts/LineChart'
import AreaChartComponent from '@/components/charts/AreaChart'
import BubbleChartComponent from '@/components/charts/BubbleChart'
import PieChartComponent from '@/components/charts/PieChart'
import RadarChartComponent from '@/components/charts/RadarChartComparision'
import DonutComponent from '@/components/charts/DonutChart'
import SkillsRadarComponent from '@/components/charts/SkillsRadarChart'

import GitHubCard from '@/components/card/GitGubCard'

import { DndContext } from '@dnd-kit/core'

import { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

//icons
import { MdSpaceDashboard } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { FaCalendarCheck } from 'react-icons/fa'
import { IoIosSettings } from 'react-icons/io'
import { FaRegChartBar } from 'react-icons/fa'
import { FaTasks } from 'react-icons/fa'
import { FaRegClock } from 'react-icons/fa6'
import { MdTask } from 'react-icons/md'
import { LuGauge } from 'react-icons/lu'
import { FaGithub } from 'react-icons/fa'

function SideNav({ selected, setSelected }) {
  return (
    <nav className='top-20 m-3 flex flex-col gap-2 rounded-xl bg-slate-950/40 md:flex-row'>
      <div className='fixed flex w-[17%] flex-col gap-2'>
        <NavItem selected={selected === 0} id={0} setSelected={setSelected}>
          <div className='flex items-center justify-between'>
            <MdSpaceDashboard />
            <p className='text-sm max-sm:hidden'>Dashboard</p>
          </div>
        </NavItem>
        <NavItem selected={selected === 1} id={1} setSelected={setSelected}>
          <div className='flex items-center justify-between'>
            <FaCalendarCheck />
            <p className='text-sm max-sm:hidden'>Calendar</p>
          </div>
        </NavItem>
        <NavItem selected={selected === 2} id={2} setSelected={setSelected}>
          <div className='flex items-center justify-between'>
            <CgProfile />
            <p className='text-sm max-sm:hidden'>Profile</p>
          </div>
        </NavItem>
        <NavItem selected={selected === 3} id={3} setSelected={setSelected}>
          <div className='flex items-center justify-between'>
            <IoIosSettings />
            <p className='text-sm max-sm:hidden'>Settings</p>
          </div>
        </NavItem>
        <NavItem selected={selected === 4} id={4} setSelected={setSelected}>
          <div className='flex items-center justify-between'>
            <FaRegChartBar />
            <p className='text-sm max-sm:hidden'>Chart</p>
          </div>
        </NavItem>
        <NavItem selected={selected === 5} id={5} setSelected={setSelected}>
          <div className='flex items-center justify-between'>
            <FaGithub />
            <p className='text-sm max-sm:hidden'>GitHub</p>
          </div>
        </NavItem>
      </div>
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
      <div className='mx-4 flex justify-between bg-slate-900/20 text-slate-100 md:mx-8'>
        <div className='w-[20%]'>
          <SideNav selected={selected} setSelected={setSelected} />
        </div>
        <div className='w-[80%]'>
          {selected === 0 ? (
            <div className='mx-4'>
              <div className='my-4'>Welcome, Admin</div>
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
                  <div className='flex items-center justify-between gap-x-5'>
                    <MdTask />
                    <p>Total Tasks Completed</p>
                  </div>
                  <p>---</p>
                </div>
                <div className='my-4 flex justify-between rounded-xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
                  <div className='flex items-center justify-between gap-x-5'>
                    <LuGauge />
                    <p>Performance</p>
                  </div>
                  <p>---</p>
                </div>
              </div>

              <div className='rounded-2xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
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
            <div>
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
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6'>
                <div className='my-4 flex size-fit justify-between rounded-2xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
                  <LineComponent />
                </div>
                <div className='my-4 flex size-fit justify-between rounded-2xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
                  <AreaChartComponent />
                </div>
              </div>
            </div>
          ) : selected === 5 ? (
            <div className='mt-10'>
              <GitHubCard />
            </div>
          ) : (
            <div>Dashboard</div>
          )}
        </div>
      </div>
    </DndContext>
  )
}

export default AdminDashboard
