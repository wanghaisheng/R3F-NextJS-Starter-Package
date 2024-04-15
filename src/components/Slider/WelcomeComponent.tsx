'use client'

export default function WelcomeComponent() {
  return (
    <div className='mt-2 flex flex-col items-center justify-center'>
      <div className='relative flex h-fit w-[68%] items-center justify-center rounded-3xl border  border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'>
        <div className='flex flex-col '>
          <div className='mt-10 flex flex-col items-center justify-center drop-shadow'>
            <h1 className='text-7xl '>WELCOME</h1>
            <p className='text-xl'>Users name</p>
          </div>

          <div className='mt-10 flex justify-between'>
            <div>
              <img src='/aa.png' alt='' height='300px' width='300px' />
            </div>
            <div>
              <ol>
                <div className='flex items-center gap-x-5'>
                  <span className='mr-2 inline-flex size-4 items-center justify-center rounded-full bg-indigo-100 text-indigo-500'>
                    <svg
                      fill='none'
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='3'
                      className='size-3'
                      viewBox='0 0 24 24'
                    >
                      <path d='M20 6L9 17l-5-5'></path>
                    </svg>
                  </span>
                  <div>
                    <li className='text-2xl'>01.</li>
                    <li>Main Point lorem ipsum dolor sit amet, consectetur adipiscing .</li>
                  </div>
                </div>
                <div className='flex items-center gap-x-5'>
                  <span className='mr-2 inline-flex size-4 items-center justify-center rounded-full bg-indigo-100 text-indigo-500'>
                    <svg
                      fill='none'
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='3'
                      className='size-3'
                      viewBox='0 0 24 24'
                    >
                      <path d='M20 6L9 17l-5-5'></path>
                    </svg>
                  </span>
                  <div>
                    <li className='text-2xl'>02.</li>
                    <li>Main Point lorem ipsum dolor sit amet, consectetur adipiscing .</li>
                  </div>
                </div>
                <div className='flex items-center gap-x-5'>
                  <span className='mr-2 inline-flex size-4 items-center justify-center rounded-full bg-indigo-100 text-indigo-500'>
                    <svg
                      fill='none'
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='3'
                      className='size-3'
                      viewBox='0 0 24 24'
                    >
                      <path d='M20 6L9 17l-5-5'></path>
                    </svg>
                  </span>
                  <div>
                    <li className='text-2xl'>03.</li>
                    <li>Main Point lorem ipsum dolor sit amet, consectetur adipiscing .</li>
                  </div>
                </div>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
