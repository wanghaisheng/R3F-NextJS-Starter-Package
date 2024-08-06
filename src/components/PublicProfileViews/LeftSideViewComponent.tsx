import CustomSwiper from '../MyComponents/CustomSwiper'

export default function LeftSideViewComponent() {
  return (
    <>
      <div className='relative mb-8 mt-[-36px] flex w-full justify-center'>
        <div className='z-30 size-[185px] rounded-full bg-white'></div>
        <div className='absolute -bottom-3 z-30 size-[30px] rounded-full bg-gray-500'></div>
      </div>
      <div className='fixed left-2 top-2 hover:text-pink-400'>SE</div>
      <div className='fixed right-2 top-2 hover:text-pink-400'>FF</div>

      <div className='flex w-full justify-between px-7 text-sm'>
        <div className='flex h-[29px] items-center rounded-full bg-black text-white'>
          <div className='size-[32px] rounded-full border border-green-500 bg-black'>I</div>
          <p className='pl-2 pr-3'>ME</p>
        </div>
        <div className='flex h-[29px] items-center rounded-full bg-black text-white'>
          <div className='size-[32px] rounded-full border border-yellow-500 bg-black'>I</div>
          <p className='pl-2 pr-3'>US</p>
        </div>
        <div className='flex h-[29px] items-center rounded-full bg-black text-white'>
          <div className='size-[32px] rounded-full border border-white bg-black'>I</div>
          <p className='pl-2 pr-3'>ACT</p>
        </div>
      </div>
    </>
  )
}
