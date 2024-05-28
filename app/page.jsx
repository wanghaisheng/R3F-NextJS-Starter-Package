import Link from 'next/link'

export default function Page() {
  return (
    <>
      <div
        className='relative flex min-h-screen flex-col bg-gradient-to-r from-purple-950/70 to-violet-400/20'
        id='about-me'
      >
        <div
          className='absolute inset-0 bg-cover bg-center opacity-30'
          style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}
        ></div>
        <div className='z-20 mt-16 flex flex-1 items-center justify-center p-10'>
          <div className='rounded-3xl bg-violet-400/30 p-6 shadow-lg backdrop-blur-lg'>
            <h1 className='mb-6 text-4xl font-bold text-white'>
              Welcome to <span className='text-yellow-400'>GG</span> User
            </h1>
            <p className='mb-4 flex animate-pulse justify-center text-yellow-400'>
              Discover more by exploring the slider below.
            </p>
            <div className='flex justify-center'>
              <Link
                className='relative rounded-lg p-2 font-bold text-white backdrop-blur-xl transition-transform duration-300 hover:scale-105 hover:bg-slate-900 '
                href='/slider'
              >
                SLIDER
                <div className='absolute right-0 top-0 size-3 animate-ping rounded-full bg-blue-300'></div>
              </Link>
            </div>
          </div>
        </div>
        <footer className='z-20 flex items-center justify-center p-4 text-white'>
          <p>@ This is a BETA version.</p>
        </footer>
      </div>
    </>
  )
}
