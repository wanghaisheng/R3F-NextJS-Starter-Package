import Image from 'next/image'

export default function HomeView({ userData, projPics, experience, handleIsFlip }) {
  const categories = [
    { name: 'Profile Pictures', link: 'profilePics', image: userData?.overall_user_image?.[0] },
    { name: 'Projects', link: 'projPics', image: projPics[0] },
    { name: 'Experience', link: 'experience', image: '/experience-icon.png' },
    { name: 'Skills', link: 'skills', image: '/skills-icon.png' },
  ]

  return (
    <div className='w-full'>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {categories.map((category, index) => (
          <div key={index}>
            <div className='flex flex-col items-center'>
              <div className='relative h-40 w-full overflow-hidden rounded-lg'>
                <Image
                  src={category.image || '/placeholder.png'}
                  alt={category.name}
                  fill
                  unoptimized
                  loading='lazy'
                  className='object-cover transition-all duration-300 ease-in-out hover:scale-110'
                />
              </div>
              <p className='mt-2 text-lg font-semibold'>{category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
