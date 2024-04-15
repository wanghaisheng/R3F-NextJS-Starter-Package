'use client'

import SkillsComponent from '@/components/Slider/SkillsComponent'
import AvatarComponent from '@/components/Slider/AvatarComponent'
import ExperienceComponent from '@/components/Slider/ExperienceComponent'
import ChipTabs from '@/components/footer/Footer'

import UserInfoComponent from '@/components/Slider/UserInfoComponent'
import Card2Component from '@/components/Slider/Card2Component'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import Footer2 from '@/components/footer/Footer2'
import Link from 'next/link'

const tabs = ['Avatar', 'Genius ID', 'Card', 'Experience', 'Skills']

const SliderPage = () => {
  const [selected, setSelected] = useState(tabs[0])

  const [slideIndex, setSlideIndex] = useState(0)
  const [updateCount, setUpdateCount] = useState(0)
  let sliderRef = useRef(null)
  const [activeTab, setActiveTab] = useState('Avatar')

  useEffect(() => {
    setSelected(activeTab)
  }, [activeTab])

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    adaptiveHeight: false,
    centerMode: true,
    draggable: false,
    focusonSelect: true,
    beforeChange: (current, next) => setSlideIndex(next),
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],

    afterChange: (index) => {
      switch (index) {
        case 0:
          setActiveTab('Avatar')
          break
        case 1:
          setActiveTab('Genius ID')
          break
        case 2:
          setActiveTab('Card')
          break
        case 3:
          setActiveTab('Experience')
          break
        case 4:
          setActiveTab('Skills')
          break
        default:
          setActiveTab('Avatar')
      }
    },
  }

  const handleChangeSlide = (index) => {
    setSlideIndex(index)
    sliderRef.slickGoTo(index)
  }

  return (
    <>
      <div className=' mt-4 flex h-full md:px-10 lg:px-10 xl:px-10 2xl:px-24'>
        <Slider
          ref={(slider) => {
            sliderRef = slider
          }}
          {...settings}
          className='size-full 2xl:w-full'
        >
          <AvatarComponent />
          <UserInfoComponent />
          <Card2Component />
          <ExperienceComponent />
          <SkillsComponent />
        </Slider>
      </div>

      <div className='mt-10 flex justify-center'>
        <input
          className='flex w-1/5 justify-center'
          onChange={(e) => handleChangeSlide(e.target.value)}
          value={slideIndex}
          type='range'
          min={0}
          max={4}
          style={{ color: 'red' }}
        />
      </div>

      <div className='flex items-center justify-center'>
        <div className='my-7 flex h-12 w-fit items-center justify-center gap-2 rounded-full border-x-2 border-[#6B37CA] bg-[#D1CACA]/20 p-6 shadow-md shadow-[#6B37CA] backdrop-blur-md md:gap-7'>
          {tabs.map((tab, index) => (
            <Chip
              text={tab}
              selected={selected === tab}
              setSelected={setSelected}
              setSlideIndex={setSlideIndex}
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

const Chip = ({ text, selected, setSelected, setSlideIndex, index, handleChangeSlide }) => {
  const handleClick = () => {
    setSelected(text)
    handleChangeSlide(index)
  }

  return (
    <button
      onClick={handleClick}
      className={`${
        selected ? 'text-white' : 'text-slate-200 hover:bg-slate-700 hover:text-slate-200'
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
