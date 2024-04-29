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

import AddRegionForm from '@/components/Regions/AddRegionForm'

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
import { FaFileWaveform } from 'react-icons/fa6'

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
        <NavItem selected={selected === 6} id={6} setSelected={setSelected}>
          <div className='flex items-center justify-between'>
            <FaFileWaveform />
            <p className='text-sm max-sm:hidden'>Add Region</p>
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
          <div className='m-4'>Welcome, Admin</div>
          {selected === 0 ? (
            <div className='mx-4'>
              <div className='flex flex-col lg:flex-row lg:justify-between'>
                {/* left side */}
                <div className='grid grid-cols-2 gap-6 lg:w-[58%]'>
                  {/* 1 */}
                  <div className='flex gap-x-5 rounded-xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
                    <div className='mt-1'>
                      <FaTasks />
                    </div>
                    <div>
                      <h1 className='text-lg font-semibold'>Total Projects</h1>
                      <p className='my-3 text-xl font-bold text-purple-400'>124</p>
                      <p className='text-xs'>All running & completed projects</p>
                    </div>
                  </div>
                  {/* 2 */}
                  <div className='flex gap-x-5 rounded-xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
                    <div className='mt-1'>
                      <FaRegClock />
                    </div>
                    <div>
                      <h1 className='text-lg font-semibold'>Hours Logged</h1>
                      <p className='my-3 text-xl font-bold text-purple-400'>52</p>
                      <p className='text-xs text-red-400'>
                        -2%
                        <span className='text-white'> From last week</span>
                      </p>
                    </div>
                  </div>
                  {/* 3 */}
                  <div className='flex gap-x-5 rounded-xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
                    <div className='mt-1'>
                      <MdTask />
                    </div>
                    <div>
                      <h1 className='text-lg font-semibold'>Completed Projects</h1>
                      <p className='my-3 text-xl font-bold text-purple-400'>50</p>
                      <p className='text-xs text-blue-400'>
                        +12%
                        <span className='text-white'> Completion rate this month</span>
                      </p>
                    </div>
                  </div>
                  {/* 4 */}
                  <div className='flex gap-x-5 rounded-xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
                    <div className='mt-1'>
                      <LuGauge />
                    </div>
                    <div>
                      <h1 className='text-lg font-semibold'>Performance</h1>
                      <p className='my-3 text-xl font-bold text-purple-400'>80%</p>
                      <p className='text-xs text-green-500'>
                        +12%
                        <span className='text-white'> than last week</span>
                      </p>
                    </div>
                  </div>
                </div>
                {/* right side */}
                <div className='mt-4 flex flex-col justify-center rounded-xl p-4 shadow-md shadow-[#6B37CA] backdrop-blur-md lg:mt-0 lg:w-[40%]'>
                  {/* 1 */}
                  <div className='mx-4 mb-4'>
                    <p className='text-xl font-bold'>
                      Performance of year <span className='text-sky-500'>2023</span>
                    </p>
                    <p className='text-purple-400'>User Name</p>
                    <p>
                      Expected Avg : <span className='text-green-500'>65%</span>
                    </p>
                    <p>
                      Achieved Avg : <span className='text-red-400'>55%</span>
                    </p>
                  </div>
                  <AreaChartComponent />
                </div>
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
              <div className='m-4 flex size-fit flex-col justify-between rounded-2xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
                <BubbleChartComponent />
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
          ) : selected === 6 ? (
            <div className='flex justify-center'>
              <AddRegionForm />
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
