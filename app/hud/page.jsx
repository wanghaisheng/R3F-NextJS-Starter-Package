import WeatherBackground from '@/components/Weather/WeatherBackground'
import WeatherClientComponent from '@/components/Weather/WeatherClientComponent'

import PrivateProfile from '@/components/ProfileComponent/PrivateProfile'

// import { useUser } from '@/UserClientProvider'

export default function Hud() {
  // const { user } = useUser()

  // console.log('user', user)

  return (
    <div className='relative'>
      {/* <div className='absolute inset-0 z-0'>
        <WeatherClientComponent>
          <WeatherBackground city='Kathmandu' />
        </WeatherClientComponent>
      </div> */}
      <div className='relative z-10'>
        <PrivateProfile />
      </div>
    </div>
  )
}
