import Image from 'next/image'

export default function AddRegion() {
  const regions = [
    {
      name: 'East Asia',
      icon: 'https://cdn-icons-png.flaticon.com/128/15865/15865373.png',
      image:
        'https://cdnb.artstation.com/p/assets/images/images/037/588/885/4k/marcelo-m-prado-female-ninja-black-05.jpg?1621516675',
    },
    {
      name: 'South Asia',
      icon: 'https://cdn-icons-png.flaticon.com/128/356/356749.png',
      image:
        'https://media.sketchfab.com/models/65c441d2146c49a1af115bceb1588727/thumbnails/99ed5e82c5a943dc9a11d3c6c7cda128/ab7d63a6b68f4ef18a95dda919163d16.jpeg',
    },
    {
      name: 'Meso America',
      icon: 'https://cdn-icons-png.flaticon.com/128/2492/2492046.png',
      image:
        'https://media.sketchfab.com/models/76eb28a30c4743358822e168a74d4634/thumbnails/3c5aa21988b842e881d0cd4668d5a585/47af80f4c83b46789729c624a1bb63c5.jpeg',
    },
    {
      name: 'North Africa',
      icon: 'https://cdn-icons-png.flaticon.com/128/15597/15597373.png',
      image: 'https://design4real.de/wp-content/uploads/2024/01/ar_avatar-1536x878.webp',
    },
  ]

  return (
    <div className='mx-10 mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {regions.map((region, index) => (
        <div className='flex min-w-0 flex-col items-center justify-center' key={index}>
          <div
            style={{
              backgroundImage: `url(${region.image})`,
            }}
            className='h-48 w-full rounded-lg bg-black bg-cover bg-center shadow-md md:h-56'
          >
            <div className='flex h-full flex-col justify-between'>
              <div className='h-full rounded-t-lg bg-black/70 px-3 py-2 text-center font-bold uppercase tracking-wide text-white transition duration-300 ease-out hover:bg-black/0'>
                <div className='flex h-full items-center justify-center transition duration-500 ease-out hover:opacity-0'>
                  <Image unoptimized src={region.icon} alt='region icon' height={60} width={60} />
                </div>
              </div>
              <div className='relative flex flex-col items-center rounded-b-lg bg-purple-950 px-3 py-2'>
                <h1 className='font-bold text-white transition duration-300 ease-in-out '>{region.name}</h1>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
