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

import { WithContext as ReactTags } from 'react-tag-input'

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
  const [projects, setProjects] = useState([
    { type: '', name: 'Project 1', description: 'lorem', skills: ['CSS', 'HTML'], tools: ['VSCODE'] },
  ])

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
      skills: projects[index].skills,
      tools: projects[index].tools,
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

  const handleProjectSkillsChange = (index, newSkills) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects]
      updatedProjects[index].skills = newSkills.split(',')
      return updatedProjects
    })
  }

  const handleProjectToolsChange = (index, newTools) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects]
      updatedProjects[index].tools = newTools
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

  return (
    <div className='mt-2 flex flex-col items-center'>
      <div
        id='experience'
        className='flex h-fit w-[68%] rounded-3xl border  border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'
      >
        <div className='flex w-full flex-col '>
          <div className='relative my-4 flex justify-center text-7xl font-semibold drop-shadow'>
            Experience
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='absolute bottom-0 right-0 w-fit rounded-full bg-black/10 p-2 text-sm text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:bg-violet-900'
              onClick={() => {
                handleAddProject()
              }}
            >
              Add New Project &emsp; +
            </motion.button>
          </div>

          <Tabs>
            {/* TabList */}
            <TabList className='my-6 flex flex-col sm:flex-row sm:items-start sm:justify-start '>
              {projects.map((project, index) => (
                <Tab key={index} className='flex cursor-pointer px-1'>
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
                <div className='rounded-[20px] border border-[#B5B5B5] bg-[#D9D9D9]/20 p-4'>
                  <div className='flex justify-between'>
                    {/* Card Image / Container */}
                    <div className='flex'>
                      <ExperienceFlipCard
                        type={project.type}
                        projectName={project.name}
                        skills={project.skills}
                        toolsAndTech={project.tools}
                      />
                    </div>

                    {/* Form for user input */}
                    <div className='w-[50%]'>
                      <form className='mx-auto mt-4 flex w-full max-w-lg flex-col items-center justify-center'>
                        <div className='flex w-full flex-col gap-y-2 px-4'>
                          <div className='flex items-center justify-between '>
                            <div>
                              <input
                                type='radio'
                                id='educational'
                                name='type'
                                value='educational'
                                checked={project.type === 'educational'}
                                onChange={(e) => handleProjectTypeChange(index, e.target.value)}
                              />
                              <label htmlFor='educational' className='ml-2 text-white'>
                                Educational
                              </label>
                            </div>
                            <div>
                              <input
                                type='radio'
                                id='work'
                                name='type'
                                value='work'
                                checked={project.type === 'work'}
                                onChange={(e) => handleProjectTypeChange(index, e.target.value)}
                              />
                              <label htmlFor='work' className='ml-2 text-white'>
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
                              />
                              <label htmlFor='gym' className='ml-2 text-white'>
                                Gym
                              </label>
                            </div>
                          </div>

                          <div className='flex justify-between'>
                            <label htmlFor=''>Name</label>
                            <input
                              type='text'
                              value={project.name}
                              onChange={(e) => handleProjectNameChange(index, e.target.value)}
                              placeholder='Project Name'
                              className='w-[70%] rounded-md bg-white/20 px-3'
                              required
                            />
                          </div>
                          <div className='flex justify-between'>
                            <label htmlFor=''>Description</label>
                            <input
                              type='text'
                              value={project.description}
                              onChange={(e) => handleProjectDescriptionChange(index, e.target.value)}
                              placeholder='Project Description'
                              className='w-[70%] rounded-md bg-white/20  px-3'
                            />
                          </div>
                          <div className='flex justify-between'>
                            <label className='text-gray-900 dark:text-white' htmlFor='file_input'>
                              ProjPic
                            </label>
                            <input
                              className='block w-[70%] cursor-pointer rounded-lg  bg-gray-50 text-sm text-gray-900 focus:outline-none  dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400'
                              id='file_input'
                              type='file'
                            />
                          </div>
                          <div className='flex justify-between'>
                            <label htmlFor=''>Skills</label>
                            <input
                              type='text'
                              value={project.skills}
                              onChange={(e) => handleProjectSkillsChange(index, e.target.value.split(','))}
                              placeholder='Project Skills'
                              className='w-[70%] rounded-md bg-white/20  px-3'
                              required
                            />
                          </div>
                          <div className='flex justify-between'>
                            <label htmlFor=''>Tools</label>
                            <input
                              type='text'
                              value={project.tools}
                              onChange={(e) => handleProjectToolsChange(index, e.target.value)}
                              placeholder='Project Description'
                              className='w-[70%] rounded-md bg-white/20  px-3'
                              required
                            />
                          </div>
                        </div>
                        {/* Submit button */}
                        <div className='flex gap-x-2'>
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
                            Skip
                          </Link>
                        </div>
                      </form>
                    </div>
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
