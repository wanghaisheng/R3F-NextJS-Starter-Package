'use client'

import { CardBody, CardContainer, CardItem } from '@/components/card/card'
// import { Button } from "@/components/ui/button"

import axios from 'axios'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Suspense } from 'react'
import { Avatar } from 'src/components/Avatar'
import { useUser } from '@/context/UserContext/UserContext'
import { useCallback, useEffect, useState } from 'react'

import SpringModal from '@/components/FormModal/SpringModal'

//icons
import { FaRegEdit } from 'react-icons/fa'

// For the card flip QR code
import QRCode from 'qrcode'
import { usePathname } from 'next/navigation'

// For the carousel
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import useEmblaCarousel from 'embla-carousel-react'

// For carousel inside slide 1

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
import CardsFlipCard from '@/components/card/cardsFlipCard'
import SkinsCard from '@/components/card/SkinsCard'

async function getSkills() {
  try {
    const res = await axios.get('/api/skills')
    if (res.status !== 200) {
      console.log('failed to fetch the skills')
    }
    return res.data
  } catch (error) {
    console.log('failed to fetch the skills', error)
  }
}

async function getCards() {
  try {
    const res = await axios.get(`/api/card`)
    if (res.status !== 200) {
      console.log('failed to fetch the cards')
    }
    return res.data
  } catch (error) {
    console.log('failed to fetch the cards', error)
  }
}

async function getAvatarById(id) {
  try {
    const res = await axios.get(`/api/avatar/${id}`)
    if (res.status !== 200) {
      console.log('failed to fetch the avatars')
    }
    return res.data
  } catch (error) {
    console.log('failed to fetch the avatars', error)
  }
}

// Custom tooltip component for chart
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

