'use client'

import WelcomeComponent from '@/components/Slider/WelcomeComponent'
import SkillsComponent from '@/components/Slider/SkillsComponent'
import AvatarComponent from '@/components/Slider/AvatarComponent'
import ExperienceComponent from '@/components/Slider/ExperienceComponent'
import CardComponent from '@/components/Slider/CardComponent'
import ChipTabs from '@/components/Slider/Footer'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { IoChevronForwardSharp, IoChevronBack } from 'react-icons/io5'

const SliderPage = () => {
  let settings = {
    dots: false,
    arrows: false,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <>
      <Slider {...settings} className='w-full'>
        <div>
          <WelcomeComponent />
        </div>
        <div>
          <SkillsComponent />
        </div>
        <div>
          <AvatarComponent />
        </div>
        <div>
          <ExperienceComponent />
        </div>
        <div>
          <CardComponent />
        </div>
      </Slider>
      <ChipTabs />
    </>
  )
}

export default SliderPage
