'use client'

import { FiChevronDown } from 'react-icons/fi'
import { AiOutlineRadarChart } from 'react-icons/ai'
import { FaChartPie, FaRegChartBar } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import FormModal2 from '@/components/FormModal/Modal2'
import { useUser } from '@/context/UserContext/UserContext'
import { useRouter } from 'next/navigation'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import { TiDelete } from 'react-icons/ti'

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
  const router = useRouter()
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

  // const handleSubmit = async (event) => {
  //   event.preventDefault()

  //   try {
  //     const res = await fetch('http://localhost:3000/api/skills', {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         skill: skills.name,
  //         percentage: skills.percentage,
  //         gg_id: user.gg_id,
  //       }),
  //     })
  //     if (!res.ok) {
  //       throw new Error('failed to submit the form')
  //     }
  //     router.refresh()
  //   } catch (error) {
  //     console.error('Error: ', error)
  //   }
  // }

  return (
    <div className='mt-2 flex flex-col items-center justify-center'>
      <div
        id='skills'
        className='relative flex h-fit w-[68%] items-center justify-center rounded-3xl border  border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'
      >
        <div className='flex w-full flex-col '>
          <div className='relative my-4 flex justify-center text-7xl drop-shadow'>
            Skills
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='absolute bottom-0 right-0 w-fit rounded-lg bg-black p-2 text-sm text-white shadow-md '
              onClick={() => {
                handleAddSkill()
              }}
            >
              Add New Project &emsp;&emsp; +
            </motion.button>
          </div>

          <Tabs>
            <TabList className='my-6 flex flex-col sm:flex-row sm:items-start sm:justify-start '>
              {skills.map((element, index) => (
                <Tab key={index} className='flex pl-1 pr-5'>
                  {element.skill}
                  <button className='ml-2 text-black' onClick={() => handleDeleteSkill(index)}>
                    <TiDelete />
                  </button>
                </Tab>
              ))}
            </TabList>

            <div className='flex gap-x-5'>
              <div className='flex w-full justify-between'>
                <div className='w-[60%]'>
                  {skills.map((element, index) => (
                    <TabPanel key={index}>
                      <div className='size-full rounded-[20px] border border-[#B5B5B5] bg-[#D9D9D9]/20 p-4'>
                        <div className='flex justify-between'>
                          <div className='w-[60%]'>
                            <input
                              type='text'
                              value={element.skill}
                              onChange={(e) => handleSkillNameChange(index, e.target.value)}
                              placeholder='Skill Name'
                              className='w-full rounded-md bg-white/20 p-1'
                            />

                            <div className='my-5 flex'>
                              <input
                                type='range'
                                min='0'
                                max='100'
                                value={element.percentage}
                                className='w-full rounded-md text-purple-700'
                                onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
                              />
                              <p className='px-2 text-sm text-purple-300'>{element.percentage}%</p>
                            </div>
                          </div>
                          <div className='flex justify-start'>
                            <motion.div animate={open ? 'open' : 'closed'} className='relative'>
                              <button
                                onClick={() => setOpen((pv) => !pv)}
                                className='flex items-center gap-2 rounded-md bg-purple-700 px-3 py-2 text-indigo-50 transition-colors hover:bg-purple-900'
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
                        <p>
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
                        </p>
                        <label className=' text-gray-900 dark:text-white' htmlFor='file_input'>
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

                <div className='rounded-[20px] border border-[#B5B5B5] bg-[#D9D9D9]/20 p-3'>
                  <p className='mb-2 flex justify-center'>Specification</p>

                  {/* Condition for changing barchart chart and radar chart*/}
                  {skills.length < 6 ? (
                    <ResponsiveContainer width={278} height={220}>
                      <BarChart
                        width={278}
                        height={287}
                        data={skills}
                        margin={{
                          top: 5,
                          right: 20,
                          left: 0,
                          bottom: 5,
                        }}
                      >
                        <XAxis dataKey='skill' padding={{ left: 20, right: 20 }} />
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
                    <ResponsiveContainer width={278} height={220}>
                      <RadarChart
                        // cx={300}
                        // cy={250}
                        // outerRadius={150}
                        width={278}
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
          </Tabs>
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
