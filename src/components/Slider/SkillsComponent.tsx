'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/context/UserContext/UserContext'

import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import { TiDelete } from 'react-icons/ti'
import Link from 'next/link'

import axios from 'axios'

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
    const res = await axios.get('/api/skills')
    if (res.status !== 200) {
      throw new Error('failed to fetch the skills')
    }
    return res.data
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
        console.log('failed to fetch the skills data')
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
    <div className='mt-2 flex flex-col items-center'>
      <div
        id='skills'
        className='relative flex h-[550px] py-4  md:rounded-3xl md:border md:border-[#a5a4a8]/40 md:bg-[#F8F8F8]/10 md:px-10 md:shadow-inner md:shadow-purple-700/70 md:backdrop-blur-md'
      >
        <div className='flex w-full flex-col'>
          <div className='relative my-3 flex justify-center text-2xl drop-shadow lg:my-5 lg:text-7xl'>
            Skills
            <div className='absolute right-0 top-10 text-sm '>
              <DrawOutlineButton
                onClick={() => {
                  handleAddSkill()
                }}
              >
                Add Skill &emsp; +
              </DrawOutlineButton>
            </div>
          </div>

          <Tabs>
            <TabList className='mt-20 flex flex-col sm:flex-row sm:items-start sm:justify-start lg:my-6'>
              {skills.map((element, index) => (
                <Tab key={index} className='ml-3 flex cursor-pointer px-1 '>
                  {element.skill}
                  <button className='ml-2 text-gray-900 hover:text-red-500' onClick={() => handleDeleteSkill(index)}>
                    <TiDelete />
                  </button>
                </Tab>
              ))}
            </TabList>

            {/* TabPanel */}
            <div className='flex gap-y-5 lg:gap-x-5 lg:gap-y-0'>
              <div className='flex w-[300px] flex-col md:w-[600px] lg:w-[800px] lg:flex-row lg:justify-between'>
                <div className='lg:w-[60%]'>
                  {skills.map((element, index) => (
                    <TabPanel key={index}>
                      <div className='size-full rounded-[20px]  p-4'>
                        <div className='flex flex-col lg:flex-row  lg:justify-between'>
                          <div className='w-full'>
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
                        <p className='my-4 lg:mt-0'>
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

                <div className='mt-4 rounded-[20px] p-3  lg:ml-2 lg:mt-0 lg:w-[45%]'>
                  <p className='mb-2 flex justify-center'>Specification</p>

                  {/* Condition for changing barchart chart and radar chart*/}
                  <div className='lg:block lg:w-full'>
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
            <div className='mt-4 '>
              <DrawOutlineButton type='submit'>Generate</DrawOutlineButton>
            </div>
            <div className='mt-4 '>
              <Link href='/hero3'>
                <DrawOutlineButton>Go To Home</DrawOutlineButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
