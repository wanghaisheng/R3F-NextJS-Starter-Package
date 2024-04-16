'use client'

import SkillsComponent from '@/components/Slider/SkillsComponent'
import AvatarComponent from '@/components/Slider/AvatarComponent'
import ExperienceComponent from '@/components/Slider/ExperienceComponent'

import UserInfoComponent from '@/components/Slider/UserInfoComponent'
import Card2Component from '@/components/Slider/Card2Component'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { motion } from 'framer-motion'
import { useCallback, useEffect, useState, useRef } from 'react'

import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'

import useEmblaCarousel from 'embla-carousel-react'

const tabs = ['Avatar', 'Genius ID', 'Card', 'Experience', 'Skills']

const SliderPage = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const [selected, setSelected] = useState(tabs[0])

  const [slideIndex, setSlideIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('Avatar')

  useEffect(() => {
    setSelected(activeTab)
  }, [activeTab])

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()) // Access API
    }
  }, [emblaApi])

  const handleChangeSlide = (index) => {
    setSlideIndex(index)
    if (emblaApi) emblaApi.scrollTo(index)
  }

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        const index = emblaApi.selectedScrollSnap()
        setSlideIndex(index)
        setActiveTab(tabs[index])
      })
    }
  }, [emblaApi, tabs])

  return (
    <>
      <div
        className='max-w-48rem mx-auto'
        style={{ '--slide-height': '19rem', '--slide-spacing': '1rem', '--slide-size': '65%' }}
      >
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex'>
            <div className='w-full min-w-0 shrink-0 grow'>
              <AvatarComponent />
            </div>
            <div className='w-full min-w-0 shrink-0 grow'>
              <UserInfoComponent />
            </div>
            <div className='w-full min-w-0 shrink-0 grow'>
              <Card2Component />
            </div>
            <div className='w-full min-w-0 shrink-0 grow'>
              <ExperienceComponent />
            </div>
            <div className='w-full min-w-0 shrink-0 grow'>
              <SkillsComponent />
            </div>
          </div>
          <button className='absolute left-10 top-56 text-5xl' onClick={scrollPrev}>
            <MdNavigateBefore />
          </button>
          <button className='absolute right-10 top-56 text-5xl' onClick={scrollNext}>
            <MdNavigateNext />
          </button>
        </div>
      </div>

      <div className='flex items-center justify-center'>
        <div className='my-7 flex h-12 w-fit items-center justify-center gap-2 rounded-full border-x-2 border-[#6B37CA] bg-[#D1CACA]/20 p-6 shadow-md shadow-[#6B37CA] backdrop-blur-md md:gap-7'>
          {tabs.map((tab, index) => (
            <Chip
              text={tab}
              selected={selected === tab}
              setSelected={setSelected}
              setActiveTab={setActiveTab}
              key={tab}
              index={index}
              handleChangeSlide={handleChangeSlide}
            />
          ))}
        </div>
      </div>
    </>
  )
}

const Chip = ({ text, selected, setSelected, setActiveTab, index, handleChangeSlide }) => {
  const handleClick = () => {
    setSelected(text)
    setActiveTab(text) // Update the active tab
    handleChangeSlide(index)
  }

  return (
    <button
      onClick={handleClick}
      className={`${
        selected ? 'bg-purple-600 text-white' : 'text-slate-200 hover:bg-slate-700 hover:text-slate-200'
      } relative rounded-full px-2.5 py-0.5 text-sm transition-colors`}
    >
      <span className='relative z-10 pt-4'>{text}</span>
      {selected && (
        <motion.span
          layoutId='pill-tab'
          transition={{ type: 'spring', duration: 0.5 }}
          className='absolute inset-0 z-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600'
        ></motion.span>
      )}
    </button>
  )
}

export default SliderPage
