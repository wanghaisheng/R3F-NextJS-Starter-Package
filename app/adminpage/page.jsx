'use client'

//Cesium
import CesiumWidgetViewer from '@/components/Cesium/CesiumViewingComponents/CesiumWidgetViewer'
import CesiumAirCraftViewer from '@/components/Cesium/CesiumViewingComponents/CesiumAirCraftViewer'
import CesiumHumanModalViewer from '@/components/Cesium/CesiumViewingComponents/CesiumHumanModalViewer'
import CesiumVehicleViewer from '@/components/Cesium/CesiumViewingComponents/CesiumVehicleViewer'
import CesiumGPXViewer from '@/components/Cesium/CesiumViewingComponents/CesiumGPXViewer'
import CesiumCloudsViewer from '@/components/Cesium/CesiumViewingComponents/CesiumCloudsViewer'
import CesiumOSMViewer from '@/components/Cesium/CesiumViewingComponents/CesiumOSMViewer'
import VideoCesiumViewer from '@/components/Cesium/CesiumViewingComponents/VideoCesiumViewer'
//Cesium

//Charts
import LineComponent from '@/components/charts/LineChart'
import AreaChartComponent from '@/components/charts/AreaChart'
import BubbleChartComponent from '@/components/charts/BubbleChart'
import PieChartComponent from '@/components/charts/PieChart'
import RadarChartComponent from '@/components/charts/RadarChartComparision'
import DonutComponent from '@/components/charts/DonutChart'
import SkillsRadarComponent from '@/components/charts/SkillsRadarChart'
//Charts

//GitHub Card
import GitHubCard from '@/components/card/GitGubCard'
//GitHub Card

import { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

//Forms
import AddRegionForm from '@/components/Regions/AddRegionForm'
//Forms

//icons
import { MdSpaceDashboard } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { FaCalendarCheck } from 'react-icons/fa'
import { IoIosSettings } from 'react-icons/io'
import { FaRegChartBar } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import { FaFileWaveform } from 'react-icons/fa6'
import { MdNavigateNext } from 'react-icons/md'
import { BsGlobe } from 'react-icons/bs'
import { GiHumanTarget } from 'react-icons/gi'
import { GoPaperAirplane } from 'react-icons/go'
import { IoCarSportOutline } from 'react-icons/io5'
import { RiGpsLine } from 'react-icons/ri'
import { TbCloudSearch } from 'react-icons/tb'
//icons

//Pages
import AdminDashboard from '@/components/AdminPageComponents/AdminDashboard'
import Profile from '@/components/AdminPageComponents/Profile'
import Settings from '@/components/AdminPageComponents/Settings'
//Pages

//SideBar
function SideNav({ selected, setSelected }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleToggle() {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      {/* Open */}
      <AnimatePresence>
        <motion.div
          initial={{ transform: 'translateX(-200%)' }}
          animate={{ width: isOpen ? '192px' : '10px', transform: isOpen ? 'translateX(0)' : 'translateX(-200%)' }}
          exit={{ transform: 'translateX(-200%)' }}
          transition={{ duration: 0.2 }}
          className={`fixed left-0 top-20 z-50 h-full ${isOpen ? 'w-48' : 'w-12'}`}
        >
          <div>
            <NavItem selected={selected === 0} id={0} setSelected={setSelected}>
              <div className='flex items-center'>
                {/* Icon */}
                <MdSpaceDashboard />
                {isOpen && <p className='ml-4 text-sm'>Dashboard</p>}
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 1} id={1} setSelected={setSelected}>
              <div className='flex items-center'>
                <FaCalendarCheck />
                {isOpen && <p className='ml-4 text-sm'>Calendar</p>}
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 2} id={2} setSelected={setSelected}>
              <div className='flex items-center'>
                <CgProfile />
                {isOpen && <p className='ml-4 text-sm'>Profile</p>}
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 3} id={3} setSelected={setSelected}>
              <div className='flex items-center'>
                <IoIosSettings />
                {isOpen && <p className='ml-4 text-sm'>Settings</p>}
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 4} id={4} setSelected={setSelected}>
              <div className='flex items-center'>
                <FaRegChartBar />
                {isOpen && <p className='ml-4 text-sm'>Chart</p>}
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 5} id={5} setSelected={setSelected}>
              <div className='flex items-center'>
                <FaGithub />
                {isOpen && <p className='ml-4 text-sm'>GitHub</p>}
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 6} id={6} setSelected={setSelected}>
              <div className='flex items-center'>
                <FaFileWaveform />
                {isOpen && <p className='ml-4 text-sm'>Add Region</p>}
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 7} id={7} setSelected={setSelected}>
              <div className='flex items-center'>
                <BsGlobe />
                {isOpen && <p className='ml-4 text-sm'>Cesium</p>}
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 8} id={8} setSelected={setSelected}>
              <div className='flex items-center'>
                <GiHumanTarget />
                {isOpen && <p className='ml-4 text-sm'>Cesium Human</p>}
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 9} id={9} setSelected={setSelected}>
              <div className='flex items-center'>
                <GoPaperAirplane />
                {isOpen && <p className='ml-4 text-sm'>Cesium Aircraft</p>}
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 10} id={10} setSelected={setSelected}>
              <div className='flex items-center'>
                <IoCarSportOutline />
                {isOpen && <p className='ml-4 text-sm'>Cesium Vehicle</p>}
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 11} id={11} setSelected={setSelected}>
              <div className='flex items-center'>
                <RiGpsLine />
                {isOpen && <p className='ml-4 text-sm'>Cesium GPX</p>}
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 12} id={12} setSelected={setSelected}>
              <div className='flex items-center'>
                <TbCloudSearch />
                {isOpen && <p className='ml-4 text-sm'>Cesium Clouds</p>}
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 13} id={13} setSelected={setSelected}>
              <div className='flex items-center'>
                <TbCloudSearch />
                {isOpen && <p className='ml-4 text-sm'>Cesium Buildings</p>}
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 14} id={14} setSelected={setSelected}>
              <div className='flex items-center'>
                <TbCloudSearch />
                {isOpen && <p className='ml-4 text-sm'>Cesium Video</p>}
              </div>
            </NavItem>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Onclose */}
      <AnimatePresence>
        <motion.div
          initial={{ transform: 'translateX(0%)' }}
          animate={{ width: !isOpen ? '48px' : '36px', transform: !isOpen ? 'translateX(0)' : 'translateX(-300%)' }}
          exit={{ transform: 'translateX(-300%)' }}
          transition={{ duration: 0.2 }}
          className={`fixed left-0 top-20 z-50 h-full ${isOpen ? 'w-48' : 'w-12'}`}
        >
          <div>
            <NavItem selected={selected === 0} id={0} setSelected={setSelected}>
              <div className='flex items-center'>
                {/* Icon */}
                <MdSpaceDashboard />
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 1} id={1} setSelected={setSelected}>
              <div className='flex items-center'>
                <FaCalendarCheck />
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 2} id={2} setSelected={setSelected}>
              <div className='flex items-center'>
                <CgProfile />
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 3} id={3} setSelected={setSelected}>
              <div className='flex items-center'>
                <IoIosSettings />
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 4} id={4} setSelected={setSelected}>
              <div className='flex items-center'>
                <FaRegChartBar />
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 5} id={5} setSelected={setSelected}>
              <div className='flex items-center'>
                <FaGithub />
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 6} id={6} setSelected={setSelected}>
              <div className='flex items-center'>
                <FaFileWaveform />
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 7} id={7} setSelected={setSelected}>
              <div className='flex items-center'>
                <BsGlobe />
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 8} id={8} setSelected={setSelected}>
              <div className='flex items-center'>
                <GiHumanTarget />
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 9} id={9} setSelected={setSelected}>
              <div className='flex items-center'>
                <GoPaperAirplane />
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 10} id={10} setSelected={setSelected}>
              <div className='flex items-center'>
                <IoCarSportOutline />
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 11} id={11} setSelected={setSelected}>
              <div className='flex items-center'>
                <RiGpsLine />
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 12} id={12} setSelected={setSelected}>
              <div className='flex items-center'>
                <TbCloudSearch />
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 13} id={13} setSelected={setSelected}>
              <div className='flex items-center'>
                <TbCloudSearch />
              </div>
            </NavItem>
          </div>
          <div>
            <NavItem selected={selected === 14} id={14} setSelected={setSelected}>
              <div className='flex items-center'>
                <TbCloudSearch />
              </div>
            </NavItem>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className={`fixed  top-20 ${!isOpen ? 'left-10' : 'left-48'}`}>
        <div onClick={handleToggle}>
          <p className={`ml-2 text-2xl text-pink-500 ${isOpen ? 'rotate-180' : ''}`}>
            <MdNavigateNext />
          </p>
        </div>
      </div>
    </div>
  )
}
//SideBar

