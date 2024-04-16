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
import { useState, useEffect } from 'react'
import { useUser } from '@/context/UserContext/UserContext'
import axios from 'axios'

// For the card flip QR code
import QRCode from 'qrcode'
import { usePathname } from 'next/navigation'

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

async function getSkills() {
  try {
    const res = await fetch('http://localhost:3000/api/skills')
    if (!res.ok) {
      throw new Error('failed to fetch the skills')
    }
    return res.json()
  } catch (error) {
    console.error(error)
  }
}

// getSkills()
//   .then((res) => {
//     // Access the resolved value here
//     // console.log(res)
//     const testData = res
//     console.log(testData)
//   })
//   .catch((error) => {
//     // Handle any errors that occurred during the promise execution
//     console.error(error)
//   })

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

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const testData = await getSkills() // Fetch skills data
        const filteredData = testData.filter((element) => element.gg_id === user.gg_id) // Filter data based on user
        setSkillsData(filteredData) // Set the filtered data
      } catch (error) {
        console.error('Error fetching skills data:', error)
      }
    }

    if (user) {
      fetchSkillsData() // Fetch data only if user is available
    }
  }, [user])

  // --------------------------------------------------------------------------------------------------------------------------
  // getSkills()
  //   .then(async (res) => {
  //     // Access the resolved value here
  //     // console.log(res)
  //     const testData = await res
  //     while (!user) {
  //       await new Promise((resolve) => setTimeout(resolve, 100)) // Wait for 100 milliseconds before checking again
  //     }

  //     const filteredData = testData.filter((element) => element.gg_id === user.gg_id)
  //     // console.log(filteredData)
  //     setSkillsData(filteredData) // Set the filtered data
  //   })
  //   .catch((error) => {
  //     // Handle any errors that occurred during the promise execution
  //     console.error(error)
  //   })
  // --------------------------------------------------------------------------------------------------------------------------
  // useEffect(() => {
  //   async function fetchSkills() {
  //     try {
  //       const res = await fetch('http://localhost:3000/api/skills')
  //       if (!res.ok) {
  //         throw new Error('Failed to fetch skills')
  //       }
  //       const data = await res.json()
  //       // Filter the data based on your condition
  // const filteredData = await data.filter((element) => element.gg_id === user.gg_id)
  // setSkillsData(filteredData) // Set the filtered data
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   fetchSkills()
  // }, [])
  // -------------------------------------------------------------------------------------------------------------------------
  // const [skillsData, setSkillsData] = useState(null)
  // useEffect(() => {
  //   async function fetchSkills() {
  //     try {
  //       const res = await fetch('http://localhost:3000/api/skills')
  //       if (!res.ok) {
  //         throw new Error('Failed to fetch skills')
  //       }
  //       const data = await res.json()
  //       if (data) {
  //         data.forEach(compareIds)
  //         const new_data = []
  //         function compareIds(element) {
  //           let count = 0
  //           if (element.gg_id === user.gg_id) {
  //             new_data[count] = {
  //               skill: element.skill,
  //               percentage: element.percentage,
  //             }
  //           }
  //         }
  //       }
  //       setSkillsData(new_data)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   fetchSkills()
  // }, [])

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

  return (
    <div className='h-screen w-full'>
      <div className='sticky top-20 flex items-center bg-none'>
        <View className='flex h-20 w-full flex-col items-center justify-center bg-none'>
          <Suspense fallback={null}>
            <Type scale={2} position={[0, 0, 0]} />
            <Common />
          </Suspense>
        </View>
      </div>
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

      {/* <EnvironmentModel environment="spaceStation" scale={1} /> */}
      {user ? (
        <div className='absolute left-5 top-10 h-full w-[33%] bg-white/20'>
          <div className='ml-[12%] flex flex-col items-center justify-center'>Okay</div>
        </div>
      ) : (
        <div className='absolute left-5 top-10 h-full w-[33%] bg-white/20'>
          <div className='flex w-full flex-col items-center justify-center '>No user</div>
        </div>
      )}

      {/* <div className='left-[30%] top-[10%] size-full md:absolute '>
        <div className='flex flex-col items-center justify-center'>
          <CardContainer className='hover:shadow-3xl dark:border-none dark:hover:border-none dark:hover:shadow-3xl'>
            <CardBody className='group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-3xl dark:hover:shadow-emerald-500/[0.1]'>
              <div className='flex'>
                <CardItem className='mt-4 w-full'>
                  <Image
                    src='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.png?size=1024?quality=100'
                    height='500'
                    width='500'
                    className='rounded-xl object-cover group-hover/card:shadow-xl'
                    alt='thumbnail'
                  />
                </CardItem>
                <div className='flex flex-col'>
                  <CardItem translateZ='50' className='text-2xl font-bold text-neutral-600 dark:text-white'>
                    Ayush Lama
                  </CardItem>
                  <CardItem as='p' translateZ='60' className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'>
                    Jr.CEO
                  </CardItem>
                  <div className='mt-20 flex items-center justify-between'>
                    <CardItem
                      translateZ={20}
                      as='button'
                      className='right-0 rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black'
                    >
                      Follow
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as='button'
                      className='ml-2 rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black'
                    >
                      Edit
                    </CardItem>
                  </div>
                </div>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div> */}

      <div className='absolute right-5 top-10 h-full w-[33%] bg-white/20'>
        <div className='flex w-full flex-col items-center justify-center '>No user</div>
        <CardContainer className='py-0 hover:shadow-3xl dark:border-none dark:hover:border-none dark:hover:shadow-3xl'>
          <CardBody className='group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-3xl dark:hover:shadow-emerald-500/[0.1]'>
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
                <div>Loading...</div>
              )}
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  )
}
