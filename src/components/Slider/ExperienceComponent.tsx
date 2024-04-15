'use client'

import { motion } from 'framer-motion'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import { useState } from 'react'

import ExperienceFlipCard from '../card/experienceFlipCard'

export default function ExperienceComponent() {
  const [projects, setProjects] = useState([
    { name: 'Project 1', type: 'Educational', description: 'lorem', skills: ['CSS', 'HTML'], tools: ['VSCODE'] },
    {
      name: 'Project 2',
      type: 'Work',
      description: 'lorem',
      skills: ['REACT.JS', 'NEXT.JS'],
      tools: ['VSCODE', 'FIGMA'],
    },
    {
      name: 'Project 3',
      type: 'Educational',
      description: 'lorem',
      skills: ['JS', 'VUE'],
      tools: ['VSCODE', 'FIGMA', 'BLENDER'],
    },
  ])

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
      updatedProjects[index].skills = newSkills
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

  return (
    <div className='mt-2 flex flex-col items-center'>
      <div className='flex h-fit w-[68%] rounded-3xl border  border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'>
        <div className='flex w-full flex-col '>
          <div className='relative my-4 flex justify-center text-7xl font-semibold drop-shadow'>
            Experience
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='absolute bottom-0 right-0 w-fit rounded-lg bg-black p-2 text-sm text-white shadow-md '
              onClick={() => {
                handleAddProject()
              }}
            >
              Add New Project &emsp;&emsp; +
            </motion.button>
          </div>

          <Tabs>
            {/* TabList */}
            <TabList className='my-6 flex flex-col sm:flex-row sm:items-start sm:justify-start '>
              {projects.map((project, index) => (
                <Tab key={index} className='flex pl-1 pr-5 '>
                  {' '}
                  {project.name}
                </Tab>
              ))}
            </TabList>

            {/* TabPanel */}
            {projects.map((project, index) => (
              <TabPanel key={index}>
                <div className='rounded-[20px] border border-[#B5B5B5] bg-[#D9D9D9]/20 p-4'>
                  <div className='flex justify-between'>
                    {/* Card Image / Container */}
                    {/* <div className='flex w-[50%] flex-col rounded-xl bg-black p-4 '>
                      <div translateZ='50' className='text-2xl font-bold text-neutral-600 dark:text-white'>
                        {project.name}
                      </div>
                      <div as='p' translateZ='60' className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'>
                        {project.type}
                      </div>
                      <div as='p' translateZ='60' className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'>
                        {project.description}
                      </div>
                      <div as='p' translateZ='60' className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'>
                        Skills : {project.skills}
                      </div>
                      <div as='p' translateZ='60' className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'>
                        Tools and Tech : {project.tools}
                      </div>
                    </div> */}

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
                      <form className='mx-auto flex w-full max-w-lg flex-col items-center justify-center'>
                        <div className='flex w-full flex-col gap-y-2 px-4'>
                          <div className='flex justify-between'>
                            <label htmlFor=''>Type</label>
                            <input
                              type='text'
                              value={project.type}
                              onChange={(e) => handleProjectTypeChange(index, e.target.value)}
                              placeholder='Card Type'
                              className='w-[70%] rounded-md bg-white/20 px-3'
                              required
                            />
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
                            <label htmlFor=''>Skills</label>
                            <input
                              type='text'
                              value={project.skills}
                              onChange={(e) => handleProjectSkillsChange(index, e.target.value)}
                              placeholder='Project Skills'
                              className='w-[70%] rounded-md bg-white/20  px-3'
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
                            />
                          </div>
                        </div>
                        {/* Submit button */}
                        <div>
                          <a
                            href='/hero3'
                            className='mt-4 rounded-xl bg-purple-700 px-4 py-2 font-bold text-white hover:bg-purple-500'
                          >
                            Skip
                          </a>
                          <button
                            type='submit'
                            className='ml-4 mt-4 rounded-xl bg-purple-700 px-4 py-2 font-bold text-white hover:bg-purple-500'
                          >
                            Generate
                          </button>
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
