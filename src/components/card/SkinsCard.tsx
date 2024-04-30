'use client'

import { useCallback, useEffect, useState } from 'react'

// For the carousel
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import useEmblaCarousel from 'embla-carousel-react'

import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'

export default function SkinsCard() {
  const skins = [
    {
      name: 'Stealthy Shadow',
      price: '$4.99',
      image:
        'https://cdnb.artstation.com/p/assets/images/images/037/588/885/4k/marcelo-m-prado-female-ninja-black-05.jpg?1621516675',
    },
    {
      name: 'Galactic Warrior',
      price: '$7.99',
      image:
        'https://media.sketchfab.com/models/65c441d2146c49a1af115bceb1588727/thumbnails/99ed5e82c5a943dc9a11d3c6c7cda128/ab7d63a6b68f4ef18a95dda919163d16.jpeg',
    },
    {
      name: 'Mythic Mage',
      price: '$3.99',
      image:
        'https://media.sketchfab.com/models/76eb28a30c4743358822e168a74d4634/thumbnails/3c5aa21988b842e881d0cd4668d5a585/47af80f4c83b46789729c624a1bb63c5.jpeg',
    },
    {
      name: 'Cyberpunk Assassin',
      price: '$9.99',
      image: 'https://design4real.de/wp-content/uploads/2024/01/ar_avatar-1536x878.webp',
    },
  ]

  // For the carousel
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

  return (
    <div className='mx-2 my-5 flex py-2 md:mx-6'>
      <button className='' onClick={scrollPrev}>
        <MdNavigateBefore />
      </button>
      <div className='w-full overflow-hidden' ref={emblaRef}>
        <div className='mx-2 flex items-center'>
          {skins.map((skin, index) => (
            <div className='mx-2 flex w-full shrink-0 grow flex-col items-center justify-center md:min-w-0' key={index}>
              <div
                style={{
                  backgroundImage: `url(${skin.image})`,
                }}
                className='h-48 w-full rounded-lg bg-gray-300 bg-cover bg-center shadow-md md:h-64'
              >
                <div className='flex h-full flex-col justify-between'>
                  <div className='px-3 py-2 text-center font-bold uppercase tracking-wide text-white'>{skin.name}</div>
                  <div className='flex items-center justify-between rounded bg-purple-700/60 px-3 py-2'>
                    <h1 className='font-bold text-white'>{skin.price}</h1>
                    <DrawOutlineButton>Add to cart</DrawOutlineButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className='' onClick={scrollNext}>
        <MdNavigateNext />
      </button>
    </div>
  )
}
