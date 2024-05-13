import Image from 'next/image'

import MapComponent from '../LeafletMap/LeafletMap'

export default function ShowRegion2({ filter, searchTerm }: { filter: string; searchTerm: string }) {
  return (
    <>
      <div className='relative flex flex-col'>
        {/* <Image src='/svgs/world.svg' width={3000} height={500} alt='world map' /> */}

        <div className='flex w-full justify-end pr-5'>
          <div className='h-[500px] w-[50%]'>
            <MapComponent />
            {/* <Image src='/svgs/na.svg' width={500} height={500} alt='world map' /> */}
          </div>
          <div className='mx-10 flex w-[30%] flex-col items-center justify-center rounded-md bg-black/50'>a</div>
        </div>
      </div>
    </>
  )
}
