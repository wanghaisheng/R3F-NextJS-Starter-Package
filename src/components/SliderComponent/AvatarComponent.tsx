'use client'
import Image from 'next/image'

import { enqueueSnackbar } from 'notistack'

import { Avatar } from 'src/components/Avatar'
import { useUser } from '@/context/UserContext/UserContext'
import { useState, useEffect, useMemo } from 'react'
import FormModal2 from '../FormModal/Modal2'
import Avatar_creator from '@/components/avatar-creator/avatar'
import axios from 'axios'
import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

async function getAvatarById(id: string) {
  try {
    const res = await axios.get(`/api/internal/avatar/${id}`)
    if (res.status !== 200) {
      enqueueSnackbar('Failed to fetch the avatars', { autoHideDuration: 2500, variant: 'error' })
    }
    return res.data
  } catch (error) {
    enqueueSnackbar(error, { autoHideDuration: 2500, variant: 'error' })
  }
}

const guildData = [
  {
    guild_name: 'BUDDHA',
    symbol: '/guild/buddha.png',
    color: 'white',
    description: 'Buddha Vairocana Family (Space): Development, Engineering & ITAI Services',
    skills: ['Clear vision', 'leadership', 'adaptability', 'communication'],
    alignment: ['Strategic', 'planning', 'project management', 'problem-solving'],
    additionalSkills: ['Innovation', 'data analysis', 'research'],
  },
  {
    guild_name: 'VAJRA',
    symbol: '/guild/vajra.png',
    color: 'blue',
    description: 'Vajra Family (Water): All Departments & ITAI Services',
    skills: ['Wisdom', 'clarity', 'calmness', 'emotional intelligence'],
    alignment: ['Leadership across departments', 'conflict resolution', 'team building'],
    additionalSkills: ['Active listening', 'problem-solving from multiple perspectives'],
  },
  {
    guild_name: 'KARMA',
    symbol: '/guild/karma.png',
    color: 'green',
    description: 'Karma Family (Wind): Sales & Marketing',
    skills: ['Action-oriented', 'perseverance', 'resourcefulness', 'decisiveness'],
    alignment: ['Sales strategy', 'negotiation', 'marketing campaigns', 'lead generation'],
    additionalSkills: ['Public speaking', 'persuasion', 'social media expertise'],
  },
  {
    guild_name: 'RATNA',
    symbol: '/guild/ratna.png',
    color: 'yellow',
    description: 'Ratna Family (Earth): Admin & Customer Support',
    skills: ['Stability', 'reliability', 'patience', 'empathy'],
    alignment: ['Operations management', 'customer service', 'finance', 'human resources'],
    additionalSkills: ['Organization', 'detail-orientation', 'conflict resolution'],
  },
  {
    guild_name: 'PADMA',
    symbol: '/guild/padma.png',
    color: 'red',
    description: 'Padma Family (Fire): Design & Creative (Working Class)',
    skills: ['Creativity', 'passion', 'discernment', 'inspiration'],
    alignment: ['Product design', 'brand development', 'content creation', 'innovation'],
    additionalSkills: ['Storytelling', 'user experience (UX) design', 'trend analysis'],
  },
]

