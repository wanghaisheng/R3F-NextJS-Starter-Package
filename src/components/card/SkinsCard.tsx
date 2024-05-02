'use client'

import { useCallback, useEffect } from 'react'
import Image from 'next/image'

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
    <div className='flex justify-center'>
      <div className='mx-2 my-5 flex h-[250px] w-[360px] py-2 md:mx-6'>
        <button id='skinback' aria-label='prevskin' onClick={scrollPrev}>
          <MdNavigateBefore />
        </button>
        <div className='size-full overflow-hidden rounded-bl-lg rounded-tr-lg' ref={emblaRef}>
          <div className='mx-2 flex size-full items-center '>
            {skins.map((skin, index) => (
              <div
                className='mx-2 flex size-full shrink-0 grow flex-col items-center justify-center rounded-bl-lg rounded-tr-lg md:min-w-0'
                key={index}
              >
                <a
                  href='#'
                  className='relative flex size-full min-w-0 flex-col items-center justify-center rounded-bl-lg rounded-tr-lg bg-purple-900/30 transition duration-500 ease-out'
                  key={index}
                >
                  <span className='absolute top-0 flex size-full rounded-bl-lg rounded-tr-lg '>
                    <Image
                      unoptimized
                      src={skin.image}
                      alt={skin.name}
                      layout='fill'
                      objectFit='cover'
                      loading='lazy'
                      className='rounded-bl-lg rounded-tr-lg'
                    />
                  </span>
                  <span className='absolute top-0 flex w-full flex-col items-center rounded-tr-md px-3 py-2 transition duration-300 hover:text-purple-400'>
                    <h1 className='font-bold'>{skin.name}</h1>
                  </span>
                  <span className='absolute bottom-0 flex w-full items-center justify-between rounded-bl-md bg-purple-950 px-3 py-2'>
                    <h1 className='font-bold text-white'>{skin.price}</h1>
                    <DrawOutlineButton>Add to cart</DrawOutlineButton>
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
        <button id='skinnext' aria-label='nextskin' onClick={scrollNext} className='ml-1'>
          <MdNavigateNext />
        </button>
      </div>
    </div>
  )
}