export default function Hero3() {
  const { user } = useUser()
  const [skillsData, setSkillsData] = useState(null)
  const [avatarsData, setAvatarsData] = useState([])
  const [cardsData, setCardsData] = useState([])

  const [isOpen, setIsOpen] = useState(false)

  // Main Carousel
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

  // carousel inside Slide 1
  const [emblaRef2, emblaApi2] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (emblaApi2) {
      console.log(emblaApi2.slideNodes()) // Access API
    }
  }, [emblaApi2])

  const scrollPrev2 = useCallback(() => {
    if (emblaApi2) emblaApi2.scrollPrev()
  }, [emblaApi2])

  const scrollNext2 = useCallback(() => {
    if (emblaApi2) emblaApi2.scrollNext()
  }, [emblaApi2])

  // Carousel inside slide 2
  const [emblaRef3, emblaApi3] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (emblaApi3) {
      console.log(emblaApi3.slideNodes()) // Access API
    }
  }, [emblaApi3])

  const scrollPrev3 = useCallback(() => {
    if (emblaApi3) emblaApi3.scrollPrev()
  }, [emblaApi3])

  const scrollNext3 = useCallback(() => {
    if (emblaApi3) emblaApi3.scrollNext()
  }, [emblaApi3])

  // ------------------------------------------------------------

  // Fetch skills data
  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const skillsData = await getSkills() // Fetch skills data
        const filteredSkillsData = skillsData.filter((element) => element.gg_id === user.gg_id) // Filter data based on user
        setSkillsData(filteredSkillsData) // Set the filtered data
      } catch (error) {
        console.log('Error fetching skills data:', error)
      }
    }

    if (user) {
      fetchSkillsData() // Fetch data only if user is available
    }
  }, [user])

  // ------------------------------------------------------------

  // Cards data
  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        const cardsData = await getCards() // Fetch cards data
        const filteredCardsData = cardsData.filter((element) => element.gg_id === user.gg_id)
        setCardsData(filteredCardsData)
      } catch (error) {
        console.log('Error fetching skills data:', error)
      }
    }

    if (user) {
      fetchCardsData() // Fetch data only if user is available
      console.log(cardsData)
    }
  }, [user])

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
        console.log('Error fetching avatars data:', error)
      }
    }

    if (user) {
      fetchAvatarsData() // Fetch data only if user is available
    }
  }, [user])

  // Animated Button
  const DrawOutlineButton = ({ children, ...rest }) => {
    return (
      <button
        {...rest}
        className='group relative rounded-md bg-purple-400/20 px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-purple-300'
      >
        <span>{children}</span>

        {/* TOP */}
        <span className='absolute left-0 top-0 h-[2px] w-0 bg-purple-300 transition-all duration-100 group-hover:w-full' />

        {/* RIGHT */}
        <span className='absolute right-0 top-0 h-0 w-[2px] bg-purple-300 transition-all delay-100 duration-100 group-hover:h-full' />

        {/* BOTTOM */}
        <span className='absolute bottom-0 right-0 h-[2px] w-0 bg-purple-300 transition-all delay-200 duration-100 group-hover:w-full' />

        {/* LEFT */}
        <span className='absolute bottom-0 left-0 h-0 w-[2px] bg-purple-300 transition-all delay-300 duration-100 group-hover:h-full' />
      </button>
    )
  }

  return (
    <div className='flex flex-col md:size-full'>
      {/* <div className='flex items-center bg-none'>
        <View className='flex h-20 w-full flex-col items-center justify-center bg-none'>
          <Suspense fallback={null}>
            <Type scale={2} position={[0, 0, 0]} />
            <Common />
          </Suspense>
        </View>
      </div> */}
      {/* avatar */}
      <div className='hidden md:block' style={{ height: '600px', weight: '600px' }}>
        {avatarsData && avatarsData.length !== 0 ? (
          <Avatar
            modelSrc={`${avatarsData.slice(-1)[0].avatar_url}`}
            shadows
            animationSrc='/male-idle-3.fbx'
            style={{ background: 'rgb(9,20,26)', pointerEvents: 'none' }}
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
            style={{ background: 'rgb(9,20,26)', pointerEvents: 'none' }}
            fov={40}
            cameraTarget={1.5}
            cameraInitialDistance={30}
            effects={{
              ambientOcclusion: true,
            }}
          />
        )}
      </div>

      {/* Carousel */}
      <div
        className='top-10 flex size-full justify-between px-4 md:absolute '
        style={{ '--slide-height': '19rem', '--slide-spacing': '1rem', '--slide-size': '65%' }}
      >
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex '>
            {/* Slide 1 */}
            <div className='w-full shrink-0 grow md:min-w-0 '>
              <div className='flex size-full flex-col px-4 md:flex-row md:justify-between'>
                <div className='h-full md:ml-24 md:w-[27%]'>
                  {user && cardsData.length != 0 ? (
                    <div className='flex flex-col items-center justify-center'>
                      {/* Carousel */}
                      <div className='w-full overflow-hidden' ref={emblaRef2}>
                        <div className='flex items-center'>
                          <div className='w-full shrink-0 grow md:min-w-0 '>
                            <div className='flex flex-col justify-center'>
                              <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                                Genius ID
                                <a className=' px-2 py-1 text-sm text-black dark:text-white' href='/slider'>
                                  <FaRegEdit />
                                </a>
                              </div>
                              <div className='flex justify-center'>
                                <GeniusIDFlipCard
                                  first_name={user.first_name}
                                  last_name={user.last_name}
                                  email={user.email}
                                  dob={user.dob}
                                  contact={user.phone_number}
                                  address={user.address}
                                />
                              </div>
                            </div>
                          </div>
                          {cardsData.map((card) => (
                            <div key={card.card_id} className='w-full shrink-0 grow md:min-w-0 '>
                              <div className='flex flex-col justify-center'>
                                <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                                  {card.type.toUpperCase()}
                                  <a className=' px-2 py-1 text-sm text-black dark:text-white' href='/slider'>
                                    <FaRegEdit />
                                  </a>
                                </div>
                                <div className='flex justify-center'>
                                  <CardsFlipCard
                                    type={card.type}
                                    name={card.name}
                                    dateIn={card.date_in}
                                    dateOut={card.date_out}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className='my-4 flex justify-between text-2xl'>
                          <button className='' onClick={scrollPrev2}>
                            <MdNavigateBefore />
                          </button>
                          <button className='' onClick={scrollNext2}>
                            <MdNavigateNext />
                          </button>
                        </div>

                        <div className='mx-4 my-5 flex flex-col items-center rounded-lg bg-purple-900/50 py-4'>
                          <p className='mb-4'>Some premium features for paid users</p>

                          <DrawOutlineButton onClick={() => setIsOpen(true)}>GG+</DrawOutlineButton>
                          {/* Spring Pop Up Modal */}
                          <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='flex flex-col items-center justify-center'>
                      {/* Carousel */}
                      <div className='w-full overflow-hidden' ref={emblaRef2}>
                        <div className='flex items-center'>
                          <div className='w-full shrink-0 grow md:min-w-0 '>
                            <div className='flex flex-col justify-center'>
                              <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                                Genius ID
                                <a className=' px-2 py-1 text-sm text-black dark:text-white' href='/slider'>
                                  <FaRegEdit />
                                </a>
                              </div>
                              <div className='flex justify-center'>
                                <GeniusIDFlipCard
                                  first_name='DEFAULT'
                                  last_name='DEFAULT'
                                  email='DEFAULT@'
                                  dob='DEFAULT'
                                  contact='DEFAULT'
                                  address='DEFAULT'
                                />
                              </div>
                            </div>
                          </div>
                          <div className='w-full shrink-0 grow md:min-w-0 '>
                            <div className='flex flex-col justify-center'>
                              <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                                CARD2
                                <a className=' px-2 py-1 text-sm text-black dark:text-white' href='/slider'>
                                  <FaRegEdit />
                                </a>
                              </div>
                              <div className='flex justify-center'>
                                <CardsFlipCard
                                  personName='Person Name'
                                  type='DEFAULT'
                                  name='DEFAULT'
                                  dateIn='DEFAULT'
                                  dateOut='DEFAULT'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='my-4 flex justify-between text-2xl'>
                          <button className='' onClick={scrollPrev2}>
                            <MdNavigateBefore />
                          </button>
                          <button className='' onClick={scrollNext2}>
                            <MdNavigateNext />
                          </button>
                        </div>
                        <div className='mx-4 my-5 flex flex-col items-center rounded-lg bg-purple-900/50 py-4'>
                          <p className='mb-4'>Some premium features for paid users</p>
                          <DrawOutlineButton onClick={() => setIsOpen(true)}>GG+</DrawOutlineButton>
                          {/* Spring Pop Up Modal */}
                          <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className='h-full md:mr-24 md:w-[30%] '>
                  <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                    Avatar{' '}
                    <a className=' px-2 py-1 text-sm text-black dark:text-white' href='/slider'>
                      <FaRegEdit />
                    </a>
                  </div>
                  <div className='flex min-h-48 items-center justify-center px-4'>
                    <div className='flex min-h-48 items-center justify-center gap-x-14 px-4 md:px-8 xl:px-10'>
                      <AvatarImageComponent />
                    </div>
                  </div>
                  {/* Skin Card Component */}
                  <SkinsCard />
                </div>
              </div>
            </div>
            {/* Slide 2 */}
            <div className='w-full shrink-0 grow md:min-w-0'>
              <div className='flex size-full flex-col px-4 md:flex-row md:justify-between'>
                <div className='h-full md:ml-24 md:w-[27%]'>
                  {user ? (
                    <div className='flex flex-col items-center justify-center'>
                      {/* Carousel */}
                      <div className='w-full overflow-hidden' ref={emblaRef3}>
                        <div className='flex items-center'>
                          <div className='w-full shrink-0 grow md:min-w-0 '>
                            <div className='flex flex-col justify-center'>
                              <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                                Experience
                                <a className=' px-2 py-1 text-sm text-black dark:text-white' href='/slider'>
                                  <FaRegEdit />
                                </a>
                              </div>
                              <div className='flex justify-center'>
                                <ExperienceFlipCard
                                  type='TYPE'
                                  projectName='Name'
                                  skills='skill1, skill2'
                                  toolsAndTech='vscode, blender'
                                />
                              </div>
                              <div className='my-3'>
                                <p className='px-4'>
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nostrum consequuntur
                                  maxime consectetur dolor ratione, in harum explicabo voluptates distinctio magni,
                                  obcaecati minus aperiam pariatur. Ratione fuga quia blanditiis sed!
                                </p>
                              </div>
                              <div className='mt-1 flex justify-center'>
                                <a
                                  href='https://quickslot.kinde.com/auth/cx/_:nav&m:login&psid:75967cd63ea14e95aeffecd5c6e34633'
                                  target='_blank'
                                >
                                  <DrawOutlineButton>Booking</DrawOutlineButton>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className='w-full shrink-0 grow md:min-w-0 '>
                            <div className='flex flex-col justify-center'>
                              <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                                Exp2
                                <a className=' px-2 py-1 text-sm text-black dark:text-white' href='/slider'>
                                  <FaRegEdit />
                                </a>
                              </div>
                              <div className='flex justify-center'>
                                <ExperienceFlipCard
                                  type='EDUCATION'
                                  projectName='Name2'
                                  skills='skill3, skil23l2'
                                  toolsAndTech='vscode, figma'
                                />
                              </div>
                              <div className='my-3'>
                                <p className='px-4'>
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nostrum consequuntur
                                  maxime consectetur dolor ratione, in harum explicabo voluptates distinctio magni,
                                  obcaecati minus aperiam pariatur. Ratione fuga quia blanditiis sed!
                                </p>
                              </div>
                              <div className='mt-1 flex justify-center'>
                                <a
                                  href='https://quickslot.kinde.com/auth/cx/_:nav&m:login&psid:75967cd63ea14e95aeffecd5c6e34633'
                                  target='_blank'
                                >
                                  <DrawOutlineButton>Booking</DrawOutlineButton>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='mt-2 flex justify-center text-2xl'>
                        <button className='' onClick={scrollPrev3}>
                          <MdNavigateBefore />
                        </button>
                        <button className='' onClick={scrollNext3}>
                          <MdNavigateNext />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className='flex flex-col items-center justify-center'>
                      {/* Carousel */}
                      <div className='w-full overflow-hidden' ref={emblaRef3}>
                        <div className='flex items-center'>
                          <div className='w-full shrink-0 grow md:min-w-0 '>
                            <div className='flex flex-col justify-center'>
                              <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                                Experience
                                <a className=' px-2 py-1 text-sm text-black dark:text-white' href='/slider'>
                                  <FaRegEdit />
                                </a>
                              </div>
                              <div className='flex justify-center'>
                                <ExperienceFlipCard
                                  type='DEFAULT'
                                  projectName='DEFAULT'
                                  skills='DEFAULT'
                                  toolsAndTech='DEFAULT'
                                />
                              </div>
                              <div className='my-3'>
                                <p className='px-4'>
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nostrum consequuntur
                                  maxime consectetur dolor ratione, in harum explicabo voluptates distinctio magni,
                                  obcaecati minus aperiam pariatur. Ratione fuga quia blanditiis sed!
                                </p>
                              </div>
                              <div className='mt-1 flex justify-center'>
                                <a
                                  href='https://quickslot.kinde.com/auth/cx/_:nav&m:login&psid:75967cd63ea14e95aeffecd5c6e34633'
                                  target='_blank'
                                >
                                  <DrawOutlineButton>Booking</DrawOutlineButton>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className='w-full shrink-0 grow md:min-w-0 '>
                            <div className='flex flex-col justify-center'>
                              <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                                Exp2
                                <a className=' px-2 py-1 text-sm text-black dark:text-white' href='/slider'>
                                  <FaRegEdit />
                                </a>
                              </div>
                              <div className='flex justify-center'>
                                <ExperienceFlipCard
                                  type='DEFAULT 2'
                                  projectName='Project 2'
                                  skills='DEFAULT'
                                  toolsAndTech='DEFAULT'
                                />
                              </div>
                              <div className='mt-3'>
                                <p>
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nostrum consequuntur
                                  maxime consectetur dolor ratione, in harum explicabo voluptates distinctio magni,
                                  obcaecati minus aperiam pariatur. Ratione fuga quia blanditiis sed!
                                </p>
                              </div>
                              <div className='mt-1 flex justify-center'>
                                <a
                                  href='https://quickslot.kinde.com/auth/cx/_:nav&m:login&psid:75967cd63ea14e95aeffecd5c6e34633'
                                  target='_blank'
                                >
                                  <DrawOutlineButton>Booking</DrawOutlineButton>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='mt-2 flex justify-center text-2xl'>
                          <button className='' onClick={scrollPrev3}>
                            <MdNavigateBefore />
                          </button>
                          <button className='' onClick={scrollNext3}>
                            <MdNavigateNext />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className='h-full md:mr-24 md:w-[30%] '>
                  <div className='relative my-4 flex justify-center pl-5 text-xl font-semibold drop-shadow md:text-5xl'>
                    Skills{' '}
                    <a className=' px-2 py-1 text-sm text-black dark:text-white' href='/slider'>
                      <FaRegEdit />
                    </a>
                  </div>
                  <CardContainer className='mt-10 py-0 hover:shadow-3xl dark:border-none dark:hover:border-none dark:hover:shadow-3xl'>
                    <CardBody className='group/card relative'>
                      <div className='flex min-h-48 flex-col items-center justify-center px-4 md:px-8 xl:px-10'>
                        {skillsData ? (
                          <div className=' '>
                            {/* Condition for changing barchart chart and radar chart*/}
                            {skillsData.length < 6 ? (
                              <ResponsiveContainer width={420} height={330}>
                                <BarChart
                                  width={420}
                                  height={330}
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
                              <ResponsiveContainer width={420} height={330}>
                                <RadarChart
                                  // cx={300}
                                  // cy={250}
                                  // outerRadius={150}
                                  width={420}
                                  height={330}
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
            <div className='w-full shrink-0 grow md:min-w-0'>
              <div className='flex size-full flex-col px-4 md:flex-row md:justify-between'>
                <div className='h-full md:ml-24 md:w-[25%] '>
                  {user ? (
                    <div className='flex flex-col items-center justify-center'>
                      <div className='relative my-4 flex justify-center text-5xl font-semibold drop-shadow'>
                        Achievements
                      </div>
                      <p>Logged In users Achievements</p>
                    </div>
                  ) : (
                    <div className='flex flex-col items-center justify-center'>
                      <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                        <p>Achievements</p>
                      </div>
                      Awards
                    </div>
                  )}
                </div>

                <div className='h-full md:mr-24 md:w-[25%] '>
                  <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                    Recommendations
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className='absolute bottom-10 left-2 md:left-10 md:top-0 md:text-2xl lg:text-5xl'
            onClick={scrollPrev}
          >
            <MdNavigateBefore />
          </button>
          <button
            className='absolute bottom-10 right-2 md:right-10 md:top-0 md:text-2xl lg:text-5xl'
            onClick={scrollNext}
          >
            <MdNavigateNext />
          </button>
        </div>
      </div>
    </div>
  )
}
