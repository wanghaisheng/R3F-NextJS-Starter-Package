'use client'

import { FiChevronDown } from 'react-icons/fi'
import { AiOutlineRadarChart } from 'react-icons/ai'
import { FaChartPie, FaRegChartBar } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useUser } from '@/context/UserContext/UserContext'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import { TiDelete } from 'react-icons/ti'
import Link from 'next/link'

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
        <p className='text-lg'>{label}</p>
        <p className='text-sm text-indigo-400'>
          <span className='ml-2'>{payload[0].payload.percentage}</span>%
        </p>
      </div>
    )
  }
}

async function getSkills() {
  try {
    const res = await fetch('http://localhost:3000/api/skills')
    if (!res.ok) {
      throw new Error('failed to fetch the skills')
    }
    return res.json()
  } catch (error) {
    throw new Error('failed to fetch the skills')
  }
}

export default function SkillsComponent() {
  const { user } = useUser()
  const [skills, setSkills] = useState([{ skill: 'skill1', percentage: 0 }])
  const [originalLength, setOriginalLength] = useState(0)

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const testData = await getSkills() // Fetch skills data
        const filteredData = testData.filter((element: any) => element.gg_id === user.gg_id) // Filter data based on user
        if (filteredData.length != 0) {
          setSkills(filteredData) // Set the filtered data
          setOriginalLength(filteredData.length)
        }
      } catch (error) {
        throw new Error('failed to fetch the skills data')
      }
    }

    if (user) {
      fetchSkillsData() // Fetch data only if user is available
    }
  }, [user])

  const handleSkillNameChange = (index: number, newName: string) => {
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills]
      updatedSkills[index].skill = newName
      return updatedSkills
    })
  }

  const handleSliderChange = (index: number, newValue: number) => {
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills]
      updatedSkills[index].percentage = newValue
      return updatedSkills
    })
  }

  const handleAddSkill = () => {
    setSkills((prevSkills) => [...prevSkills, { skill: 'skill', percentage: 0 }])
  }

  const handleDeleteSkill = (index) => {
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills]
      updatedSkills.splice(index, 1)
      return updatedSkills
    })
  }

  const [open, setOpen] = useState(false)

  return (
    <div className='mt-2 flex flex-col items-center justify-center'>
      <div
        id='skills'
        className='relative flex h-fit w-[68%] items-center justify-center rounded-3xl border  border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'
      >
        <div className='flex w-full flex-col '>
          <div className='relative my-3 flex justify-center text-2xl drop-shadow md:my-8 md:text-7xl'>
            Skills
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='absolute top-14 rounded-full bg-black/10 p-2 text-sm text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:bg-violet-900 md:bottom-0 md:right-0 md:size-fit'
              onClick={() => {
                handleAddSkill()
              }}
            >
              Add Skill &emsp; +
            </motion.button>
          </div>

          <Tabs>
            <TabList className='mt-20 flex flex-col sm:flex-row sm:items-start sm:justify-start md:my-6'>
              {skills.map((element, index) => (
                <Tab key={index} className='flex cursor-pointer px-1'>
                  {element.skill}
                  <button className='ml-2 text-gray-900 hover:text-red-500' onClick={() => handleDeleteSkill(index)}>
                    <TiDelete />
                  </button>
                </Tab>
              ))}
            </TabList>

            {/* TabPanel */}
            <div className='flex gap-y-5 md:gap-x-5 md:gap-y-0'>
              <div className='flex w-full flex-col md:flex-row md:justify-between'>
                <div className='md:w-[60%]'>
                  {skills.map((element, index) => (
                    <TabPanel key={index}>
                      <div className='size-full rounded-[20px]  p-4'>
                        <div className='flex flex-col md:flex-row  md:justify-between'>
                          <div className='md:w-[60%]'>
                            <input
                              type='text'
                              value={element.skill}
                              onChange={(e) => handleSkillNameChange(index, e.target.value)}
                              placeholder='Skill Name'
                              className='w-full rounded-md bg-white/20 p-1'
                            />

                            <div className='my-4 flex'>
                              <input
                                type='range'
                                min='0'
                                max='100'
                                value={element.percentage}
                                className='w-full rounded-md bg-purple-600'
                                onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
                              />
                              <p className='pl-2 text-sm text-purple-300'>{element.percentage}%</p>
                            </div>
                          </div>
                          <div className='flex justify-start'>
                            <motion.div animate={open ? 'open' : 'closed'} className='relative'>
                              <button
                                onClick={() => setOpen((pv) => !pv)}
                                className='flex items-center gap-2 rounded-2xl bg-purple-700/30 px-3 py-2 text-indigo-50 transition-colors hover:bg-purple-700/50'
                              >
                                <span className='text-sm font-medium'>Select View</span>
                                <motion.span variants={iconVariants}>
                                  <FiChevronDown />
                                </motion.span>
                              </button>

                              <motion.ul
                                initial={wrapperVariants.closed}
                                variants={wrapperVariants}
                                style={{ originY: 'top', translateX: '-50%' }}
                                className='absolute left-[50%] top-[50%] flex w-36 flex-col gap-2 overflow-hidden rounded-lg bg-purple-700 p-2  shadow-xl'
                              >
                                <Option setOpen={setOpen} Icon={AiOutlineRadarChart} text='Radar Chart' />
                                <Option setOpen={setOpen} Icon={FaChartPie} text='Pie Chart' />
                                <Option setOpen={setOpen} Icon={FaRegChartBar} text='Bar Chart' />
                              </motion.ul>
                            </motion.div>
                          </div>
                        </div>
                        {/* <p>
                          Work Project{' '}
                          <input
                            type='text'
                            value={element.skill}
                            onChange={(e) => handleSkillNameChange(index, e.target.value)}
                            placeholder='Skill Name'
                            className='w-full rounded-md bg-white/20 p-1'
                          />
                        </p>
                        <p>
                          Education Project{' '}
                          <input
                            type='text'
                            value={element.skill}
                            onChange={(e) => handleSkillNameChange(index, e.target.value)}
                            placeholder='Skill Name'
                            className='w-full rounded-md bg-white/20 p-1'
                          />
                        </p> */}
                        <p className='my-4 md:mt-0'>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, voluptatibus laboriosam sed
                          saepe repudiandae accusamus temporibus, autem dicta quidem a omnis quas optio nemo? Officia
                          totam autem nam ex quis?
                        </p>
                        <label className='text-gray-900 dark:text-white' htmlFor='file_input'>
                          Certifications
                        </label>
                        <input
                          className='block w-full cursor-pointer rounded-lg  bg-gray-50 text-sm text-gray-900 focus:outline-none  dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400'
                          id='file_input'
                          type='file'
                        />
                      </div>
                    </TabPanel>
                  ))}
                </div>

                <div className='mt-4 rounded-[20px] p-3  md:ml-2 md:mt-0 md:w-[45%]'>
                  <p className='mb-2 flex justify-center'>Specification</p>

                  {/* Condition for changing barchart chart and radar chart*/}
                  <div className='md:block md:w-full'>
                    {skills.length < 6 ? (
                      <ResponsiveContainer width='100%' height={220}>
                        <BarChart
                          width={100}
                          height={287}
                          data={skills}
                          margin={{
                            top: 5,
                            right: 20,
                            left: -20,
                            bottom: 5,
                          }}
                        >
                          <XAxis dataKey='skill' />
                          <YAxis domain={[0, 100]} />
                          <Tooltip content={<CustomTooltip active={false} payload={[]} label='' />} />
                          <CartesianGrid vertical={false} strokeDasharray='6 6' />
                          <Bar
                            name='Ram'
                            dataKey='percentage'
                            fill='#6E29F7'
                            activeBar={<Rectangle fill='#268AFF' stroke='blue' />}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      // Radar chart
                      <ResponsiveContainer width='100%' height={220}>
                        <RadarChart
                          // cx={300}
                          // cy={250}
                          // outerRadius={150}
                          width={100}
                          height={287}
                          data={skills}
                        >
                          <PolarGrid />
                          <PolarAngleAxis dataKey='skill' />
                          <PolarRadiusAxis opacity={0} domain={[0, 100]} />
                          <Radar
                            name='Ram'
                            dataKey='percentage'
                            stroke='#28B5E1'
                            strokeWidth={4}
                            fill='#28B5E1'
                            fillOpacity={0.4}
                          />
                          {/* <Tooltip /> */}
                          {/* <Legend values="100%" /> */}
                          <Tooltip content={<CustomTooltip active={false} payload={[]} label='' />} />
                        </RadarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
          <div className='flex justify-center gap-x-2'>
            <button
              type='submit'
              className='mt-4 flex justify-center rounded-2xl px-4 py-2 text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:scale-105 hover:bg-violet-900'
            >
              Generate
            </button>
            <Link
              href='/hero3'
              className='mt-4 flex justify-center rounded-2xl px-4 py-2 text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:scale-105 hover:bg-violet-900'
            >
              Go To Home
            </Link>
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
      className='flex w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded-md p-2 text-xs font-medium text-white transition-colors hover:bg-purple-900'
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  )
}

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
}

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
}

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: 'afterChildren',
    },
  },
}

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
}
