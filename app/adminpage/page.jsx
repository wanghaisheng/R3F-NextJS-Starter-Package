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
  const [selectedSubItem, setSelectedSubItem] = useState(null)

  function handleToggle() {
    setIsOpen(!isOpen)
  }

  function handleSubItemClick(subItem) {
    setSelectedSubItem(subItem)
    setSelected(subItem.id)
  }

  const navItems = [
    { id: 0, icon: <MdSpaceDashboard />, label: 'Dashboard' },
    { id: 1, icon: <FaCalendarCheck />, label: 'Calendar' },
    { id: 2, icon: <CgProfile />, label: 'Profile' },
    { id: 3, icon: <IoIosSettings />, label: 'Settings' },
    { id: 4, icon: <FaRegChartBar />, label: 'Chart' },
    { id: 5, icon: <FaGithub />, label: 'GitHub' },
    { id: 6, icon: <FaFileWaveform />, label: 'Add Region' },
    {
      id: selectedSubItem ? selectedSubItem.id : 7,
      icon: selectedSubItem ? selectedSubItem.icon : <BsGlobe />,
      label: selectedSubItem ? selectedSubItem.label : 'Cesium',
      subItems: [
        { id: 7, icon: <BsGlobe />, label: 'Cesium' },
        { id: 8, icon: <GiHumanTarget />, label: 'Cesium Human' },
        { id: 9, icon: <GoPaperAirplane />, label: 'Cesium Aircraft' },
        { id: 10, icon: <IoCarSportOutline />, label: 'Cesium Vehicle' },
        { id: 11, icon: <RiGpsLine />, label: 'Cesium GPX' },
        { id: 12, icon: <TbCloudSearch />, label: 'Cesium Clouds' },
        { id: 13, icon: <TbCloudSearch />, label: 'Cesium Buildings' },
        { id: 14, icon: <TbCloudSearch />, label: 'Cesium Video' },
      ],
    },
  ]

  return (
    <div>
      {/* Open */}
      <AnimatePresence>
        <motion.div
          initial={{ transform: 'translateX(-200%)' }}
          animate={{ width: isOpen ? '192px' : '10px', transform: isOpen ? 'translateX(0)' : 'translateX(-200%)' }}
          exit={{ transform: 'translateX(-200%)' }}
          transition={{ duration: 0.2 }}
          className={`fixed left-0 top-28 z-50 h-full ${isOpen ? 'w-48' : 'w-12'}`}
        >
          {navItems.map(({ id, icon, label, subItems }) => (
            <div key={id}>
              <NavItem
                selected={selected === id}
                id={id}
                setSelected={setSelected}
                setSelectedSubItem={setSelectedSubItem}
              >
                <div className='flex items-center'>
                  {icon}
                  {isOpen && <p className='ml-4 text-sm'>{label}</p>}
                </div>
              </NavItem>
              {isOpen && subItems && selected === id && (
                <div className='ml-8'>
                  {subItems.map((subItem) => (
                    <NavItem
                      selected={selected === subItem.id}
                      id={subItem.id}
                      setSelected={() => handleSubItemClick(subItem)}
                      key={subItem.id}
                    >
                      <div className='flex items-center'>
                        {subItem.icon}
                        <p className='ml-4 text-sm'>{subItem.label}</p>
                      </div>
                    </NavItem>
                  ))}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
      {/* Onclose */}
      <AnimatePresence>
        <motion.div
          initial={{ transform: 'translateX(0%)' }}
          animate={{ width: !isOpen ? '48px' : '36px', transform: !isOpen ? 'translateX(0)' : 'translateX(-300%)' }}
          exit={{ transform: 'translateX(-300%)' }}
          transition={{ duration: 0.2 }}
          className={`fixed left-0 top-28 z-50 h-full ${isOpen ? 'w-48' : 'w-12'}`}
        >
          {navItems.map(({ id, icon, subItems }) => (
            <div key={id}>
              <NavItem
                selected={selected === id}
                id={id}
                setSelected={setSelected}
                setSelectedSubItem={setSelectedSubItem}
              >
                <div className='flex items-center'>{icon}</div>
              </NavItem>
              {!isOpen && subItems && selected === id && (
                <div className='absolute left-12 top-10'>
                  {subItems.map((subItem) => (
                    <NavItem
                      selected={selected === subItem.id}
                      id={subItem.id}
                      setSelected={() => handleSubItemClick(subItem)}
                      key={subItem.id}
                    >
                      <div className='flex items-center'>{subItem.icon}</div>
                    </NavItem>
                  ))}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className='fixed left-1 top-20'>
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
