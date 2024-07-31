'use client'

import CustomSwiper from '@/components/MyComponents/CustomSwiper'
import Image from 'next/image'

export default function HomeView({ userData, projPics, experience, handleIsFlip, setActiveTab }) {
  const categories = [
    { name: 'Profile Pictures', link: 'profilePics', image: userData?.overall_user_image?.[0] },
    { name: 'Projects', link: 'projPics', image: projPics[0] },
    { name: 'Experience', link: 'experience', image: '/experience-icon.png' },
  ]

  const galleryPhotos = userData?.overall_user_image || []
  const displayPhotos = galleryPhotos.slice(0, 7)
  const displayProjectPics = projPics?.slice(0, 3)
  const remainingPhotos = Math.max(0, galleryPhotos.length - 7)
  const remainingProjectPhotos = Math.max(0, projPics?.length - 3)

  const handleViewMore = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className='flex w-full flex-col items-center'>
      <div className='h-[150px] w-full rounded-lg bg-white'></div>

      {projPics && (
        <div className='mt-4 flex h-[220px] w-full justify-between gap-x-2'>
          {/* Here I did it this way because it was  creating an extra space even if there were only 3 pictures */}
          {remainingProjectPhotos !== 0 ? (
            <CustomSwiper
              slidesPerView={3}
              initialSlide={1}
              slideShadows={false}
              depth={100}
              rotate={0}
              stretch={0}
              modifier={2.1}
            >
              {displayProjectPics.map((proj, index) => (
                <div
                  className='h-[200px] w-[100%] rounded-[7.35039px] border-2 border-black bg-yellow-500'
                  key={index}
                ></div>
              ))}

              {remainingProjectPhotos !== 0 && (
                <div className={`h-[200px] w-[100%] rounded-[7.35039px] border-2 border-black bg-yellow-500`}>
                  <div
                    className='flex size-full cursor-pointer items-center justify-center'
                    onClick={() => handleViewMore('projPics')}
                  >
                    <p className='text-center'>
                      View More
                      <br />+ {remainingProjectPhotos}
                    </p>
                  </div>
                </div>
              )}
            </CustomSwiper>
          ) : (
            <CustomSwiper
              slidesPerView={3}
              initialSlide={1}
              slideShadows={false}
              depth={100}
              rotate={0}
              stretch={0}
              modifier={2.1}
            >
              {displayProjectPics.map((proj, index) => (
                <div
                  className='h-[200px] w-[100%] rounded-[7.35039px] border-2 border-black bg-yellow-500'
                  key={index}
                ></div>
              ))}
            </CustomSwiper>
          )}
        </div>
      )}

      <div className='mt-4 grid w-full grid-cols-4 gap-2'>
        {displayPhotos.map((photo, index) => (
          <div className='aspect-square overflow-hidden rounded-lg bg-white' key={index}>
            <Image
              src={photo || '/placeholder.png'}
              alt={`Gallery photo ${index + 1}`}
              width={100}
              height={100}
              unoptimized
              className='size-full object-cover transition-transform duration-300 ease-in-out hover:scale-125'
            />
          </div>
        ))}
        {galleryPhotos.length > 7 && (
          <div
            className='flex aspect-square cursor-pointer items-center justify-center rounded-lg bg-white'
            onClick={() => handleViewMore('profilePics')}
          >
            <p className='text-center'>
              View More
              <br />+{remainingPhotos}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
