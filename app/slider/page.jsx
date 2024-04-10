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

const SliderPage = () => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <>
      <div className='flex w-full flex-col'>
        <Slider {...settings}>
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
      </div>
    </>
  )
}

export default SliderPage
