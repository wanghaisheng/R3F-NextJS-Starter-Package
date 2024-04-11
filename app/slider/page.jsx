'use client'

import WelcomeComponent from '@/components/Slider/WelcomeComponent'
import SkillsComponent from '@/components/Slider/SkillsComponent'
import AvatarComponent from '@/components/Slider/AvatarComponent'
import ExperienceComponent from '@/components/Slider/ExperienceComponent'
import CardComponent from '@/components/Slider/CardComponent'
import ChipTabs from '@/components/Slider/Footer'

import Card2Component from '@/components/Slider/Card2Component'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { IoChevronForwardSharp, IoChevronBack } from 'react-icons/io5'
import Card2 from '@/card2/page'

const SliderPage = () => {
  const settings = {
    dots: false,
    // arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    adaptiveHeight: true,
    centerMode: true,
    draggable: false,
    focusonSelect: true,
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

    // // customize next arrow and previous arrow colors
    // nextArrow: (
    //   <div>
    //     <button className='me -5 size-10 rounded-full text-2xl text-gray-500'>
    //       <i className='fas fa-chevron-right text-5xl'>
    //         <IoChevronForwardSharp />
    //       </i>
    //     </button>
    //   </div>
    // ),
    // prevArrow: (
    //   <div className=''>
    //     <button className='size-10 rounded-full text-2xl text-gray-500'>
    //       <i className='fas fa-chevron-right text-5xl'>
    //         <IoChevronBack />
    //       </i>
    //     </button>
    //   </div>
    // ),
  }

  return (
    <>
      <div className=' mt-4 flex h-full md:px-10 lg:px-10 xl:px-10 2xl:px-24'>
        <Slider {...settings} className='size-full 2xl:w-full'>
          {/* <WelcomeComponent /> */}
          <AvatarComponent />
          <CardComponent />
          <Card2Component />
          <ExperienceComponent />
          <SkillsComponent />
        </Slider>
      </div>
      <ChipTabs />
    </>
  )
}

export default SliderPage
