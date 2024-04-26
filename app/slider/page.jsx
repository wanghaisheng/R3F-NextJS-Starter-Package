'use client'

import SkillsComponent from '@/components/Slider/SkillsComponent'
import AvatarComponent from '@/components/Slider/AvatarComponent'
import ExperienceComponent from '@/components/Slider/ExperienceComponent'
import ConnectionComponent from '@/components/Slider/ConnectionComponent'
import UserInfoComponent from '@/components/Slider/UserInfoComponent'
import Card2Component from '@/components/Slider/Card2Component'

import { motion } from 'framer-motion'
import { useCallback, useEffect, useState, useRef } from 'react'

import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'

import useEmblaCarousel from 'embla-carousel-react'

const tabs = ['Avatar', 'Genius ID', 'Card', 'Connection', 'Experience', 'Skills']

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
  }, [emblaApi])

  const handleNextButtonClick = () => {
    if (emblaApi) {
      emblaApi.scrollNext()
    }
  }

  return (
    <>
      <div className='mx-auto mb-28 mt-10 max-w-7xl'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='mb-4 flex'>
            <div className='w-full min-w-0 shrink-0 grow'>
              <AvatarComponent onNextButtonClick={handleNextButtonClick} />
            </div>
            <div className='w-full min-w-0 shrink-0 grow'>
              <UserInfoComponent onNextButtonClick={handleNextButtonClick} />
            </div>
            <div className='w-full min-w-0 shrink-0 grow'>
              <Card2Component onNextButtonClick={handleNextButtonClick} />
            </div>
            <div className='w-full min-w-0 shrink-0 grow'>
              <ConnectionComponent onNextButtonClick={handleNextButtonClick} />
            </div>
            <div className='w-full min-w-0 shrink-0 grow'>
              <ExperienceComponent onNextButtonClick={handleNextButtonClick} />
            </div>
            <div className='w-full min-w-0 shrink-0 grow'>
              <SkillsComponent />
            </div>
          </div>
          <button id='prevBtn' className='absolute left-10 top-56 text-5xl' onClick={scrollPrev}>
            <MdNavigateBefore />
          </button>
          <button id='nextBtn' className='absolute right-10 top-56 text-5xl' onClick={scrollNext}>
            <MdNavigateNext />
          </button>
        </div>
      </div>

      {/* Footer Nav */}
      <footer class='fixed inset-x-0 bottom-4 flex justify-center'>
        {/* <img src='/footer.png' alt='' className='relative hidden w-[48%] md:block' /> */}
        <div className='flex items-center justify-center'>
          <div className='grid w-fit grid-cols-3 gap-2 rounded-3xl p-6 shadow-inner shadow-[#6B37CA] backdrop-blur-md md:flex md:h-10 md:items-center md:justify-center md:gap-7'>
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
      </footer>
    </>
  )
}

// For footer navbar
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
      {/* text in navbar */}
      <span className='relative z-10 pt-4'>{text}</span>
      {/* Purple Background */}
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
