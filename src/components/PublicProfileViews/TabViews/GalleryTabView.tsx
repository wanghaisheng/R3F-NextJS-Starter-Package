'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const GalleryTabView = ({ userData }: { userData: any }) => {
  const [profilePics, setProfilePics] = useState([])
  const [showMorePics, setShowMorePics] = useState(false)
  const handleShowMorePics = () => {
    setShowMorePics(!showMorePics)
  }

  // get user profile pics for gallery
  useEffect(() => {
    const getProfilePics = () => {
      if (userData?.overall_user_image) {
        const profilePics = userData.overall_user_image

        setProfilePics(profilePics)
      }
    }
    if (userData) {
      getProfilePics()
    }
  }, [userData])

  // Function to render pictures
  const renderPictures = (pictures, showMore) => {
    // Grid View
    const picturesToShow = showMore ? pictures : pictures.slice(0, 9)
    return (
      <div className='size-full overflow-auto'>
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
            {pictures.length > 9 && (
              <button onClick={handleShowMorePics} className='rounded bg-violet-600 p-2 text-white hover:bg-violet-800'>
                {showMorePics ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {userData && profilePics.length > 0 ? (
        renderPictures(profilePics, showMorePics)
      ) : (
        <div className='ml-4 flex h-[190px] w-[290px] animate-pulse items-center justify-center rounded-lg bg-white/10'>
          <p>No profile pictures to show</p>
        </div>
      )}
    </>
  )
}

export default GalleryTabView
