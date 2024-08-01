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

      {projPics?.length !== 0 && (
        <>
          <h2 className='mt-4  flex w-full items-center justify-center text-lg font-bold text-white'>PROJECTS</h2>

          {projPics && (
            <div className='-mt-4 flex h-[220px] w-full justify-between gap-x-2'>
              {/* Here I did it this way because it was  creating an extra space even if there were only 3 pictures */}
              {remainingProjectPhotos !== 0 ? (
                <CustomSwiper
                  slidesPerView={3}
                  initialSlide={1}
                  slideShadows={false}
                  depth={-100}
                  rotate={40}
                  stretch={2}
                  modifier={1.2}
                >
                  {displayProjectPics.map((proj, index) => (
                    <div
                      className='relative h-[176px] w-[100%] overflow-hidden rounded-[7.35039px] border-2 border-black'
                      key={index}
                    >
                      <Image
                        src={proj}
                        alt={`project pic ${index}`}
                        fill
                        unoptimized
                        className='object-cover transition-transform duration-300 ease-in-out hover:scale-110'
                      />
                    </div>
                  ))}

                  {remainingProjectPhotos !== 0 && (
                    <div className={`h-[176px] w-[100%] rounded-[7.35039px] border-2 border-black bg-yellow-500`}>
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
                  depth={-100}
                  rotate={40}
                  stretch={2}
                  modifier={1.2}
                >
                  {displayProjectPics.map((proj, index) => (
                    <div
                      className='relative h-[176px] w-[100%] overflow-hidden rounded-[7.35039px] border-2 border-black'
                      key={index}
                    >
                      <Image
                        src={proj}
                        alt={`project pic ${index}`}
                        fill
                        unoptimized
                        className='object-cover transition-transform duration-300 ease-in-out hover:scale-105'
                      />
                    </div>
                  ))}
                </CustomSwiper>
              )}
            </div>
          )}
        </>
      )}

      <h2
        className={`flex w-full items-center justify-center text-lg font-bold text-white ${projPics?.length !== 0 ? '-mt-2' : 'mt-4'}`}
      >
        EXPERIENCE
      </h2>

      <div className='mt-2 flex h-[170px] w-full items-center justify-between gap-x-2'>
        <div className='flex size-full rounded-lg bg-white'></div>
        <div className='flex size-full rounded-lg bg-white'></div>
      </div>

      <h2 className='mt-2 flex w-full items-center justify-center text-lg font-bold text-white'>GALLERY</h2>

      <div className='mt-4 grid w-full grid-cols-4 gap-2'>
        {displayPhotos.map((photo, index) => (
          <div className='aspect-square overflow-hidden rounded-lg bg-white' key={index}>
            <Image
              src={photo || '/placeholder.png'}
              alt={`Gallery photo ${index + 1}`}
              width={100}
              height={100}
              unoptimized
              className='size-full object-cover transition-transform duration-300 ease-in-out hover:scale-105'
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
