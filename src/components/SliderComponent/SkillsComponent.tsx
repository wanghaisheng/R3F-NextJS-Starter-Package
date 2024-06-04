'use client'
import { enqueueSnackbar } from 'notistack'
import { useState, useEffect, useRef } from 'react'
import { useUser } from '@/context/UserContext/UserContext'
import { FaArrowLeft } from 'react-icons/fa6'
import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { TiDelete } from 'react-icons/ti'
import { IoHome } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

import axios from 'axios'
import SkillsChartComponent from './SkillsChartComponent'
import Link from 'next/link'
export default function SkillsComponent({ onPrevButtonClick, isSmallScreen }) {
  const { user } = useUser()
  const router = useRouter()
  const [skills, setSkills] = useState([{ gg_id: '', skill_id: '', skill_name: 'skill1', percentage: 0 }])
  const formRefs = useRef([])

  function checkExistingSkills(skill: string, exp_skills: string[][]): boolean {
    for (let i = 0; i < exp_skills.length; i++) {
      if (exp_skills[i].includes(skill)) {
        return true
      }
    }
    return false
  }
  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const skillsSet = new Set<string>() // Create a Set to store unique JSON strings
        if (user.experience.length !== 0) {
          const exp_skill_obj = {}
          const exp_skills = []
          user.skills.forEach((skillObj) => {
            // Add the skillObj to skillsSet
            skillsSet.add(
              JSON.stringify({
                gg_id: skillObj.gg_id,
                skill_id: skillObj.skill_id,
                skill_name: skillObj.skill[0].skill_name,
                percentage: skillObj.skill[0].percentage,
              }),
            )
            // Iterate over each skill element in skillObj.skill array
            skillObj.skill.forEach((element) => {
              // Add the skill name to exp_skills array
              exp_skills.push(element.skill_name)
              // Create an entry in exp_skill_obj for the skill percentage
              exp_skill_obj[element.skill_name] = element.percentage
              // Create an entry in exp_skill_obj for the skill_id
              exp_skill_obj[element.skill_name + '_id'] = skillObj.skill_id
            })
          })
          user.experience.forEach((element) => {
            if (element.project_skills.length !== 0) {
              element.project_skills.forEach((skill) => {
                if (!checkExistingSkills(skill, exp_skills)) {
                  skillsSet.add(
                    JSON.stringify({
                      gg_id: '',
                      skill_id: '',
                      skill_name: skill,
                      percentage: 0,
                    }),
                  ) // Add each object to the Set after converting it to a string
                } else {
                  skillsSet.add(
                    JSON.stringify({
                      gg_id: user.gg_id,
                      skill_id: exp_skill_obj[`${skill}` + '_id'],
                      skill_name: skill,
                      percentage: exp_skill_obj[`${skill}`],
                    }),
                  )
                }
              })
            }
          })
        }
        // Convert the Set back to an array of objects
        if (skillsSet.size !== 0) {
          const skillsArray = Array.from(skillsSet).map((strObj) => JSON.parse(strObj))
          setSkills(skillsArray)

          // console.log(skills)
        }
      } catch (error) {
        enqueueSnackbar(error, { autoHideDuration: 2500, variant: 'error' })
      }
    }
    if (user) {
      fetchSkillsData() // Fetch data only if user is available
    }
  }, [user])
  const checkActiveSkills = (element) => {
    return element.gg_id === user.gg_id
  }
  const handleSkillSubmit = async (e: any, index: number) => {
    e.preventDefault()
    const submit = {
      gg_id: user.gg_id,
      skill: {
        skill_name: skills[index].skill_name,
        percentage: skills[index].percentage,
      },
    }
    try {
      await axios({
        url: `/api/internal/skills`,
        method: 'POST',
        data: submit,
      })

      enqueueSnackbar('Generate Skills Successfully', { autoHideDuration: 2500, variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to generate skills', { autoHideDuration: 2500, variant: 'error' })
    }
  }
  const handleSkillUpdate = async (e: any, index: number) => {
    e.preventDefault()
    const submit = {
      skill: {
        skill_name: skills[index].skill_name,
        percentage: skills[index].percentage,
      },
    }
    try {
      await axios({
        url: `/api/internal/skills/${skills[index].skill_id}`,
        method: 'PUT',
        data: submit,
      })

      enqueueSnackbar('Skills updated', { autoHideDuration: 2500, variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to update skills', { autoHideDuration: 2500, variant: 'error' })
    }
  }
  const handleSkillDelete = async (index: number) => {
    try {
      await axios({
        url: `/api/internal/skills/${skills[index].skill_id}`,
        method: 'DELETE',
      })

      enqueueSnackbar('Skills deleted', { autoHideDuration: 2500, variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to delete skills', { autoHideDuration: 2500, variant: 'error' })
    }
  }
  const handleSkillNameChange = (index: number, newName: string) => {
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills]
      updatedSkills[index].skill_name = newName
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
    setSkills((prevSkills) => [...prevSkills, { gg_id: '', skill_id: '', skill_name: 'skill', percentage: 0 }])
  }
  const handleDeleteSkill = (index) => {
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills]
      updatedSkills.splice(index, 1)
      if (skills[index].skill_id.length != 0) {
        handleSkillDelete(index)
      }
      return updatedSkills
    })
  }
  const handleHomeClick = async (index) => {
    const form = formRefs.current[index]
    const isSubmitted = await (form
      ? form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
      : true)
    if (isSubmitted) {
      // router.refresh()
      // router.push('/hero')
      window.location.href = '/hero'
    }
  }
  return (
    <div className='-ml-3 mb-12 mt-2 flex flex-col items-center md:ml-0 lg:mb-0'>
      <div
        id='card'
        className='relative flex h-[770px] w-[300px] flex-col bg-violet-300 py-4 md:w-[600px] md:rounded-3xl md:px-10 md:shadow-md md:shadow-purple-700 md:backdrop-blur-md lg:h-[550px] lg:w-[800px] dark:bg-transparent md:dark:bg-black/10'
      >
        <div className='flex w-full flex-col'>
          <div className='relative my-3 flex justify-center text-2xl font-semibold text-purple-950 drop-shadow lg:my-5 lg:text-5xl dark:text-purple-200'>
            SKILLS STATS
            <div className='absolute right-0 top-10 text-sm '>
              <DrawOutlineButton
                onClick={() => {
                  handleAddSkill()
                }}
                aria-label='add skill button'
              >
                Add Skill &emsp; +
              </DrawOutlineButton>
            </div>
          </div>
          <Tabs>
            <TabList className='mt-20 grid grid-cols-3 lg:my-6 lg:grid-cols-6'>
              {skills.map((element, index) => (
                <Tab key={index} className='ml-3 flex cursor-pointer px-1 text-purple-950 dark:text-purple-200'>
                  {element.skill_name}
                  {index !== 0 && (
                    <button
                      aria-label='delete'
                      className='ml-2 text-gray-900 hover:text-red-500'
                      onClick={() => handleDeleteSkill(index)}
                    >
                      <TiDelete />
                    </button>
                  )}
                </Tab>
              ))}
            </TabList>
            {/* TabPanel */}
            <div className='flex flex-col gap-y-5 lg:flex-row lg:gap-x-5 lg:gap-y-0'>
              <div className='w-[300px] text-purple-950 md:w-[500px] lg:w-[60%] dark:text-purple-200'>
                {skills.map((element, index) => (
                  <div key={index}>
                    <form
                      onSubmit={
                        user && checkActiveSkills(element) != true
                          ? (e) => handleSkillSubmit(e, index)
                          : (e) => handleSkillUpdate(e, index)
                      }
                    >
                      <TabPanel>
                        <div className='size-full rounded-[20px]  p-4'>
                          <div className='flex flex-col lg:flex-row  lg:justify-between'>
                            <div className='w-full'>
                              <input
                                type='text'
                                value={element.skill_name}
                                onChange={(e) => handleSkillNameChange(index, e.target.value)}
                                placeholder='Skill Name'
                                className='w-full rounded-md bg-white/70 p-1 dark:bg-white/20'
                                aria-label='skill name'
                              />
                              <div className='my-4 flex'>
                                <input
                                  type='range'
                                  min='0'
                                  max='100'
                                  value={element.percentage}
                                  className='w-full rounded-md bg-purple-600'
                                  onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
                                  aria-label='slider'
                                />
                                <p className='pl-2 text-sm text-purple-950 dark:text-purple-200'>
                                  {element.percentage}%
                                </p>
                              </div>
                            </div>
                          </div>
                          <label className='text-gray-900 dark:text-purple-200' htmlFor='file_input'>
                            Certifications
                          </label>
                          <input
                            className='block w-full cursor-pointer rounded-lg bg-white/70 text-sm text-gray-900 focus:outline-none dark:bg-white/20 dark:text-gray-400 dark:placeholder:text-gray-400'
                            id='file_input'
                            type='file'
                            aria-label='file input'
                          />
                        </div>
                        {/* Go Home and Generate Button */}
                        {!isSmallScreen ? (
                          <>
                            <div className='mt-4 flex justify-center'>
                              <DrawOutlineButton type='submit' aria-label='generate/update'>
                                {user && checkActiveSkills(element) != true ? 'Generate' : 'Update'}
                              </DrawOutlineButton>
                            </div>
                            <div className='absolute bottom-4 right-4'>
                              <button
                                className='rounded-full bg-purple-950 transition-all  duration-150 hover:scale-105 hover:bg-purple-500 dark:bg-purple-400/20 hover:dark:bg-purple-300/30'
                                onClick={() => handleHomeClick(0)}
                                aria-label='home btn'
                              >
                                <p className='p-4 text-white'>
                                  <IoHome />
                                </p>
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className='absolute bottom-4 right-4'>
                            <DrawOutlineButton onClick={() => handleHomeClick(0)} aria-label='go to home page'>
                              Go To Home
                            </DrawOutlineButton>
                          </div>
                        )}
                      </TabPanel>
                    </form>
                  </div>
                ))}
              </div>
              <div className='mt-4 w-[300px] rounded-[20px] p-3 md:w-[500px]  lg:ml-2 lg:mt-0 lg:w-[45%]'>
                <p className='mb-2 flex justify-center text-purple-950 dark:text-purple-200'>Specification</p>

                {/* Condition for changing barchart chart and radar chart*/}
                <SkillsChartComponent skills={skills} />
              </div>
            </div>
          </Tabs>
          {/* Back Button */}
          <div className='absolute bottom-4 left-4 mt-4'>
            {!isSmallScreen ? (
              <button
                className='rounded-full bg-purple-950 transition-all duration-150 hover:scale-105 hover:bg-purple-500 dark:bg-purple-400/20 hover:dark:bg-purple-300/30'
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
