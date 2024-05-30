import WeatherBackground from '@/components/Weather/WeatherBackground'
import WeatherClientComponent from '@/components/Weather/WeatherClientComponent'

import HeroComponent from '@/components/HeroComponent/HeroComponent'

const Hero4 = () => {
  return (
    <div className='relative'>
      <div className='absolute inset-0 z-0'>
        <WeatherClientComponent>
          <WeatherBackground city='Kathmandu' />
        </WeatherClientComponent>
      </div>
      <div className='relative z-10'>
        <HeroComponent />
      </div>
    </div>
  )
}

export default Hero4
