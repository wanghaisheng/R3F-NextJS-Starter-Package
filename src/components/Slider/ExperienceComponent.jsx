'use client'

import { motion } from 'framer-motion'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import { useState } from 'react'
import FormModal2 from '@/components/FormModal/Modal2'

export default function ExperienceComponent() {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [projects, setProjects] = useState([
    { name: 'Project 1', description: 'lorem', skills: ['CSS', 'HTML'], tools: ['VSCODE'] },
    { name: 'Project 2', description: 'lorem', skills: ['REACT.JS', 'NEXT.JS'], tools: ['VSCODE', 'FIGMA'] },
    { name: 'Project 3', description: 'lorem', skills: ['JS', 'VUE'], tools: ['VSCODE', 'FIGMA', 'BLENDER'] },
  ])

  const handleProjectNameChange = (index, newName) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects]
      updatedProjects[index].name = newName
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
    setProjects((prevProjects) => [...prevProjects, { name: '', description: '', skills: [], tools: [] }])
  }

  const openCardModal = () => {
    setIsCardModalOpen(true)
  }

  const [open, setOpen] = useState(false)

  return (
    <div className='mt-10 flex size-full flex-col items-center'>
      <div className='relative flex h-fit w-[68%] rounded-3xl border  border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'>
        <div className='flex w-full flex-col '>
          <div className='flex justify-center text-7xl drop-shadow'>Experience</div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='absolute right-6 top-6 w-56 rounded-2xl border p-2 text-white shadow-md '
            onClick={() => {
              openCardModal(true)
            }}
          >
            Add New Project
          </motion.button>

          <FormModal2 show={isCardModalOpen} onClick={openCardModal} onclose={setIsCardModalOpen}>
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.3 }}
              className='my-4 flex w-fit items-center rounded-[20px] bg-black px-4 py-2 shadow-sm shadow-white'
            >
              <button onClick={handleAddProject}>Add New Skill</button>
            </motion.div>
            {projects.map((project, index) => (
              <div key={index}>
                <input
                  type='text'
                  value={project.name}
                  onChange={(e) => handleProjectNameChange(index, e.target.value)}
                  placeholder='Project Name'
                  className='rounded-md bg-white/20'
                />
                <input
                  type='text'
                  value={project.description}
                  onChange={(e) => handleProjectDescriptionChange(index, e.target.value)}
                  placeholder='Project Description'
                  className='rounded-md bg-white/20'
                />
                <input
                  type='text'
                  value={project.skills}
                  onChange={(e) => handleProjectSkillsChange(index, e.target.value)}
                  placeholder='Skills'
                  className='rounded-md bg-white/20'
                />
                <input
                  type='text'
                  value={project.tools}
                  onChange={(e) => handleProjectToolsChange(index, e.target.value)}
                  placeholder='Tools and Tech'
                  className='rounded-md bg-white/20'
                />
              </div>
            ))}
          </FormModal2>

          <Tabs>
            <TabList>
              {projects.map((project, index) => (
                <Tab key={index}> {project.name}</Tab>
              ))}
            </TabList>
            <div className='relative flex h-80 w-full gap-x-5 '>
              {projects.map((project, index) => (
                <TabPanel key={index}>
                  <div className='absolute flex w-full justify-between gap-x-5 rounded-[20px] border border-[#B5B5B5] bg-[#D9D9D9]/20 p-4'>
                    <div>
                      <img className=' rounded-t-lg object-cover' src='/image.png' alt='' width='400px' />
                    </div>
                    <div className='w-[50%]'>
                      <div className='flex justify-between'>
                        <h1 className='text-2xl font-bold'>{project.name}</h1>

                        <h1 className='text-xl font-semibold'>Educational</h1>
                      </div>
                      <p className='mt-4 '>{project.description}</p>
                      <p className='mt-4'>Skills : {project.skills}</p>
                      <p className='mt-4'>Tools and Tech : {project.tools}</p>
                      <p className='mt-5 text-sm'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consectetur dolores, veniam
                        reprehenderit dolore deleniti iure veritatis natus hic, minima quibusdam qui assumenda. Quod eum
                        veritatis, quos est illo iusto.
                      </p>
                    </div>
                  </div>
                </TabPanel>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
