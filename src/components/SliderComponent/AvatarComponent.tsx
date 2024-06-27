'use client'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { Avatar } from 'src/components/Avatar' //----------------> module not found error in my branch
// import { useUser } from '@/context/UserContext/UserContext'
import { useUser } from '@/UserClientProvider' //----------------> module not found error in my branch
import { useState, useEffect, useMemo } from 'react'
import FormModal2 from '../FormModal/Modal2'
import Avatar_creator from '@/components/avatar-creator/avatar' //----------------> module not found error in my branch
import axios from 'axios'
import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'
import { FaArrowRight } from 'react-icons/fa'
import { revalidateUser } from 'lib/actions'

async function getGuilds() {
  try {
    const res = await fetch('/api/internal/guilds')
    if (!res.ok) {
      toast.error('Failed to fetch guilds data')
    }
    return res.json()
  } catch (error) {
    toast.error('Failed to fetch guilds data')
    return [] // Return an empty array in case of error
  }
}

export default function AvatarComponent({ onNextButtonClick, onPrevButtonClick, isSmallScreen }) {
  const { user } = useUser()
  const [avatarsData, setAvatarsData] = useState([])
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [guildData, setGuildData] = useState([
    {
      id: '',
      guild_name: 'BUDDHA',
      symbol: '/guild/buddha.png',
      color: 'white',
      element: 'Space',
      description: 'Research, Development, Philosophy',
      skills: ['Clear vision', 'leadership', 'adaptability', 'communication'],
      alignment: ['Strategic', 'planning', 'project management', 'problem-solving'],
      additionalSkills: ['Innovation', 'data analysis', 'research'],
      faculty: [
        {
          faculty_name: 'research',
          faculty_description: '',
        },
        {
          faculty_name: 'philosophy',
          faculty_description: '',
        },
        {
          faculty_name: 'development',
          faculty_description: '',
        },
      ],
    },
    {
      id: '',
      guild_name: 'VAJRA',
      symbol: '/guild/vajra.png',
      color: 'blue',
      element: 'Water',
      description: 'Arts, Education , Law, Teaching',
      avatar_img: '',
      continent: '',
      skills: ['Wisdom', 'clarity', 'calmness', 'emotional intelligence'],
      alignment: ['Leadership across departments', 'conflict resolution', 'team building'],
      additionalSkills: ['Active listening', 'problem-solving from multiple perspectives'],
      faculty: [
        {
          faculty_name: 'arts',
          faculty_description: '',
        },
        {
          faculty_name: 'education',
          faculty_description: '',
        },
        {
          faculty_name: 'teaching',
          faculty_description: '',
        },
        {
          faculty_name: 'law',
          faculty_description: '',
        },
      ],
    },
    {
      id: '',
      guild_name: 'KARMA',
      symbol: '/guild/karma.png',
      color: 'green',
      element: 'Wind',
      description: 'IT, Engineering, Computer, Gamer',
      avatar_img: '',
      continent: '',
      skills: ['Action-oriented', 'perseverance', 'resourcefulness', 'decisiveness'],
      alignment: ['Sales strategy', 'negotiation', 'marketing campaigns', 'lead generation'],
      additionalSkills: ['Public speaking', 'persuasion', 'social media expertise'],
      faculty: [
        {
          faculty_name: 'information technology',
          faculty_description: '',
        },
        {
          faculty_name: 'engineering',
          faculty_description: '',
        },
        {
          faculty_name: 'gamer',
          faculty_description: '',
        },
        {
          faculty_name: 'computer',
          faculty_description: '',
        },
      ],
    },
    {
      id: '',
      guild_name: 'RATNA',
      symbol: '/guild/ratna.png',
      color: 'yellow',
      element: 'Earth',
      description: 'Management, Finance, Health',
      avatar_img: '',
      continent: '',
      skills: ['Stability', 'reliability', 'patience', 'empathy'],
      alignment: ['Operations management', 'customer service', 'finance', 'human resources'],
      additionalSkills: ['Organization', 'detail-orientation', 'conflict resolution'],
      faculty: [
        {
          faculty_name: 'management',
          faculty_description: '',
        },
        {
          faculty_name: 'finance',
          faculty_description: '',
        },
        {
          faculty_name: 'health',
          faculty_description: '',
        },
      ],
    },
    {
      id: '',
      guild_name: 'PADMA',
      symbol: '/guild/padma.png',
      color: 'red',
      element: 'Fire',
      description: 'Marketing, Designer, Content Creator',
      avatar_img: '',
      continent: '',
      skills: ['Creativity', 'passion', 'discernment', 'inspiration'],
      alignment: ['Product design', 'brand development', 'content creation', 'innovation'],
      additionalSkills: ['Storytelling', 'user experience (UX) design', 'trend analysis'],
      faculty: [
        {
          faculty_name: 'marketing',
          faculty_description: '',
        },
        {
          faculty_name: 'designer',
          faculty_description: '',
        },
        {
          faculty_name: 'content creator',
          faculty_description: '',
        },
      ],
    },
  ])
  const memoizedAvatarsData = useMemo(() => avatarsData, [avatarsData]) // Memoize the avatars data to prevent re-rendering
  const [selectedGuild, setSelectedGuild] = useState(guildData ? guildData[0].guild_name : 'BUDDHA') // Default selected guild is 'BUDDHA'
  const selectedGuildData = guildData ? guildData.find((guild) => guild.guild_name === selectedGuild) : null
  const [modelSrc, setModelSrc] = useState<string | null>(null)

  //GuildsData
  useEffect(() => {
    const fetchGuildData = async () => {
      try {
        const guildData = await getGuilds()
        setGuildData(guildData)
      } catch (error) {
        toast.error('Failed to set guild data')
      }
    }
    fetchGuildData()
  }, [])

  // For displaying user's guild
  useEffect(() => {
    const setUserGuild = async () => {
      const guild = guildData.find((guild) => guild.id === user.guild_id)
      if (guild) {
        setSelectedGuild(guild.guild_name)
      }
    }
    if (user && guildData.length > 0) {
      setUserGuild()
    }
  }, [user, guildData])

  // AvatarsData
  useEffect(() => {
    const fetchAvatarsData = async () => {
      try {
        setAvatarsData(user.avatar)
      } catch (error) {
        toast.error('Failed to set avatar data')
      }
    }
    if (user) {
      fetchAvatarsData() // Fetch data only if user is available and avatarsData is empty
    }

    // Set interval to fetch avatar data every 7 seconds
    const intervalId = setInterval(fetchAvatarsData, 7000)
    return () => clearInterval(intervalId) // Clear interval on component unmount
  }, [user])

  // This useEffect will run whenever `avatarsData` changes.
  // It updates the `modelSrc` state, which will trigger a re-render.
  useEffect(() => {
    if (avatarsData && avatarsData.length > 0) {
      setModelSrc(avatarsData[avatarsData.length - 1].avatar_url)
    }
  }, [avatarsData])

  const handleGuildUpdate = async (e: any) => {
    e.preventDefault()
    try {
      const submit = {
        guild_id: selectedGuildData.id,
      }
      console.log(submit)
      await axios({
        url: `/api/internal/users/${user.gg_id}`,
        method: 'PUT',
        data: submit,
      })
      revalidateUser()
      toast.success('user guild updated')
      onNextButtonClick()
    } catch (error) {
      toast.error('Failed to update user guild')
    }
  }

  return (
    <div className='-ml-3 mb-12 mt-2 flex flex-col items-center md:ml-0 lg:mb-0'>
      <div
        id='My Avatar'
        className='relative flex h-[1055px] w-[300px] flex-col rounded bg-[#F5F5F5]/20 py-4 md:w-[600px] md:rounded-3xl md:px-10  md:shadow-md md:backdrop-blur-md lg:h-[550px] lg:w-[800px] dark:bg-transparent md:dark:bg-black/10 dark:md:shadow-purple-700'
      >
        <div className='flex w-full flex-col'>
          <div className='relative my-3 flex justify-center text-2xl font-semibold text-purple-200 drop-shadow lg:my-5 lg:text-5xl'>
            FAMILY
          </div>

          <div className='mt-5 rounded-[20px] '>
            <div className='flex flex-col lg:flex-row lg:justify-between'>
              {/* Avatar and AvatarImageComponent Container */}
              <div className='flex flex-col items-center justify-center lg:w-[35%]'>
                {memoizedAvatarsData && modelSrc && memoizedAvatarsData.length != 0 ? (
                  <div className='relative'>
                    <Avatar
                      key={modelSrc}
                      modelSrc={modelSrc}
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
                  <form onSubmit={handleGuildUpdate}>
                    <label
                      htmlFor='guilds'
                      className='flex justify-center text-lg font-semibold text-gray-700 lg:-mt-8 lg:text-xl'
                    >
                      <Image src='/guildlogo.svg' height={130} width={130} alt='guild logo' />
                    </label>
                    <div className='relative my-4 flex items-center justify-center gap-4 lg:my-0 lg:flex-col lg:gap-y-1 '>
                      {guildData?.map((guild, index) => (
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
                    {/* Next Button */}
                    {!isSmallScreen ? (
                      <>
                        <div className='absolute bottom-4 right-4'>
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
                        <DrawOutlineButton type='submit' aria-label='next slide'>
                          Next
                        </DrawOutlineButton>
                      </div>
                    )}
                  </form>

                  {selectedGuildData && (
                    <div
                      className='relative h-80 rounded-lg border text-gray-300 lg:ml-4 lg:w-72'
                      style={{ borderColor: selectedGuildData.color }}
                    >
                      <div className='absolute -right-3 -top-3 scale-125'>
                        <h2 className='font-bold'>
                          <Image src={`${selectedGuildData.symbol}`} alt='' height={36} width={36} />
                        </h2>
                      </div>
                      <div className='p-2'>
                        <h3 className='absolute -top-7 text-xl font-bold' style={{ color: selectedGuildData.color }}>
                          {selectedGuildData.guild_name}
                        </h3>
                        <p className='mt-3 text-xl font-bold text-white'>{selectedGuildData.description}</p>
                      </div>
                      <div className='absolute -right-14 top-20 z-0 hidden w-1/4 items-start justify-center lg:flex lg:flex-col'>
                        <div className=' flex flex-col items-center justify-center p-4 text-lg font-extrabold'>
                          {selectedGuildData.element.split('').map((letter, index) => (
                            <span key={index} style={{ color: selectedGuildData.color }}>
                              {letter.toUpperCase()}
                            </span>
                          ))}
                        </div>
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
                Create Avatar   +
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
            {/* <div>
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
