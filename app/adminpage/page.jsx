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

import LeftSidebar, { LeftSidebarItem } from '@/components/AdminPageComponents/LeftSidebar'
import RightSidebar, { RightSidebarItem } from '@/components/AdminPageComponents/RightSidebar'
import DropdownMenu from '@/components/AdminPageComponents/DropDownMenu'

// Main Page
const AdminPage = () => {
  const [selected, setSelected] = useState(0)

  const [selectedItem, setSelectedItem] = useState(null)

  const handleSelectItem = (icon, text) => {
    setSelectedItem({ icon, text })
    // Set the selected state based on the text or index as needed
    const textToIndexMap = {
      Dashboard: 0,
      Calendar: 1,
      Profile: 2,
      Chart: 3,
      GitHub: 4,
      'Add Region': 5,
      Cesium: 6,
      'Cesium Human': 7,
      'Cesium Aircraft': 8,
      'Cesium Vehicle': 9,
      'Cesium GPX': 10,
      'Cesium Clouds': 11,
      'Cesium Buildings': 12,
      'Cesium Video': 13,
      Settings: 14,
    }
    setSelected(textToIndexMap[text] || 0)
  }

  return (
    <>
      <div className='flex size-full flex-row'>
        <div className='fixed left-0 z-50 h-full'>
          <LeftSidebar>
            <div className='flex-1'>
              <LeftSidebarItem
                icon={<MdSpaceDashboard size={20} />}
                text='Dashboard'
                active={selected === 0}
                onClick={() => setSelected(0)}
              />
              <LeftSidebarItem
                icon={<FaCalendarCheck size={20} />}
                text='Calendar'
                active={selected === 1}
                onClick={() => setSelected(1)}
              />
              <LeftSidebarItem
                icon={<CgProfile size={20} />}
                text='Profile'
                active={selected === 2}
                onClick={() => setSelected(2)}
              />
              <LeftSidebarItem
                icon={<FaRegChartBar size={20} />}
                text='Chart'
                active={selected === 3}
                onClick={() => setSelected(3)}
              />
              <LeftSidebarItem
                icon={<FaGithub size={20} />}
                text='GitHub'
                active={selected === 4}
                onClick={() => setSelected(4)}
              />
              <LeftSidebarItem
                icon={<FaFileWaveform size={20} />}
                text='Add Region'
                active={selected === 5}
                onClick={() => setSelected(5)}
              />
              <DropdownMenu title={<BsGlobe size={20} />} selectedItem={selectedItem} onSelectItem={handleSelectItem}>
                <LeftSidebarItem
                  icon={<BsGlobe size={20} />}
                  text='Cesium'
                  active={selected === 6}
                  onClick={() => setSelected(6)}
                />
                <LeftSidebarItem
                  icon={<GiHumanTarget size={20} />}
                  text='Cesium Human'
                  active={selected === 7}
                  onClick={() => setSelected(7)}
                />
                <LeftSidebarItem
                  icon={<GoPaperAirplane size={20} />}
                  text='Cesium Aircraft'
                  active={selected === 8}
                  onClick={() => setSelected(8)}
                />
                <LeftSidebarItem
                  icon={<IoCarSportOutline size={20} />}
                  text='Cesium Vehicle'
                  active={selected === 9}
                  onClick={() => setSelected(9)}
                />
                <LeftSidebarItem
                  icon={<RiGpsLine size={20} />}
                  text='Cesium GPX'
                  active={selected === 10}
                  onClick={() => setSelected(10)}
                />
                <LeftSidebarItem
                  icon={<TbCloudSearch size={20} />}
                  text='Cesium Clouds'
                  active={selected === 11}
                  onClick={() => setSelected(11)}
                />
                <LeftSidebarItem
                  icon={<TbCloudSearch size={20} />}
                  text='Cesium Buildings'
                  active={selected === 12}
                  onClick={() => setSelected(12)}
                />
                <LeftSidebarItem
                  icon={<TbCloudSearch size={20} />}
                  text='Cesium Video'
                  active={selected === 13}
                  onClick={() => setSelected(13)}
                />
              </DropdownMenu>
            </div>

            <div className='mt-auto'>
              <hr className='my-3' />
              <LeftSidebarItem
                icon={<IoIosSettings size={20} />}
                text='Settings'
                active={selected === 14}
                onClick={() => setSelected(14)}
              />
            </div>
          </LeftSidebar>
        </div>

        <div className='ml-20 flex-1'>
          {selected === 0 ? (
            <AdminDashboard />
          ) : selected === 1 ? (
            <div>Calendar</div>
          ) : selected === 2 ? (
            <Profile />
          ) : selected === 14 ? (
            <Settings />
          ) : selected === 3 ? (
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
          ) : selected === 4 ? (
            <GitHubCard />
          ) : selected === 5 ? (
            <AddRegionForm />
          ) : selected === 6 ? (
            <CesiumWidgetViewer />
          ) : selected === 7 ? (
            <CesiumHumanModalViewer />
          ) : selected === 8 ? (
            <CesiumAirCraftViewer />
          ) : selected === 9 ? (
            <CesiumVehicleViewer />
          ) : selected === 10 ? (
            <CesiumGPXViewer />
          ) : selected === 11 ? (
            <CesiumCloudsViewer />
          ) : selected === 12 ? (
            <CesiumOSMViewer />
          ) : selected === 13 ? (
            <VideoCesiumViewer />
          ) : (
            <div>Dashboard</div>
          )}
        </div>

        <div className='z-50'>
          <RightSidebar>
            <RightSidebarItem
              icon={<MdSpaceDashboard size={20} />}
              text='Card'
              active={selected === 100}
              onClick={() => setSelected(100)}
            />
            <RightSidebarItem icon={<MdSpaceDashboard size={20} />} text='Feedback' />
            <RightSidebarItem icon={<MdSpaceDashboard size={20} />} text='Help' />
            <RightSidebarItem icon={<MdSpaceDashboard size={20} />} text='Contact Us' />
          </RightSidebar>
        </div>
      </div>
    </>
  )
}
// Main Page

export default AdminPage
