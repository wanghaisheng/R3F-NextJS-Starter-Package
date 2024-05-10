'use client'

import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'

import SkillsComponent from '@/components/Slider/SkillsComponent'
import AvatarComponent from '@/components/Slider/AvatarComponent'

import ExperienceComponent from '@/components/Slider/ExperienceComponent'
import ConnectionComponent from '@/components/Slider/ConnectionComponent'
import UserInfoComponent from '@/components/Slider/UserInfoComponent'
import Card2Component from '@/components/Slider/Card2Component'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

  const handleNextButtonClick = () => {
    if (emblaApi) {
      emblaApi.scrollNext()
    }
  }

  return (
    <section className='mx-auto w-full'>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex' style={{ marginLeft: `calc(-1 * var(--slide-spacing))` }}>
          <div className='w-[900px] min-w-0 flex-none pl-4'>
            <div
              className='flex items-center justify-center'
              // style={{ height: '19rem' }}
            >
              <UserInfoComponent onNextButtonClick={handleNextButtonClick} />
            </div>
          </div>
          <div className='w-[900px] min-w-0 flex-none pl-4'>
            <div
              className='flex items-center justify-center'
              // style={{ height: '19rem' }}
            >
              <AvatarComponent onNextButtonClick={handleNextButtonClick} />
            </div>
          </div>
          <div className='w-[900px] min-w-0 flex-none pl-4'>
            <div
              className='flex items-center justify-center'
              // style={{ height: '19rem' }}
            >
              <Card2Component onNextButtonClick={handleNextButtonClick} />
            </div>
          </div>
          <div className='w-[900px] min-w-0 flex-none pl-4'>
            <div
              className='flex items-center justify-center'
              // style={{ height: '19rem' }}
            >
              <ConnectionComponent onNextButtonClick={handleNextButtonClick} />
            </div>
          </div>
          <div className='w-[900px] min-w-0 flex-none pl-4'>
            <div
              className='flex items-center justify-center'
              // style={{ height: '19rem' }}
            >
              <ExperienceComponent onNextButtonClick={handleNextButtonClick} />
            </div>
          </div>
          <div className='w-[900px] min-w-0 flex-none pl-4'>
            <div
              className='flex items-center justify-center'
              // style={{ height: '19rem' }}
            >
              <SkillsComponent />
            </div>
          </div>
        </div>
      </div>

      <div className='mt-7 grid grid-cols-2 justify-between gap-4'>
        <div className='grid grid-cols-2 items-center gap-2'>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
