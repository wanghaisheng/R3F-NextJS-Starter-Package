'use client'

import Image from 'next/image'

import { enqueueSnackbar } from 'notistack'

import { Avatar } from 'src/components/Avatar'
import { useUser } from '@/context/UserContext/UserContext'
import { useState, useEffect, useMemo } from 'react'
import AvatarImageComponent from '../avatarImage/page'
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

  const guildData = [
    {
      name: 'BUDDHA',
      symbol: (
        <svg width='42' height='42' viewBox='0 0 42 42' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='21' cy='21' r='21' fill='white' />
          <path
            d='M11.9603 9.4078L20.7682 11.13M11.9603 9.4078L6 19.6678M11.9603 9.4078L15.9338 6H27.1589L29.6093 9.4078M20.7682 11.13V21.8664M20.7682 11.13L29.6093 9.4078M20.7682 21.8664L11.9603 26.9965M20.7682 21.8664L29.6093 26.9965M11.9603 26.9965L6 19.6678M11.9603 26.9965L14.8079 37M6 19.6678V24.3215L10.6358 34.5449L14.8079 37M29.6093 9.4078L34.8742 19.6678M34.8742 19.6678L29.6093 26.9965M34.8742 19.6678L36 24.3215L30.9007 34.5449L27.1589 37M29.6093 26.9965L27.1589 37M14.8079 37H27.1589'
            stroke='black'
          />
        </svg>
      ),
      color: 'white',
      description: 'Buddha Vairocana Family (Space): Development, Engineering  & ITAI Services ',
      skills: 'Clear vision, leadership, adaptability, communication',
      alignment: 'Strategic planning, project management, problem-solving',
      additionalSkills: 'Innovation, data analysis, research',
    },
    {
      name: 'VAJRA',
      symbol: (
        <svg width='42' height='42' viewBox='0 0 42 42' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='21' cy='21' r='21' fill='#4A9BD5' />
          <path
            d='M20.3302 6L6 13.5085M20.3302 6L36 13.5085M20.3302 6V12.1433M6 13.5085V28.5256M6 13.5085L20.3302 12.1433M6 13.5085L11.3992 25.3174M6 28.5256L20.3302 36M6 28.5256L11.3992 25.3174M20.3302 36L36 28.5256M20.3302 36L11.3992 25.3174M20.3302 36L28.977 25.3174M36 28.5256V13.5085M36 28.5256L28.977 25.3174M36 13.5085L20.3302 12.1433M36 13.5085L28.977 25.3174M20.3302 12.1433L11.3992 25.3174M20.3302 12.1433L28.977 25.3174M11.3992 25.3174H28.977'
            stroke='#030303'
          />
        </svg>
      ),
      color: 'blue',
      description: ' Vajra Family (Water): All Departments ()  & ITAI Services',
      skills: ' Wisdom, clarity, calmness, emotional intelligence',
      alignment: 'Leadership across departments, conflict resolution, team building ',
      additionalSkills: 'Active listening, problem-solving from multiple perspectives',
    },
    {
      name: 'KARMA',
      symbol: (
        <svg width='42' height='42' viewBox='0 0 42 42' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='21' cy='21' r='21' fill='#46B58F' />
          <path
            d='M6 13.5513L20.8212 6L36 13.5513M6 13.5513L20.8212 20.6241M6 13.5513V28.6196L20.8212 36M36 13.5513L20.8212 20.6241M36 13.5513V28.6196L20.8212 36M20.8212 20.6241V36'
            stroke='black'
          />
        </svg>
      ),
      color: 'green',
      description: ' Karma Family (Wind): Sales & Marketing',
      skills: ' Action-oriented, perseverance, resourcefulness, decisiveness',
      alignment: 'Sales strategy, negotiation, marketing campaigns, lead generation',
      additionalSkills: 'Public speaking, persuasion, social media expertise',
    },
    {
      name: 'RATNA',
      symbol: (
        <svg width='42' height='42' viewBox='0 0 42 42' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='21' cy='21' r='21' fill='#F0BE65' />
          <path
            d='M6 12.5119H36M6 12.5119L21.1421 5L36 12.5119M6 12.5119V28.9465L21.1421 36M6 12.5119L21.1421 36M36 12.5119L21.1421 36M36 12.5119V28.9465L21.1421 36'
            stroke='black'
          />
        </svg>
      ),
      color: 'yellow',
      description: 'Ratna Family (Earth): Admin & Customer Support ',
      skills: 'Stability, reliability, patience, empathy',
      alignment: 'Operations management, customer service, finance, human resources ',
      additionalSkills: 'Organization, detail-orientation, conflict resolution',
    },
    {
      name: 'PADMA',
      symbol: (
        <svg width='42' height='42' viewBox='0 0 42 42' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='21' cy='21' r='21' fill='#DA4C5C' />
          <path
            d='M7.63672 32.1824L20.9088 5.45508L34.364 32.1824M7.63672 32.1824H34.364M7.63672 32.1824L20.9088 23.6054L34.364 32.1824'
            stroke='black'
          />
          <path d='M21 24.0403V5.45508' stroke='black' />
        </svg>
      ),
      color: 'red',
      description: 'Padma Family (Fire): Design & Creative (Working Class)  ',
      skills: 'Creativity, passion, discernment, inspiration',
      alignment: 'Product design, brand development, content creation, innovation',
      additionalSkills: ' Storytelling, user experience (UX) design, trend analysis',
    },
  ]
  const [selectedGuild, setSelectedGuild] = useState(guildData[0].name)

  const selectedGuildData = guildData.find((guild) => guild.name === selectedGuild)

  return (
    <div className='-ml-3 mb-12 mt-2 flex flex-col items-center md:ml-0 lg:mb-0'>
      <div
        id='My Avatar'
        className='relative flex h-[1055px] w-[300px] flex-col bg-violet-300 py-4 md:w-[600px] md:rounded-3xl  md:px-10 md:shadow-md md:shadow-purple-700 md:backdrop-blur-md lg:h-[550px] lg:w-[800px] md:dark:bg-black/10'
        // style={{ minHeight: '300px' }} //Reserve space for dynamic content
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
                      modelSrc={`${avatarsData.slice(-1)[0].avatar_url}`}
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
                    {/* <div className='absolute bottom-14 left-20'>
                      <AvatarImageComponent />
                    </div> */}
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
                    {/* <div className='absolute bottom-14 left-20'>
                      <AvatarImageComponent />
                    </div> */}
                  </div>
                )}
              </div>

              {/* Guilds Component */}
              <div className='size-full p-4 lg:w-[65%]'>
                {/* GUILDS SELECTION */}
                <div className='flex h-full flex-col lg:flex-row lg:items-center lg:justify-between'>
                  <form>
                    <label
                      htmlFor='guilds'
                      className='flex justify-center text-lg font-semibold text-gray-700 lg:-mt-8 lg:text-xl'
                    >
                      <Image src='/guildlogo.svg' height={130} width={130} alt='guild logo' />
                    </label>
                    <div className='relative my-4 flex items-center justify-center gap-4 lg:my-0 lg:flex-col lg:gap-y-1 '>
                      {guildData.map((guild, index) => (
                        <div key={index} className='group lg:relative'>
                          <label htmlFor={guild.name} className='cursor-pointer'>
                            <p
                              className={`rounded-full transition-transform duration-500 ${selectedGuild === guild.name ? 'rotate-180 scale-75 border-4 border-pink-400' : 'rotate-0'}`}
                            >
                              {guild.symbol}
                            </p>
                          </label>
                          <input
                            type='radio'
                            id={guild.name.toString()}
                            name='guild'
                            value={`Guild ${guild.name}`}
                            className='hidden'
                            checked={selectedGuild === guild.name}
                            onChange={() => setSelectedGuild(guild.name)}
                            aria-label='Guild Selection'
                          />
                        </div>
                      ))}
                    </div>
                  </form>
                  {selectedGuildData && (
                    <div
                      className='relative h-80 rounded-lg border text-purple-950 lg:ml-4 lg:w-72 dark:text-gray-300'
                      style={{ borderColor: selectedGuildData.color }}
                    >
                      <div className='absolute -right-3 -top-3 scale-125'>
                        <h2 className='font-bold'>{selectedGuildData.symbol}</h2>
                      </div>
                      <div className='p-2'>
                        <h3 className='text-lg font-semibold'>Description</h3>
                        <p className='text-sm '>{selectedGuildData.description}</p>
                      </div>
                      <div className='flex justify-between p-2'>
                        <div>
                          <h3 className='text-lg font-semibold'>Skills</h3>
                          <p className='text-sm '>{selectedGuildData.skills}</p>
                        </div>
                        <div>
                          <h3 className='text-sm font-semibold'>Additional Skills</h3>
                          <p className='text-sm '>{selectedGuildData.additionalSkills}</p>
                        </div>
                      </div>
                      <div className='p-2'>
                        <h3 className='text-lg font-semibold'>Alignment</h3>
                        <p className='text-sm '>{selectedGuildData.alignment}</p>
                      </div>
                    </div>
                  )}
                </div>
                {/* Next and Update Button */}
                {!isSmallScreen ? (
                  <>
                    <div className='mt-4 flex justify-center lg:ml-[33%]'>
                      <DrawOutlineButton type='submit' aria-label='update'>
                        Update
                      </DrawOutlineButton>
                    </div>
                    <div className='absolute bottom-4 right-4'>
                      <button
                        className='rounded-full bg-purple-950 transition-all duration-150 hover:scale-105 hover:bg-purple-500 dark:bg-purple-400/20 hover:dark:bg-purple-300/30'
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
              </div>
            </div>

            {!isSmallScreen ? (
              <div className='absolute left-96 top-96 transition-all duration-200 lg:left-20 lg:mt-14'>
                <DrawOutlineButton
                  onClick={() => {
                    setIsCardModalOpen(true)
                  }}
                >
                  Create Avatar &emsp; +
                </DrawOutlineButton>
              </div>
            ) : (
              <div className='absolute top-96 flex w-full justify-center'>
                <DrawOutlineButton
                  onClick={() => {
                    setIsCardModalOpen(true)
                  }}
                >
                  Create Avatar &emsp; +
                </DrawOutlineButton>
              </div>
            )}

            {isCardModalOpen && (
              <div className='absolute left-0 top-0 z-50 flex size-full items-center justify-center rounded-lg bg-black/80'>
                <FormModal2 show={isCardModalOpen} onclose={setIsCardModalOpen}>
                  <Avatar_creator />
                </FormModal2>
              </div>
            )}

            {/* Back Button */}
            {!isSmallScreen ? (
              <div>
                <div className='absolute bottom-4 left-4 mt-4'>
                  <button
                    className='rounded-full bg-purple-950 transition-all duration-150 hover:scale-105 hover:bg-purple-500 dark:bg-purple-400/20 hover:dark:bg-purple-300/30'
                    onClick={onPrevButtonClick}
                    aria-label='prev'
                  >
                    <p className='p-4'>
                      <FaArrowLeft />
                    </p>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className='absolute bottom-4 left-4 mt-4'>
                  <DrawOutlineButton onClick={onPrevButtonClick} aria-label='prev'>
                    Back
                  </DrawOutlineButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
