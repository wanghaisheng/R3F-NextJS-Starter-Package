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
  const remainingPhotos = Math.max(0, galleryPhotos.length - 7)

  const handleViewMore = () => {
    setActiveTab('profilePics')
  }

  // console.log('exp', experience)

  return (
    <div className='flex w-full flex-col items-center'>
      <div className='h-[150px] w-full rounded-lg bg-white'></div>
      <div className='mt-4 h-[150px] w-full rounded-lg bg-white'></div>

      <div className='mt-4 flex h-[150px] w-[80%] justify-between gap-x-2'>
        <CustomSwiper slidesPerView={3} slideShadows={false} depth={100} rotate={0} stretch={0} modifier={2.5}>
          <div className='h-[130px] w-[200px] rounded-[7.35039px] border-2 border-black bg-yellow-500'></div>
          <div className='h-[130px] w-[200px] rounded-[7.35039px] border-2 border-black bg-yellow-500'></div>
          <div className='h-[130px] w-[200px] rounded-[7.35039px] border-2 border-black bg-yellow-500'></div>
          <div className='h-[130px] w-[200px] rounded-[7.35039px] border-2 border-black bg-yellow-500'></div>
          <div className='h-[130px] w-[200px] rounded-[7.35039px] border-2 border-black bg-yellow-500'></div>
          <div className='h-[130px] w-[200px] rounded-[7.35039px] border-2 border-black bg-yellow-500'></div>
        </CustomSwiper>
      </div>

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
            onClick={handleViewMore}
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
