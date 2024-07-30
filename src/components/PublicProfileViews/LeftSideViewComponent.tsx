import CustomSwiper from '../MyComponents/CustomSwiper'

export default function LeftSideViewComponent() {
  return (
    <div className='flex flex-col gap-2 p-2'>
      <div className='h-[200px] w-full rounded-lg bg-white/40'></div>

      {/* <div className='p-4'>
        <CustomSwiper>
          <div className='size-[100px] bg-pink-300'></div>
          <div className='size-[100px] bg-pink-300'></div>
          <div className='size-[100px] bg-pink-300'></div>
          <div className='size-[100px] bg-pink-300'></div>
          <div className='size-[100px] bg-pink-300'></div>
        </CustomSwiper>
      </div> */}

      <div className='relative h-[305px] w-full overflow-auto'>
        <div className='mb-2 h-[100px] w-full rounded-lg bg-white/40'></div>
        <div className='my-2 h-[100px] w-full rounded-lg bg-white/40'></div>
        <div className='my-2 h-[100px] w-full rounded-lg bg-white/40'></div>
        <div className='my-2 h-[100px] w-full rounded-lg bg-white/40'></div>
        <div className='my-2 h-[100px] w-full rounded-lg bg-white/40'></div>
        <div className='my-2 h-[100px] w-full rounded-lg bg-white/40'></div>
        <div className='my-2 h-[100px] w-full rounded-lg bg-white/40'></div>
        <div className='my-2 h-[100px] w-full rounded-lg bg-white/40'></div>
        <div className='my-2 h-[100px] w-full rounded-lg bg-white/40'></div>
      </div>
    </div>
  )
}
