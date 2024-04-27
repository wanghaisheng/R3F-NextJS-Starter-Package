import WeatherClientComponent from '@/components/Weather/WeatherClientComponent'
import WeatherBackground from '@/components/Weather/WeatherBackground'

export default function WeatherCard() {
  return (
    <WeatherClientComponent>
      <WeatherBackground city='Kathmandu' />
    </WeatherClientComponent>
  )
}
