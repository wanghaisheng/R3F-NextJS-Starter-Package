import WeatherBackground from '@/components/Weather/WeatherBackground'
import WeatherClientComponent from '@/components/Weather/WeatherClientComponent'

import PrivateProfile from '@/components/ProfileComponent/PrivateProfile'

const Hero4 = () => {
  return (
    <div className='relative'>
      <div className='absolute inset-0 z-0'>
        <WeatherClientComponent>
          <WeatherBackground city='Kathmandu' />
        </WeatherClientComponent>
      </div>
      <div className='relative z-10'>
        <PrivateProfile />
      </div>
    </div>
  )
}

export default Hero4
