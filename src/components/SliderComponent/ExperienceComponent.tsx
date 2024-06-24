'use client'

import toast from 'react-hot-toast'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
// import { useUser } from '@/context/UserContext/UserContext'
import { useUser } from '@/UserClientProvider'
import { TiDelete } from 'react-icons/ti'
import ExperienceFlipCard from '../card/experienceFlipCard'
import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'
import axios from 'axios'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { IoHome } from 'react-icons/io5'
import InputFormForExperience from './Forms/InputFormForExperience'
import Image from 'next/image'
import { FileUploaderRegular } from '@uploadcare/react-uploader'
import '@uploadcare/react-uploader/core.css'

export default function ExperienceComponent({ onNextButtonClick, onPrevButtonClick, isSmallScreen }) {
  const { user } = useUser()
  const router = useRouter()
  const [projects, setProjects] = useState([
    {
      experience_id: '',
      type: '',
      name: '',
      description: '',
      tools: [],
      project_skills: [],
      project_pictures: [],
      link: '',
    },
  ])
  const [imageUrls, setImageUrls] = useState([])
  const formRefs = useRef([])
  // fetch experience data

  useEffect(() => {
    const fetchExpData = () => {
      try {
        if (user.experience.length !== 0) {
          setProjects(user.experience)
        }
      } catch (error) {
        toast.error(error)
      }
    }
    if (user) {
      fetchExpData() // Fetch data only if user is available
    }
  }, [user])
  function checkActiveExp(element) {
    return element.gg_id === user.gg_id
  }
  const handleExpSubmit = async (e: any, index: number) => {
    e.preventDefault()
    const submit = {
      gg_id: user.gg_id,
      type: projects[index].type,
      name: projects[index].name,
      description: projects[index].description,
      tools: projects[index].tools,
      project_skills: projects[index].project_skills,
      project_picture: imageUrls.length !== 0 ? imageUrls[imageUrls.length - 1] : '',
      link: projects[index].link,
    }
    try {
      await axios({
        url: `/api/internal/experience`,
        method: 'POST',
        data: submit,
      })
      toast.success('Generated Sucessfully')
      onNextButtonClick() // Move to next slide after successful generation
    } catch (error) {
      toast.error('Failed to Generate')
    }
  }
  const handleExpUpdate = async (e: any, index: number, experience_id) => {
    e.preventDefault()
    const submit = {
      gg_id: user.gg_id,
      type: projects[index].type,
      name: projects[index].name,
      description: projects[index].description,
      tools: projects[index].tools,
      project_skills: projects[index].project_skills,
      link: projects[index].link,
    }
    try {
      await axios({
        url: `/api/internal/experience/${experience_id}`,
        method: 'PUT',
        data: submit,
      })
      toast.success('Updated Sucessfully')
      onNextButtonClick() // Move to next slide after successful update
    } catch (error) {
      toast.error('Update Failed')
    }
  }
  const handleExpDelete = async (experience_id) => {
    try {
      await axios({
        url: `/api/internal/experience/${experience_id}`,
        method: 'DELETE',
      })
      toast.success('Deleted Sucessfully')
    } catch (error) {
      // toast.error('Deletion Failed') ---> to be fixed
      //
    }
  }
  const handleProjectNameChange = (index, newName) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects]
      updatedProjects[index].name = newName
      return updatedProjects
    })
  }
  const handleImageUrlsChange = (newUrls) => {
    setImageUrls(newUrls)
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
      {
        experience_id: '',
        type: '',
        name: 'Project Name',
        description: '',
        project_skills: [],
        project_pictures: [],
        tools: [],
        link: '',
      },
    ])
  }
  const handleDeleteProject = (index, experience_id) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects]
      updatedProjects.splice(index, 1)
      if (experience_id) {
        handleExpDelete(experience_id)
      }
      return updatedProjects
    })
  }
  const handleSkillsChange = (index, newSkills) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects]
      updatedProjects[index].project_skills = newSkills
      return updatedProjects
    })
  }

  const handleProjectPictureChange = (index, newProjectPicture) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects]
      updatedProjects[index].project_pictures = newProjectPicture
      return updatedProjects
    })
  }

  const handleToolsChange = (index, newTools) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects]
      updatedProjects[index].tools = newTools
      return updatedProjects
    })
  }
  const handleProjectLinkChange = (index, newLink) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects]
      updatedProjects[index].link = newLink
      return updatedProjects
    })
  }
  const handleHomeClick = async (index) => {
    const form = formRefs.current[index]
    const isSubmitted = await (form
      ? form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
      : true)
    if (isSubmitted) {
      router.push('/hud') // Use router.push to navigate
    }
  }
  return (
    <div className='-ml-3 mb-12 mt-2 flex flex-col items-center md:mb-0 md:ml-0'>
      <div className='relative flex h-[1055px] w-[300px] flex-col rounded bg-[#F5F5F5]/20 py-4 md:w-[600px] md:rounded-3xl md:px-10 md:shadow-md md:backdrop-blur-md lg:h-[550px] lg:w-[800px] dark:bg-transparent md:dark:bg-black/10 dark:md:shadow-purple-700'>
        <div className='flex h-screen w-full flex-col '>
          <div className='relative my-3 flex justify-center text-2xl font-semibold text-purple-200 drop-shadow lg:my-5 lg:text-5xl'>
            EXPERIENCE
            <div className='absolute top-10 text-sm lg:right-0'>
              <DrawOutlineButton
                onClick={() => {
                  handleAddProject()
                }}
                aria-label='add project button'
              >
                Add Project &emsp; +
              </DrawOutlineButton>
            </div>
          </div>
          <Tabs>
            {/* TabList */}
            <TabList className='mt-20 flex overflow-x-auto  sm:items-start sm:justify-start lg:my-6'>
              {projects.map((project, index) => (
                <Tab key={index} className='ml-3 flex cursor-pointer  whitespace-nowrap px-1 text-purple-200'>
                  {project.name}
                  {index !== 0 && ( // Condition to check if it's not the first tab
                    <button
                      className='ml-2 text-gray-900 hover:text-red-500'
                      aria-label='delete button'
                      onClick={() => handleDeleteProject(index, project.experience_id)}
                    >
                      <TiDelete />
                    </button>
                  )}
                </Tab>
              ))}
            </TabList>
            {/* TabPanel */}
            {projects.map((project, index) => (
              <TabPanel key={index}>
                <div className='flex flex-col lg:flex-row lg:justify-between'>
                  {/* Card Image / Container */}
                  <div className='flex flex-col'>
                    <div className='flex justify-center'>
                      {project.project_skills && (
                        <ExperienceFlipCard
                          type={project.type}
                          projectName={project.name}
                          skills={project.project_skills.join(', ')}
                          toolsAndTech={project.tools.join(', ')}
                          imageUrl={
                            project.project_pictures
                              ? project.project_pictures[project.project_pictures.length - 1]
                              : ''
                          }
                        />
                      )}
                    </div>
                    {/* <Image
                      src={
                        project.project_pictures ? project.project_pictures[project.project_pictures.length - 1] : ''
                      }
                      alt='projPic'
                      height={170}
                      width={500}
                      unoptimized
                      className='rounded'
                    /> */}
                    <div className='mt-1 flex justify-center'>
                      <a
                        // href='https://quickslot.kinde.com/auth/cx/_:nav&m:login&psid:75967cd63ea14e95aeffecd5c6e34633'
                        href='#'
                        // target='_blank'
                        aria-label='booking button'
                      >
                        <DrawOutlineButton aria-label='booking button'>Booking Comming Soon!!</DrawOutlineButton>
                      </a>
                    </div>
                  </div>
                  {/* Form for user input */}
                  <div className='w-full lg:w-[50%] '>
                    <form
                      onSubmit={
                        user && checkActiveExp(project) !== true
                          ? (e) => handleExpSubmit(e, index)
                          : (e) => handleExpUpdate(e, index, project.experience_id)
                      }
                      className='mx-auto mt-4 flex w-full max-w-lg flex-col items-center justify-center'
                    >
                      <InputFormForExperience
                        exp_id={project.experience_id}
                        project={project}
                        handleProjectTypeChange={handleProjectTypeChange}
                        handleProjectNameChange={handleProjectNameChange}
                        handleProjectDescriptionChange={handleProjectDescriptionChange}
                        handleSkillsChange={handleSkillsChange}
                        handleToolsChange={handleToolsChange}
                        handleProjectLinkChange={handleProjectLinkChange}
                        handleImageUrlsChange={handleImageUrlsChange}
                        index={index}
                      />
                      {/* Next */}
                      {!isSmallScreen ? (
                        <>
                          <div className='absolute bottom-4 right-4'>
                            <button
                              className='mr-2 rounded-full bg-black transition-all  duration-150 hover:scale-105 hover:bg-gray-500 dark:bg-purple-400/20 hover:dark:bg-purple-300/30'
                              onClick={() => handleHomeClick(0)}
                              aria-label='home button'
                            >
                              <p className='p-4'>
                                <IoHome />
                              </p>
                            </button>
                            <button
                              className='rounded-full bg-black transition-all duration-150 hover:scale-105 hover:bg-gray-500 dark:bg-purple-400/20 hover:dark:bg-purple-300/30'
                              type='submit'
                              aria-label='next'
                            >
                              <p className='p-4'>
                                <FaArrowRight />
                              </p>
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className='absolute bottom-4 right-4 flex gap-x-1'>
                          <DrawOutlineButton onClick={() => handleHomeClick(0)} aria-label='home'>
                            <IoHome className='my-1' />
                          </DrawOutlineButton>

                          <DrawOutlineButton type='submit' aria-label='next slide'>
                            Next
                          </DrawOutlineButton>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </TabPanel>
            ))}
          </Tabs>
          {/* Back Button */}
          <div className='absolute bottom-4 left-4 mt-4'>
            {!isSmallScreen ? (
              <button
                className='rounded-full bg-black transition-all duration-150 hover:scale-105 hover:bg-gray-500 dark:bg-purple-400/20 hover:dark:bg-purple-300/30'
                onClick={onPrevButtonClick}
                aria-label='prev'
              >
                <p className='p-4'>
                  <FaArrowLeft />
                </p>
              </button>
            ) : (
              <DrawOutlineButton onClick={onPrevButtonClick} aria-label='prev'>
                Back
              </DrawOutlineButton>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