export default function AvatarComponent({ onNextButtonClick, onPrevButtonClick, isSmallScreen }) {
  const { user } = useUser()
  const [avatarsData, setAvatarsData] = useState([])
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const openCardModal = () => {
    setIsCardModalOpen(true)
  }
  useEffect(() => {
    const fetchAvatarsData = async () => {
      try {
        const testData = await getAvatarById(user.gg_id)
        setAvatarsData(testData)
      } catch (error) {
        enqueueSnackbar(error, { autoHideDuration: 2500, variant: 'error' })
      }
    }
    if (user) {
      fetchAvatarsData() // Fetch data only if user is available and avatarsData is empty
    }
  }, [user])
  const memoizedAvatarsData = useMemo(() => avatarsData, [avatarsData]) // Memoize the avatars data to prevent re-rendering

  const [selectedGuild, setSelectedGuild] = useState(guildData[0].guild_name)
  useEffect(() => {
    const setGuild = () => {
      if (user.guilds.length !== 0) {
        setSelectedGuild(user.guilds[0].guild_name)
      }
    }
    if (user) {
      setGuild()
    }
  }, [user])
  const [index, setIndex] = useState(0)
  const selectedGuildData = guildData.find((guild) => guild.guild_name === selectedGuild)
  useEffect(() => {
    const getIndex = guildData.findIndex((guild) => guild.guild_name === selectedGuild)
    setIndex(getIndex)
  }, [guildData, selectedGuild])
  const checkUserGuild = () => {
    if (user.guilds.length !== 0) {
      return true
    }
    return false
  }
  const handleGuildSubmit = async (e: any) => {
    e.preventDefault()
    const submit = {
      description: guildData[index].description,
      guild_name: guildData[index].guild_name,
      avatar_img: user.avatar.avatar_img,
      soft_skills: guildData[index].skills,
      color: guildData[index].color,
      additional_skills: guildData[index].additionalSkills,
      alignment: guildData[index].alignment,
      symbol: guildData[index].symbol,
      gg_id: user.gg_id,
    }
    try {
      await axios({
        url: '/api/internal/guilds',
        method: 'POST',
        data: submit,
      })
      enqueueSnackbar('Generated Sucessfully', {
        autoHideDuration: 2000,
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Generation Failed', {
        autoHideDuration: 2000,
        variant: 'error',
      })
    }
  }
  const handleGuildUpdate = async (e: any) => {
    e.preventDefault()
    const submit = {
      description: guildData[index].description,
      guild_name: guildData[index].guild_name,
      avatar_img: user.avatar.avatar_img,
      soft_skills: guildData[index].skills,
      color: guildData[index].color,
      additional_skills: guildData[index].additionalSkills,
      alignment: guildData[index].alignment,
      symbol: guildData[index].symbol,
      gg_id: user.gg_id,
    }
    try {
      await axios({
        url: `/api/internal/guilds/${user.guilds[0].id}`,
        method: 'PUT',
        data: submit,
      })
      enqueueSnackbar('Updated Sucessfully', {
        autoHideDuration: 2000,
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Update Failed', {
        autoHideDuration: 2000,
        variant: 'error',
      })
    }
  }
  const [modelSrc, setModelSrc] = useState('')
  useEffect(() => {
    if (avatarsData.length > 0) {
      setModelSrc(avatarsData[avatarsData.length - 1].avatar_url)
    }
  }, [avatarsData])
  return (
    <div className='-ml-3 mb-12 mt-2 flex flex-col items-center md:ml-0 lg:mb-0'>
      <div
        id='My Avatar'
        className='relative flex h-[1055px] w-[300px] flex-col rounded bg-[#F5F5F5] py-4 md:w-[600px] md:rounded-3xl  md:px-10 md:shadow-md md:backdrop-blur-md lg:h-[550px] lg:w-[800px] dark:bg-transparent md:dark:bg-black/10'
      >
        <div className='flex w-full flex-col'>
          <div className='relative my-3 flex justify-center text-2xl font-semibold text-purple-950 drop-shadow lg:my-5 lg:text-5xl dark:text-purple-200'>
            AVATAR & GUILDS
          </div>

          <div className='mt-5 rounded-[20px] '>
            <div className='flex flex-col lg:flex-row lg:justify-between'>
              {/* Avatar and AvatarImageComponent Container */}
              <div className='flex flex-col items-center justify-center lg:w-[35%]'>
                {memoizedAvatarsData && memoizedAvatarsData.length != 0 ? (
                  <div className='relative'>
                    <Avatar
                      key={modelSrc}
                      // modelSrc={`${avatarsData.slice(-1)[0].avatar_url}`}
                      modelSrc={modelSrc}
                      // shadows
                      animationSrc='/male-idle-3.fbx'
                      style={{ background: 'rgb(9,20,26)', width: '350px', height: '350px', pointerEvents: 'none' }}
                      fov={40}
                      cameraTarget={1.5}
                      cameraInitialDistance={30}
                      effects={{
                        ambientOcclusion: true,
                      }}
                    />
                  </div>
                ) : (
                  <div className='relative'>
                    <Avatar
                      modelSrc='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0'
                      // shadows
                      animationSrc='/male-idle-3.fbx'
                      style={{ background: 'rgb(9,20,26)', width: '350px', height: '350px', pointerEvents: 'none' }}
                      fov={40}
                      cameraTarget={1.5}
                      cameraInitialDistance={30}
                      effects={{
                        ambientOcclusion: true,
                      }}
                    />
                  </div>
                )}
              </div>
              {/* Guilds Component */}
              <div className='size-full p-4 lg:w-[65%]'>
                {/* GUILDS SELECTION */}
                <div className='flex h-full flex-col lg:flex-row lg:items-center lg:justify-between'>
                  {/* {user && checkUserGuild() !== true ? ( */}
                  <form onSubmit={user && checkUserGuild() !== true ? handleGuildSubmit : handleGuildUpdate}>
                    <label
                      htmlFor='guilds'
                      className='flex justify-center text-lg font-semibold text-gray-700 lg:-mt-8 lg:text-xl'
                    >
                      <Image src='/guildlogo.svg' height={130} width={130} alt='guild logo' />
                    </label>
                    <div className='relative my-4 flex items-center justify-center gap-4 lg:my-0 lg:flex-col lg:gap-y-1 '>
                      {guildData.map((guild, index) => (
                        <div key={index} className='group lg:relative'>
                          <label htmlFor={guild.guild_name} className='cursor-pointer'>
                            <p
                              className={`rounded-full transition-transform duration-500 ${selectedGuild === guild.guild_name ? 'rotate-180 scale-75 border-4 border-pink-400' : 'rotate-0'}`}
                            >
                              <Image src={`${guild.symbol}`} alt='' height={42} width={42} />
                            </p>
                          </label>
                          <input
                            type='radio'
                            id={guild.guild_name.toString()}
                            name='guild'
                            value={`Guild ${guild.guild_name}`}
                            className='hidden'
                            checked={selectedGuild === guild.guild_name}
                            onChange={() => setSelectedGuild(guild.guild_name)}
                            aria-label='Guild Selection'
                          />
                        </div>
                      ))}
                    </div>
                    {/* Next and Update Button */}
                    {!isSmallScreen ? (
                      <>
                        <div className='mt-4 flex justify-center'>
                          <DrawOutlineButton type='submit' aria-label='generate/update'>
                            {user && checkUserGuild() !== true ? 'Generate' : 'Update'}
                          </DrawOutlineButton>
                        </div>
                        <div className='absolute bottom-4 right-4'>
                          <button
                            className='rounded-full bg-black transition-all duration-150 hover:scale-105 hover:bg-gray-500 dark:bg-purple-400/20 hover:dark:bg-purple-300/30'
                            type='submit'
                            onClick={onNextButtonClick}
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
                        <DrawOutlineButton type='submit' onClick={onNextButtonClick} aria-label='next slide'>
                          Next
                        </DrawOutlineButton>
                      </div>
                    )}
                  </form>

                  {selectedGuildData && (
                    <div
                      className='relative h-80 rounded-lg border text-purple-950 lg:ml-4 lg:w-72 dark:text-gray-300'
                      style={{ borderColor: selectedGuildData.color }}
                    >
                      <div className='absolute -right-3 -top-3 scale-125'>
                        <h2 className='font-bold'>
                          <Image src={`${selectedGuildData.symbol}`} alt='' height={36} width={36} />
                        </h2>
                      </div>
                      <div className='p-2'>
                        <h3 className='text-lg font-bold' style={{ color: selectedGuildData.color }}>
                          {selectedGuildData.guild_name}
                        </h3>
                        <p className='text-sm '>{selectedGuildData.description}</p>
                      </div>
                      <div className='flex justify-between p-2'>
                        <div>
                          <h3 className='text-lg font-semibold'>Skills</h3>
                          <p className='text-sm '>{selectedGuildData.skills.join(', ')}</p>
                        </div>
                        <div>
                          <h3 className='text-sm font-semibold'>Additional Skills</h3>
                          <p className='text-sm '>{selectedGuildData.additionalSkills.join(', ')}</p>
                        </div>
                      </div>
                      <div className='p-2'>
                        <h3 className='text-lg font-semibold'>Alignment</h3>
                        <p className='text-sm '>{selectedGuildData.alignment.join(', ')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              className={`absolute transition-all duration-200 ${!isSmallScreen ? 'left-96 top-96 lg:left-20 lg:mt-14 ' : 'top-96 flex w-full justify-center'}`}
            >
              <DrawOutlineButton
                onClick={() => {
                  setIsCardModalOpen(true)
                }}
              >
                Create Avatar &emsp; +
              </DrawOutlineButton>
            </div>
            {isCardModalOpen && (
              <div className='absolute left-0 top-0 z-50 flex size-full items-center justify-center rounded-lg bg-black/80'>
                <FormModal2 show={isCardModalOpen} onclose={setIsCardModalOpen}>
                  <Avatar_creator />
                </FormModal2>
              </div>
            )}

            {/* Back Button */}
            <div>
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
      </div>
    </div>
  )
}