//NavItem
const NavItem = ({ children, selected, id, setSelected }) => {
  return (
    <motion.div
      className='relative h-full bg-slate-800 p-3 text-xl transition-colors hover:bg-slate-700'
      onClick={() => setSelected(id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className='relative z-10 block w-full'>{children}</span>
      <AnimatePresence>
        {selected && (
          <motion.span
            className='absolute inset-0 z-0 bg-indigo-600'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          ></motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
//NavItem

// Main Page
const AdminPage = () => {
  const [selected, setSelected] = useState(0)
  return (
    <div className='flex h-full flex-row'>
      <div className='ml-16 basis-full'>
        <div className='m-4'>Welcome, Admin</div>

        {selected === 0 ? (
          <AdminDashboard />
        ) : selected === 1 ? (
          <div>Calendar</div>
        ) : selected === 2 ? (
          <Profile />
        ) : selected === 3 ? (
          <Settings />
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
          <GitHubCard />
        ) : selected === 6 ? (
          <AddRegionForm />
        ) : selected === 7 ? (
          <CesiumWidgetViewer />
        ) : selected === 8 ? (
          <CesiumHumanModalViewer />
        ) : selected === 9 ? (
          <CesiumAirCraftViewer />
        ) : selected === 10 ? (
          <CesiumVehicleViewer />
        ) : selected === 11 ? (
          <CesiumGPXViewer />
        ) : selected === 12 ? (
          <CesiumCloudsViewer />
        ) : selected === 13 ? (
          <CesiumOSMViewer />
        ) : selected === 14 ? (
          <VideoCesiumViewer />
        ) : (
          <div>Dashboard</div>
        )}
      </div>
      <div>
        <SideNav selected={selected} setSelected={setSelected} />
      </div>
    </div>
  )
}
// Main Page

export default AdminPage
