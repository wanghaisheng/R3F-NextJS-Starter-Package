'use client'

import { CardBody, CardContainer, CardItem } from '@/components/card/card'
// import { Button } from "@/components/ui/button"

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Suspense } from 'react'
import { Avatar } from 'src/components/Avatar'
import FormModal from '@/components/FormModal/Modal'
import { motion } from 'framer-motion'
import { LogosFacebook } from '@/logo/LogosFacebook'
import { SkillIconsInstagram } from '@/logo/SkillIconsInstagram'
import { SkillIconsLinkedin } from '@/logo/SkillIconsLinkedin'
import { LogosGoogleIcon } from '@/logo/LogosGoogleIcon'
import { LogosYoutubeIcon } from '@/logo/LogosYoutubeIcon'
import { LogosApple } from '@/logo/LogosApple'
import { LogosFigma } from '@/logo/LogosFigma'
import { LogosTwitch } from '@/logo/LogosTwitch'
import { SkillIconsGithubDark } from '@/logo/SkillIconsGithubDark'
import { useUser } from '@/context/UserContext/UserContext'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

// For the card flip QR code
import QRCode from 'qrcode'
import { usePathname } from 'next/navigation'

// For the carousel
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import useEmblaCarousel from 'embla-carousel-react'
import AvatarImageComponent from '@/components/avatarImage/page'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
import { ConstantColorFactor } from 'three'

// Cards
import GeniusIDFlipCard from '@/components/card/GeniusIDFlipCard'
import ExperienceFlipCard from '@/components/card/experienceFlipCard'

async function getSkills() {
  try {
    const res = await fetch('http://localhost:3000/api/skills')
    if (!res.ok) {
      throw new Error('failed to fetch the skills')
    }
    return res.json()
  } catch (error) {
    throw new Error('failed to fetch the skills', error)
  }
}

