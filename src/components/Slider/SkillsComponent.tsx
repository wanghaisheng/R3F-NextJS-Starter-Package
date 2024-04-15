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
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [skills, setSkills] = useState([{ skill: 'skill1', percentage: 0 }])
  const [originalLength, setOriginalLength] = useState(0)

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const testData = await getSkills() // Fetch skills data
        const filteredData = testData.filter((element) => element.gg_id === user.gg_id) // Filter data based on user
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
    setSkills((prevSkills) => [...prevSkills, { skill: '', percentage: 0 }])
  }

  const openCardModal = () => {
    setIsCardModalOpen(true)
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
      <div className='relative flex h-fit w-[68%] items-center justify-center rounded-3xl border  border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'>
        <div className='flex w-full flex-col '>
          <div className='relative my-4 flex justify-center text-7xl drop-shadow'>
            Skills
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='absolute bottom-0 right-0 w-fit rounded-lg bg-black p-2 text-sm text-white shadow-md '
              onClick={() => {
                openCardModal()
              }}
            >
              Add New Project &emsp;&emsp; +
            </motion.button>
          </div>

          <FormModal2 show={isCardModalOpen} onclose={setIsCardModalOpen}>
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.3 }}
              className='my-4 flex w-fit items-center rounded-[20px] bg-black px-4 py-2 shadow-sm shadow-white'
            >
              <button onClick={handleAddSkill}>Add New Skill</button>
            </motion.div>
            {/* <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.3 }}
              className='my-4 flex w-fit items-center rounded-[20px] bg-black px-4 py-2 shadow-sm shadow-white'
            >
              <button onClick={handleSubmit}>submit</button>
            </motion.div> */}
            {skills.map((element, index) => (
              <div key={index}>
                <input
                  type='text'
                  value={element.skill}
                  onChange={(e) => handleSkillNameChange(index, e.target.value)}
                  placeholder='Skill Name'
                  className='rounded-md bg-white/20'
                />
                <p>
                  {element.skill}: {element.percentage}%
                </p>
                <input
                  type='range'
                  min='0'
                  max='100'
                  value={element.percentage}
                  onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
                />
              </div>
            ))}
          </FormModal2>

          <Tabs>
            <TabList className='my-6 flex flex-col sm:flex-row sm:items-start sm:justify-start '>
              {skills.map((element, index) => (
                <Tab key={index} className='flex pl-1 pr-5'>
                  {element.skill}
                </Tab>
              ))}
            </TabList>

            <div className='flex gap-x-5'>
              {skills.map((element, index) => (
                <TabPanel key={index}>
                  <div className='flex gap-x-4'>
                    <div className='flex flex-col'>
                      <div className='rounded-[20px] border border-[#B5B5B5] bg-[#D9D9D9]/20 p-4'>
                        <p className='text-2xl'>{element.skill}</p>
                        <p className='mt-5 text-sm'>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consectetur dolores, veniam
                          reprehenderit dolore deleniti iure veritatis natus hic, minima quibusdam qui assumenda. Quod
                          eum veritatis, quos est illo iusto.
                        </p>
                        <p className='mt-5 text-xl'>Certifications: </p>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              ))}
              <div className='rounded-[20px] border border-[#B5B5B5] bg-[#D9D9D9]/20 p-4'>
                <p className='pl-4'>Specifications</p>
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
                <div className='flex items-center justify-center'>
                  <motion.div animate={open ? 'open' : 'closed'} className='relative'>
                    <button
                      onClick={() => setOpen((pv) => !pv)}
                      className='flex items-center gap-2 rounded-md bg-indigo-500 px-3 py-2 text-indigo-50 transition-colors hover:bg-indigo-500'
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
                      className='absolute left-[50%] top-[120%] flex w-48 flex-col gap-2 overflow-hidden rounded-lg bg-[#D9D9D9] p-2 shadow-xl'
                    >
                      <Option setOpen={setOpen} Icon={AiOutlineRadarChart} text='Radar Chart' />
                      <Option setOpen={setOpen} Icon={FaChartPie} text='Pie Chart' />
                      <Option setOpen={setOpen} Icon={FaRegChartBar} text='Bar Chart' />
                    </motion.ul>
                  </motion.div>
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
      className='flex w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded-md p-2 text-xs font-medium text-slate-700 transition-colors hover:bg-indigo-100 hover:text-indigo-500'
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
