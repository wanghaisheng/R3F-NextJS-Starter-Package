'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ProjectTabView({ projPics }) {
  const [showMorePics, setShowMorePics] = useState(false)

  const handleShowMorePics = () => {
    setShowMorePics(!showMorePics)
  }

  const picturesToShow = showMorePics ? projPics : projPics.slice(0, 21)

  return (
    <div className='size-full'>
      {projPics?.length !== 0 ? (
        <div className='flex size-full flex-wrap justify-center gap-x-7 gap-y-5'>
          {picturesToShow.map((pic, index) => (
            <div
              key={index}
              className='relative flex h-[272px] w-[192px] justify-center overflow-hidden rounded border-2 shadow-lg shadow-black/40'
            >
              <Image
                src={pic}
                alt='pictures'
                fill
                unoptimized
                className='rounded object-cover transition-all duration-1000 ease-in-out hover:scale-125'
              />
            </div>
          ))}
          <div className='flex w-full justify-center'>
            {projPics.length > 9 && (
              <button onClick={handleShowMorePics} className='rounded bg-violet-600 p-2 text-white hover:bg-violet-800'>
                {showMorePics ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className='ml-4 flex h-[190px] w-[290px] animate-pulse items-center justify-center rounded-lg bg-white/10'>
          <p>No project to show</p>
        </div>
      )}
    </div>
  )
}
