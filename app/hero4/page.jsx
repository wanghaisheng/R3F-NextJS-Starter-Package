import WeatherBackground from '@/components/Weather/WeatherBackground'
import WeatherClientComponent from '@/components/Weather/WeatherClientComponent'

import HeroComponent from '@/components/HeroComponent/HeroComponent'

const Hero4 = () => {
  return (
    <div>
      <WeatherClientComponent>
        <WeatherBackground city='Kathmandu' />
      </WeatherClientComponent>
      <HeroComponent />
    </div>
  )
}

export default Hero4
