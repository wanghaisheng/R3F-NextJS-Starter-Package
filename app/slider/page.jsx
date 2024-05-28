import EmblaCarousel from '@/components/Slider/EmblaCarousel'

const OPTIONS = { loop: true }

const Slider = () => (
  <>
    <div className='relative'>
      <div className='absolute -top-10 z-50 flex w-full justify-center'>
        <p className='animate-pulse rounded-lg p-2 font-semibold  text-purple-200 shadow shadow-violet-400'>
          BETA TESTING
        </p>
      </div>

      <EmblaCarousel options={OPTIONS} />
    </div>
  </>
)

export default Slider