async function getAvatarById(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/avatar/${id}`)
    if (!res.ok) {
      throw new Error('failed to fetch the avatars')
    }
    return res.json()
  } catch (error) {
    throw new Error('failed to fetch the avatars', error)
  }
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='flex flex-col gap-4 rounded-md bg-slate-900 p-4'>
        <p className='text-base'>{label}</p>
        <p className='text-sm text-indigo-400'>
          <span className='ml-2'>{payload[0].payload.percentage}</span>%
        </p>
      </div>
    )
  }
}

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      {/* import {SkillIconsLinkedin} from '@/logo/SkillIconsLinkedin' */}
      <svg className='-ml-1 mr-3 size-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })
const Type = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Type), { ssr: false })

export default function Hero() {
  const { user } = useUser()
  const [skillsData, setSkillsData] = useState(null)
  const [avatarsData, setAvatarsData] = useState([])

  // Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()) // Access API
    }
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // ------------------------------------------------------------

  // Fetch skills data
  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const testData = await getSkills() // Fetch skills data
        const filteredData = testData.filter((element) => element.gg_id === user.gg_id) // Filter data based on user
        setSkillsData(filteredData) // Set the filtered data
      } catch (error) {
        throw new Error('Error fetching skills data:', error)
      }
    }

    if (user) {
      fetchSkillsData() // Fetch data only if user is available
    }
  }, [user])

  // ------------------------------------------------------------

  // Flip Card QR
  const [isFlipped, setIsFlipped] = useState(false)
  const [imgSrc, setImgSrc] = useState('')
  const pathname = usePathname()
  QRCode.toDataURL(pathname).then(setImgSrc)
  // Flip Card QR end

  // Flip Card QR
  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  // Avatar
  useEffect(() => {
    const fetchAvatarsData = async () => {
      try {
        const testData = await getAvatarById(user.gg_id)
        setAvatarsData(testData)
      } catch (error) {
        throw new Error('Error fetching avatars data:', error)
      }
    }

    if (user) {
      fetchAvatarsData() // Fetch data only if user is available
    }
  }, [user])

  return (
    <div className='h-screen w-full'>
      <div className='flex items-center bg-none'>
        <View className='flex h-20 w-full flex-col items-center justify-center bg-none'>
          <Suspense fallback={null}>
            <Type scale={2} position={[0, 0, 0]} />
            <Common />
          </Suspense>
        </View>
      </div>
      {avatarsData && avatarsData.length != 0 ? (
        <Avatar
          modelSrc={`${avatarsData.slice(-1)[0].avatar_url}`}
          // shadows
          animationSrc='/male-idle-3.fbx'
          style={{ background: 'rgb(9,20,26)' }}
          fov={40}
          cameraTarget={1.5}
          cameraInitialDistance={30}
          effects={{
            ambientOcclusion: true,
          }}
        />
      ) : (
        <Avatar
          modelSrc='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0'
          shadows
          animationSrc='/male-idle-3.fbx'
          style={{ background: 'rgb(9,20,26)' }}
          fov={40}
          cameraTarget={1.5}
          cameraInitialDistance={30}
          effects={{
            ambientOcclusion: true,
          }}
        />
      )}

      {/* Carousel */}
      <div
        className='top-10 flex size-full justify-between px-4 md:absolute'
        style={{ '--slide-height': '19rem', '--slide-spacing': '1rem', '--slide-size': '65%' }}
      >
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex md:flex-row'>
            {/* Slide 1 */}
            <div className='w-full shrink-0 grow md:min-w-0 '>
              <div className='flex size-full justify-between px-4'>
                <div className='h-full w-[33%] rounded-xl '>
                  {user ? (
                    <div className='flex flex-col items-center justify-center'>
                      <div className='relative my-4 flex justify-center text-7xl font-semibold drop-shadow'>
                        Genius ID
                      </div>

                      <GeniusIDFlipCard
                        first_name='Person'
                        last_name='Name'
                        email='email'
                        dob='date of birth'
                        contact='number'
                        address='address'
                      />
                    </div>
                  ) : (
                    <div className='flex flex-col items-center justify-center'>
                      <div className='relative my-4 flex justify-center text-7xl font-semibold drop-shadow'>
                        Genius ID
                      </div>
                      <GeniusIDFlipCard
                        first_name='DEFAULT'
                        last_name='DEFAULT'
                        email='DEFAULT@'
                        dob='DEFAULT'
                        contact='DEFAULT'
                        address='DEFAULT'
                      />
                    </div>
                  )}
                </div>

                <div className='h-full w-[33%] rounded-xl '>
                  <div className='relative my-4 flex justify-center text-7xl font-semibold drop-shadow'>Avatar</div>
                  <div className='flex min-h-48 flex-col items-center justify-center px-4 md:px-8 xl:px-10'>
                    <AvatarImageComponent />
                  </div>
                </div>
              </div>
            </div>
            {/* Slide 2 */}
            <div className='w-full shrink-0 grow md:min-w-0'>
              <div className='flex size-full justify-between px-4'>
                <div className='h-full w-[33%] rounded-xl '>
                  {user ? (
                    <div className='flex flex-col items-center justify-center'>
                      <div className='relative my-4 flex justify-center text-7xl font-semibold drop-shadow'>
                        Experience
                      </div>
                      <ExperienceFlipCard
                        type='TYPE'
                        projectName='Name'
                        skills='skill1, skill2'
                        toolsAndTech='vscode, blender'
                      />
                    </div>
                  ) : (
                    <div className='flex flex-col items-center justify-center'>
                      <div className='relative my-4 flex justify-center text-7xl font-semibold drop-shadow'>
                        Experience
                      </div>
                      <ExperienceFlipCard
                        type='DEFAULT'
                        projectName='DEFAULT'
                        skills='DEFAULT'
                        toolsAndTech='DEFAULT'
                      />
                    </div>
                  )}
                </div>

                <div className='h-full w-[33%] rounded-xl '>
                  <div className='relative my-4 flex justify-center text-7xl font-semibold drop-shadow'>Skills</div>
                  <CardContainer className='py-0 hover:shadow-3xl dark:border-none dark:hover:border-none dark:hover:shadow-3xl'>
                    <CardBody className='group/card relative rounded-xl border border-black/[0.1] bg-gray-50 p-2 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-3xl dark:hover:shadow-emerald-500/[0.1]'>
                      <div className='flex min-h-48 flex-col items-center justify-center px-4 md:px-8 xl:px-10'>
                        {skillsData ? (
                          <div className=' '>
                            {/* Condition for changing barchart chart and radar chart*/}
                            {skillsData.length < 6 ? (
                              <ResponsiveContainer width={400} height={250}>
                                <BarChart
                                  width={400}
                                  height={250}
                                  data={skillsData}
                                  margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                  }}
                                >
                                  <XAxis dataKey='skill' padding={{ left: 20, right: 20 }} />
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
                              <ResponsiveContainer width={400} height={250}>
                                <RadarChart
                                  // cx={300}
                                  // cy={250}
                                  // outerRadius={150}
                                  width={400}
                                  height={250}
                                  data={skillsData}
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
                        ) : (
                          // Render loading indicator or placeholder while data is being fetched
                          <div>No Skill to show</div>
                        )}
                      </div>
                    </CardBody>
                  </CardContainer>
                </div>
              </div>
            </div>
            {/* Slide 3 */}
            <div className='w-full shrink-0 grow md:min-w-0 '>
              <p>sawgwaghawa</p>
            </div>
            {/* Slide 4 */}
            <div className='w-full shrink-0 grow md:min-w-0 '>tjerjker</div>
          </div>
          <button className='left-10 top-56 text-5xl md:absolute' onClick={scrollPrev}>
            <MdNavigateBefore />
          </button>
          <button className='right-10 top-56 text-5xl md:absolute' onClick={scrollNext}>
            <MdNavigateNext />
          </button>
        </div>
      </div>
    </div>
  )
}
