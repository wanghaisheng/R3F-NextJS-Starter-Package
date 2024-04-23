'use client'

import { motion } from 'framer-motion'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import { useState, useEffect } from 'react'
import { useUser } from '@/context/UserContext/UserContext'
import { TiDelete } from 'react-icons/ti'

import ExperienceFlipCard from '../card/experienceFlipCard'

import axios from 'axios'
import Link from 'next/link'

import { TagsInput } from 'react-tag-input-component'

async function getExpInfo() {
  try {
    const res = await fetch('http://localhost:3000/api/card')
    if (!res.ok) {
      throw new Error('failed to fetch the skills')
    }
    return res.json()
  } catch (error) {
    throw new Error('failed to fetch the skills')
  }
}

export default function ExperienceComponent() {
  const { user } = useUser()

  // For skills tag
  const [skills, setSkills] = useState([])

  // For tools tag
  const [tools, setTools] = useState([])

  const [projects, setProjects] = useState([{ type: '', name: 'Project 1', description: 'lorem' }])

  useEffect(() => {
    const fetchExpData = async () => {
      try {
        const testData = await getExpInfo() // Fetch cards data
        const filteredData = testData.filter((element: any) => element.gg_id === user.gg_id) // Filter data based on user

        if (filteredData.length != 0) {
          setProjects(filteredData) // Set the filtered data
        }
      } catch (error) {
        console.log('Error fetching cards data:', error)
      }
    }

    if (user) {
      fetchExpData() // Fetch data only if user is available
    }
  }, [user])

  const handleSkillSubmit = async (e: any, index: number) => {
    const submit = {
      gg_id: user.gg_id,
      type: projects[index].type,
      name: projects[index].name,
      description: projects[index].description,
    }
    try {
      await axios({
        url: `/api/skill`,
        method: 'POST',
        data: submit,
      })
      alert('card info saved')
      window.location.reload()
      return
    } catch (error) {
      throw new Error('failed to save the card info')
    }
  }

  const handleProjectNameChange = (index, newName) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects]
      updatedProjects[index].name = newName
      return updatedProjects
    })
  }

  const handleProjectTypeChange = (index, newType) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects]
      updatedProjects[index].type = newType
      return updatedProjects
    })
  }

  const handleProjectDescriptionChange = (index, newDescription) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects]
      updatedProjects[index].description = newDescription
      return updatedProjects
    })
  }

  const handleAddProject = () => {
    setProjects((prevProjects) => [
      ...prevProjects,
      { name: 'Project Name', type: '', description: '', skills: [], tools: [] },
    ])
  }

  const handleDeleteProject = (index) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects]
      updatedProjects.splice(index, 1)
      return updatedProjects
    })
  }

  // Animated Button
  const DrawOutlineButton = ({ children, ...rest }) => {
    return (
      <button
        {...rest}
        className='group relative rounded-md bg-purple-400/20 px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-purple-300'
      >
        <span>{children}</span>

        {/* TOP */}
        <span className='absolute left-0 top-0 h-[2px] w-0 bg-purple-300 transition-all duration-100 group-hover:w-full' />

        {/* RIGHT */}
        <span className='absolute right-0 top-0 h-0 w-[2px] bg-purple-300 transition-all delay-100 duration-100 group-hover:h-full' />

        {/* BOTTOM */}
        <span className='absolute bottom-0 right-0 h-[2px] w-0 bg-purple-300 transition-all delay-200 duration-100 group-hover:w-full' />

        {/* LEFT */}
        <span className='absolute bottom-0 left-0 h-0 w-[2px] bg-purple-300 transition-all delay-300 duration-100 group-hover:h-full' />
      </button>
    )
  }

  return (
    <div className='mt-2 flex flex-col items-center'>
      <div
        id='experience'
        className='flex h-fit w-[68%] rounded-xl border  border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'
      >
        <div className='flex w-full flex-col '>
          <div className='relative my-3 flex justify-center text-2xl drop-shadow md:my-8 md:text-7xl'>
            Experience
            <div className='absolute right-0 top-10 text-sm'>
              <DrawOutlineButton
                onClick={() => {
                  handleAddProject()
                }}
              >
                Add Project &emsp; +
              </DrawOutlineButton>
            </div>
          </div>

          <Tabs>
            {/* TabList */}
            <TabList className='mt-20 flex flex-col sm:flex-row sm:items-start sm:justify-start md:my-6'>
              {projects.map((project, index) => (
                <Tab key={index} className='ml-3 flex cursor-pointer px-1'>
                  {' '}
                  {project.name}
                  <button className='ml-2 text-gray-900 hover:text-red-500' onClick={() => handleDeleteProject(index)}>
                    <TiDelete />
                  </button>
                </Tab>
              ))}
            </TabList>

            {/* TabPanel */}
            {projects.map((project, index) => (
              <TabPanel key={index}>
                <div className='flex flex-col md:flex-row md:justify-between'>
                  {/* Card Image / Container */}
                  <div className='flex flex-col'>
                    <div className='flex'>
                      <ExperienceFlipCard
                        type={project.type}
                        projectName={project.name}
                        skills={skills.map((skill) => skill).join(', ')}
                        toolsAndTech={tools.map((tool) => tool).join(', ')}
                      />
                    </div>
                    <div className='mt-1 flex justify-center'>
                      <a
                        href='https://quickslot.kinde.com/auth/cx/_:nav&m:login&psid:75967cd63ea14e95aeffecd5c6e34633'
                        target='_blank'
                      >
                        <DrawOutlineButton>Booking</DrawOutlineButton>
                      </a>
                    </div>
                  </div>

                  {/* Form for user input */}
                  <div className='w-full md:w-[50%]'>
                    <form className='mx-auto mt-4 flex w-full max-w-lg flex-col items-center justify-center'>
                      <div className='flex w-full flex-col gap-y-2 px-4'>
                        <div className='flex flex-col items-center md:flex-row md:justify-between'>
                          <div>
                            <label
                              htmlFor='educational'
                              className={` ${project.type === 'educational' ? 'font-bold text-purple-400' : 'text-white hover:text-purple-400'}`}
                            >
                              Educational
                            </label>
                            <input
                              type='radio'
                              id='educational'
                              name='type'
                              value='educational'
                              checked={project.type === 'educational'}
                              onChange={(e) => handleProjectTypeChange(index, e.target.value)}
                              className='hidden'
                            />
                          </div>
                          <div>
                            <input
                              type='radio'
                              id='work'
                              name='type'
                              value='work'
                              checked={project.type === 'work'}
                              onChange={(e) => handleProjectTypeChange(index, e.target.value)}
                              className='hidden'
                            />
                            <label
                              htmlFor='work'
                              className={`${project.type === 'work' ? 'font-bold text-purple-400' : 'text-white hover:text-purple-400'}`}
                            >
                              Work
                            </label>
                          </div>
                          <div>
                            <input
                              type='radio'
                              id='gym'
                              name='type'
                              value='gym'
                              checked={project.type === 'gym'}
                              onChange={(e) => handleProjectTypeChange(index, e.target.value)}
                              className='hidden'
                            />
                            <label
                              htmlFor='gym'
                              className={` ${project.type === 'gym' ? 'font-bold text-purple-400' : 'text-white hover:text-purple-400'}`}
                            >
                              Gym
                            </label>
                          </div>
                        </div>

                        <div className='mt-4 flex flex-col md:mt-0 md:flex-row md:justify-between'>
                          <label htmlFor='projectName'>Name</label>
                          <input
                            id='projectName'
                            type='text'
                            value={project.name}
                            onChange={(e) => handleProjectNameChange(index, e.target.value)}
                            placeholder='Project Name'
                            className='rounded-md bg-white/20 px-3 md:w-[70%]'
                            required
                          />
                        </div>
                        <div className='flex flex-col md:flex-row md:justify-between'>
                          <label htmlFor='description'>Description</label>
                          <input
                            id='description'
                            type='text'
                            value={project.description}
                            onChange={(e) => handleProjectDescriptionChange(index, e.target.value)}
                            placeholder='Project Description'
                            className='rounded-md bg-white/20 px-3  md:w-[70%]'
                          />
                        </div>
                        <div className='flex flex-col md:flex-row md:justify-between'>
                          <label className='text-gray-900 dark:text-white' htmlFor='file_input'>
                            ProjPic
                          </label>
                          <input
                            className='block cursor-pointer rounded-lg bg-gray-50  text-sm text-gray-900 focus:outline-none md:w-[70%]  dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400'
                            id='file_input'
                            type='file'
                          />
                        </div>
                        <div className='flex flex-col md:flex-row md:justify-between'>
                          <label htmlFor=''>Skills</label>
                          <div className='bg-gray-50 text-sm text-gray-900 focus:outline-none md:w-[70%]  dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400'>
                            <TagsInput value={skills} onChange={setSkills} name='skills' placeHolder='Enter skills' />
                          </div>
                        </div>
                        <div className='flex flex-col md:flex-row md:justify-between'>
                          <label htmlFor=''>Tools</label>
                          <div className='bg-gray-50 text-sm text-gray-900 focus:outline-none md:w-[70%]  dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400'>
                            <TagsInput value={tools} onChange={setTools} name='tools' placeHolder='Enter tools used' />
                          </div>
                        </div>
                      </div>
                      {/* Submit button */}
                      <div className='mt-4 flex gap-x-2'>
                        <div>
                          <DrawOutlineButton type='submit'>Generate</DrawOutlineButton>
                        </div>
                        <div>
                          <Link href='/hero3'>
                            <DrawOutlineButton>Skip</DrawOutlineButton>
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
