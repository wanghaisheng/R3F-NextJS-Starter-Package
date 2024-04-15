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

// const skillsData = [
//   {
//     skill: 'Python',
//     percentage: 76,
//   },
//   {
//     skill: 'Java',
//     percentage: 78,
//   },
//   {
//     skill: 'Django',
//     percentage: 56,
//   },
//   {
//     skill: 'PHP',
//     percentage: 59,
//   },
//   {
//     skill: 'HTML',
//     percentage: 75,
//   },
//   {
//     skill: 'CSS',
//     percentage: 65,
//   },
// ]

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

  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false)
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false)
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [cardBackground, setCardBackground] = useState('project-card-bg.jpg')
  const [cardAvatar, setCardAvatar] = useState('aa.png')
  const [jobTitle, setJobTitle] = useState('')

  // Flip Card QR
  const [isFlipped, setIsFlipped] = useState(false)
  const [imgSrc, setImgSrc] = useState('')
  const pathname = usePathname()
  QRCode.toDataURL(pathname).then(setImgSrc)
  // Flip Card QR end

  const closeAllModals = () => {
    setIsSkillModalOpen(false)
    setIsCardModalOpen(false)
    setIsWorkModalOpen(false)
    setIsConnectionModalOpen(false)
  }

  const openSkillModal = () => {
    closeAllModals()
    setIsSkillModalOpen(true)
  }

  const openCardModal = () => {
    closeAllModals()
    setIsCardModalOpen(true)
  }

  const openWorkModal = () => {
    closeAllModals()
    setIsWorkModalOpen(true)
  }

  const openConnectionModal = () => {
    closeAllModals()
    setIsConnectionModalOpen(true)
  }

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
      <div className='fixed top-40'>
        <Avatar
          modelSrc='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0'
          shadows
          animationSrc='/male-idle-3.fbx'
          style={{ background: 'rgb(9,20,26)', height: '400px', width: '400px', justifyContent: 'center' }}
          fov={40}
          cameraTarget={1.5}
          cameraInitialDistance={30}
          effects={{
            ambientOcclusion: true,
          }}
        />
      </div>

      {/* <EnvironmentModel environment="spaceStation" scale={1} /> */}
      {user ? (
        <div className='right-[30%] top-[32%] size-full md:absolute'>
          <div className='ml-[12%] flex flex-col items-center justify-center'>
            <h2 className='mb-12 text-4xl font-extrabold'>{user.first_name + ' ' + user.last_name}</h2>
            <nav className='flex flex-col space-y-4'>
              <div className='flex items-center space-x-2'>
                <LaptopIcon className='size-6' />
                <div>
                  <h3 className='text-lg font-medium '>Web Development</h3>
                  <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <SplineIcon className='size-6' />
                <div>
                  <h3 className='text-lg font-medium'>UI/UX Design</h3>
                  <p className='text-sm text-gray-500'>Figma Design and Brand Design.</p>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <ReplyIcon className='size-6' />
                <div>
                  <h3 className='text-lg font-medium'>Development</h3>
                  <p className='text-sm text-gray-500'>Development Project Lead in Various Section</p>
                </div>
              </div>
            </nav>
          </div>
        </div>
      ) : (
        <div className='right-[30%] top-[32%] size-full md:absolute'>
          <div className='ml-[12%] flex flex-col items-center justify-center'>
            <h2 className='mb-12 text-4xl font-extrabold'>Ayush Lama</h2>
            <nav className='flex flex-col space-y-4'>
              <div className='flex items-center space-x-2'>
                <LaptopIcon className='size-6' />
                <div>
                  <h3 className='text-lg font-medium '>Web Development</h3>
                  <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <SplineIcon className='size-6' />
                <div>
                  <h3 className='text-lg font-medium'>UI/UX Design</h3>
                  <p className='text-sm text-gray-500'>Figma Design and Brand Design.</p>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <ReplyIcon className='size-6' />
                <div>
                  <h3 className='text-lg font-medium'>Development</h3>
                  <p className='text-sm text-gray-500'>Development Project Lead in Various Section</p>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}

      <div className='left-[30%] top-[10%] size-full md:absolute '>
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
      </div>
      <div className='flex items-center justify-center space-x-40'>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='rounded-2xl border-2 p-3 px-14 text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:bg-violet-900'
          onClick={() => {
            openSkillModal(true)
          }}
        >
          Skill
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='rounded-2xl border-2 p-3 px-14 text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:bg-violet-900'
          onClick={() => {
            openCardModal(true)
          }}
        >
          Card
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='rounded-2xl border-2 p-3 px-14 text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:bg-violet-900'
          onClick={() => {
            openWorkModal(true)
          }}
        >
          Work
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='rounded-2xl border-2 p-3 px-10 text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:bg-violet-900'
          onClick={() => {
            openConnectionModal(true)
          }}
        >
          Connection
        </motion.button>
      </div>
      <div>
        {/* Skill Button */}
        <FormModal show={isSkillModalOpen} onClick={openSkillModal} onclose={setIsSkillModalOpen}>
          <form action='#' method='' className='mx-auto flex w-full max-w-lg flex-col items-center justify-center'>
            {/* skill chart pending... */}
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

            <div className='flex items-center space-x-4'>
              <input
                type=''
                placeholder='Communication'
                className='mt-2 flex-1 rounded-md bg-white/10 px-4 py-2  text-gray-800 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-purple-300'
              />

              <input
                type=''
                placeholder='%'
                className='mt-2 w-16 rounded-md  bg-white/10 px-4 py-2 text-gray-800 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-purple-300'
              />
              <input type='checkbox' id='checkbox' className='mt-2' />
            </div>

            <div className='flex items-center space-x-4'>
              <input
                type=''
                placeholder='Communication'
                className='mt-2 rounded-md bg-white/10  px-4 py-2 text-gray-800 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-purple-300'
              />
              <input
                type=''
                placeholder='%'
                className='mt-2 w-16 rounded-md bg-white/10  px-4 py-2 text-gray-800 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-purple-300'
              />
              <input type='checkbox' id='checkbox' className='mt-2' />
            </div>

            <div className='flex items-center space-x-4'>
              <input
                type=''
                placeholder='Communication'
                className='mt-2 rounded-md bg-white/10  px-4 py-2 text-gray-800 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-purple-300'
              />
              <input
                type=''
                placeholder='%'
                className='mt-2 w-16 rounded-md bg-white/10  px-4 py-2 text-gray-800 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-purple-300'
              />
              <input type='checkbox' id='checkbox' className='mt-2' />
            </div>

            <div className='flex items-center space-x-4'>
              <input
                type=''
                placeholder='Communication'
                className='mt-2 rounded-md bg-white/10  px-4 py-2 text-gray-800 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-purple-300'
              />
              <input
                type=''
                placeholder='%'
                className='mt-2 w-16 rounded-md bg-white/10  px-4 py-2 text-gray-800 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-purple-300'
              />
              <input type='checkbox' id='checkbox' className='mt-2' />
            </div>

            <button className='mt-2 inline-block cursor-pointer rounded-lg bg-[#191970] px-6 py-2 font-bold text-white transition duration-500 hover:scale-110'>
              Generate
            </button>
          </form>
        </FormModal>

        {/* Card Button */}
        <FormModal show={isCardModalOpen} onClick={openCardModal} onclose={setIsCardModalOpen}>
          <form action='#' method='' className='mx-auto flex w-full max-w-lg flex-col items-center justify-center'>
            <CardContainer className='py-0 hover:shadow-3xl dark:border-none dark:hover:border-none dark:hover:shadow-3xl'>
              <CardBody className='group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-3xl dark:hover:shadow-emerald-500/[0.1]'>
                <div className='flex'>
                  <CardItem className='mt-2 w-1/2'>
                    <Image
                      // key={avatarData.url}
                      // src={avatarData.url}
                      src='/aa.png'
                      height='1000'
                      width='1000'
                      className='size-full rounded-xl object-cover group-hover/card:shadow-xl'
                      alt='thumbnail'
                    />
                  </CardItem>
                  <div className='flex flex-col'>
                    <CardItem translateZ='50' className='text-2xl font-bold text-neutral-600 dark:text-white'>
                      {name}
                    </CardItem>
                    <CardItem
                      as='p'
                      translateZ='60'
                      className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'
                    >
                      {jobTitle}
                    </CardItem>

                    <div className='mt-20 flex items-center justify-between'></div>
                  </div>
                </div>
              </CardBody>
            </CardContainer>
            {/* Input fields */}
            <div className='flex w-full flex-col px-4'>
              <div>
                <input
                  type=''
                  placeholder='Avatar ID'
                  className='mt-2 w-full rounded-md  bg-white/10 px-4 py-2 text-gray-800 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-yellow-300 dark:text-white'
                />
              </div>
              <div>
                <input
                  type='Name'
                  placeholder='Full Name'
                  className='mt-2 w-full rounded-md  bg-white/10 px-4 py-2 text-gray-800 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-yellow-300 dark:text-white'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type='text'
                  placeholder='Job Title'
                  className='mt-2 w-full rounded-md  bg-white/10 px-4 py-2 text-gray-800 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-yellow-300 dark:text-white'
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              <div>
                <input
                  type='address'
                  placeholder='Address'
                  className='mt-2 w-full rounded-md  bg-white/10 px-4 py-2 text-gray-800 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-yellow-300 dark:text-white'
                />
              </div>
              <div>
                <input
                  type='text'
                  placeholder='Phone Number'
                  className='mt-2 w-full rounded-md  bg-white/10 px-4 py-2 text-gray-800 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-yellow-300 dark:text-white'
                />
              </div>
            </div>

            <button className='mt-2 inline-block cursor-pointer rounded-lg bg-[#191970] px-6 py-2 font-bold text-white transition duration-500 hover:scale-110'>
              Generate
            </button>
          </form>
        </FormModal>

        {/* Work Button */}
        <FormModal show={isWorkModalOpen} onClick={openWorkModal} onclose={setIsWorkModalOpen}>
          <form action='#' method='' className='mx-auto flex w-full max-w-lg flex-col items-center justify-center'>
            <div className='image-preview w-50 object-fit relative mb-10 h-44 overflow-hidden rounded-md bg-white'>
              <img src={`/${cardBackground}`} />
              <div className='avatar-img absolute right-2 top-0 z-10 h-20 w-40'>
                <img src={`/${cardAvatar}`} />
              </div>
              <div id='name-preview' className='bw-full absolute bottom-0 rounded-lg p-3 backdrop-blur-2xl'>
                {name}
              </div>
              <div id='description-preview' className='absolute top-0 w-full rounded-t-sm p-3'>
                {description}
              </div>
            </div>
            <div className='form-section grid- grid grid-cols-3 grid-rows-4 gap-10 text-white'>
              <div className='upload-images col-start-1 col-end-4 flex'>
                <div className='avatar-bg text-center'>
                  <label htmlFor='avatar-bg' className='mx-auto'>
                    Card Background
                  </label>
                  <input type='file' onChange={(e) => setCardBackground(e.target.files[0].name)} />
                </div>
                <div className='avatar text-center'>
                  <label htmlFor='avatar-img' className='mx-auto'>
                    Avatar
                  </label>
                  <input type='file' id='avatar-img' onChange={(e) => setCardAvatar(e.target.files[0].name)} />
                </div>
              </div>
              <div className='col-span-4 col-start-1 flex flex-col'>
                <label htmlFor='project-name' className='text- pr-5'>
                  Name
                </label>
                <input
                  type='text'
                  id='project-name'
                  className='h-8 w-full rounded-md bg-white/10  p-2 text-white'
                  placeholder='Project Name'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='col-span-4 col-start-1'>
                <label htmlFor='project-descrip' className='text- pr-5'>
                  Description
                </label>
                <textarea
                  id='project-descrip'
                  className='h-12 w-full resize-none  rounded-md bg-white/10 p-1 text-white'
                  placeholder='Description'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className='btn col-span-4 col-start-1 flex items-center justify-center' type='submit'>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className='rounded-2xl border-2 p-2 text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:bg-violet-900'
                >
                  Pathaideu
                </motion.button>
              </div>
            </div>
          </form>
        </FormModal>

        {/* Connection Form */}
        <FormModal show={isConnectionModalOpen} onClick={openConnectionModal} onclose={setIsConnectionModalOpen}>
          <div
            className='lg:grid-cols-center m-5 grid grid-cols-3 items-center justify-center gap-6 p-4 md:grid-cols-5 lg:justify-center'
            style={{ fontSize: '50px' }}
          >
            <LogosFacebook className='size-16' />
            <SkillIconsInstagram className='size-16' />
            <SkillIconsLinkedin className='size-16' />
            <LogosGoogleIcon className='size-16' />
            <LogosYoutubeIcon className='size-16' />
            <LogosApple className='size-16' />
            <LogosFigma className='size-16' />
            <LogosTwitch className='size-16' />
            <SkillIconsGithubDark className='size-16' />
          </div>

          <form action='#' method='' className='mx-auto flex w-full max-w-lg flex-col items-center justify-center'>
            <input
              type=''
              placeholder='Instagram'
              className='mt-2 rounded-md px-4 py-2 text-gray-800 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-purple-300'
            />
            <input
              type=''
              placeholder='Facebook'
              className='mt-2 rounded-md px-4 py-2 text-gray-800 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-purple-300'
            />
            <input
              type=''
              placeholder='Spotify'
              className='mt-2 rounded-md px-4 py-2 text-gray-800 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-purple-300'
            />
            <input
              type=''
              placeholder='Github'
              className='mt-2 rounded-md px-4 py-2 text-gray-800 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-purple-300'
            />
            <button className='mt-2 inline-block cursor-pointer rounded-lg bg-[#191970] px-6 py-2 font-bold text-white transition duration-500 hover:scale-110'>
              Generate
            </button>
          </form>
        </FormModal>
      </div>
    </div>
  )
}

function LaptopIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16' />
    </svg>
  )
}

function ReplyIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='9 17 4 12 9 7' />
      <path d='M20 18v-2a4 4 0 0 0-4-4H4' />
    </svg>
  )
}

function SplineIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='19' cy='5' r='2' />
      <circle cx='5' cy='19' r='2' />
      <path d='M5 17A12 12 0 0 1 17 5' />
    </svg>
  )
}
