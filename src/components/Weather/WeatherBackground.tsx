import Card from '@/components/Weather/Card'

export default async function WeatherBackground({ city }: { city: string }) {
  const apiKey = process.env.WEATHER_API_KEY
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='

  async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    let data = await response.json()

    return data
  }

  try {
    const { name, weather, main, wind, visibility, dt } = await checkWeather(city)

    const icon = weather[0].icon
    const weatherStatus = weather[0].main

    const weatherDescription = weather[0].description

    let backgroundImageUrl
    let backgroundVideoUrl

    switch (weatherStatus) {
      case 'Clouds':
        backgroundVideoUrl = 'livewallpapers/cloudsAfternoon.mp4'
        break
      case 'Rain':
        backgroundVideoUrl = 'livewallpapers/rainy.mp4'
        break
      case 'Fog':
        backgroundVideoUrl = 'livewallpapers/rainy.mp4'
        break
      case 'Smoke':
        backgroundVideoUrl = 'livewallpapers/rainy.mp4'
        break
      case 'Haze':
        backgroundVideoUrl = 'livewallpapers/rainy.mp4'
        break
      case 'Thunderstorm':
        backgroundVideoUrl = 'livewallpapers/rainy.mp4'
        break
      case 'Snow':
        backgroundVideoUrl = 'livewallpapers/rainy.mp4'
        break
      case 'Clear':
        backgroundVideoUrl = 'livewallpapers/rainy.mp4'
        break
      case 'Dust':
        backgroundVideoUrl = 'livewallpapers/rainy.mp4'
        break
      case 'Ash':
        backgroundVideoUrl = 'livewallpapers/rainy.mp4'
        break
      case 'Sand':
        backgroundImageUrl =
          'https://imgs.search.brave.com/4GqnlrXqgD0zLsh10UyuiR7aROJ6BO9AiZh_qJCfuLI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTAy/ODgzNzk3Ni9waG90/by9jbG91ZHMtaW4t/c2FuZHN0b3JtLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1t/LXhlWU4yZlU1Q3Bq/cXJPTUQtMmFqdWFU/QzdoTktjbE11MjVt/S3ZPSWNzPQ'
        break
      case 'Squall':
        backgroundImageUrl =
          'https://imgs.search.brave.com/giC_RGjzqVshq05-VHQz6HMnug51uM20Oa4J91n_sGQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi80LzQ2L1Ro/dW5kZXJfYW5kX3dp/bmRfZHVyaW5nX2Ff/dGh1bmRlcnN0b3Jt/LndlYm0vNjQwcHgt/LVRodW5kZXJfYW5k/X3dpbmRfZHVyaW5n/X2FfdGh1bmRlcnN0/b3JtLndlYm0uanBn'
        break
      case 'Tornado':
        backgroundImageUrl =
          'https://imgs.search.brave.com/7_qrO-a3Y-nqOBGAd4WTbbS9y_vaTRvEcwDfPhQpIIY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzU3LzMyLzIz/LzM2MF9GXzE1NzMy/MjMzOF9iWGxpTXNw/SEM2cUdaSTNqWjF4/bHZteHJqSWdFQ0Rh/ZS5qcGc'
        break
      case 'Drizzle':
        backgroundImageUrl =
          'https://imgs.search.brave.com/Wsrsbrdb_3P3TiGJbN8mFbznQuQTc74iyPcFHuQMUQs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI1/MTM1Mzg3NS9waG90/by9yYWluLWRyb3Bz/LWJhY2tncm91bmQu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXQtWjFZM2hVODRF/ZHQwN1F3TFZtSkRW/N2Z0RDJ3R3BMcHFh/LWd6RkVLYUk9'
        break
    }

    return (
      <>
        <div className='relative top-[-82px] h-screen w-full '>
          <video className='absolute inset-0 size-full object-cover' autoPlay loop muted>
            <source src={backgroundVideoUrl} type='video/mp4' />
          </video>

          {/* <iframe
            className='absolute left-0 top-0 z-0 size-full'
            src='https://www.youtube.com/embed/GrypM52edHg?autoplay=1&loop=1&controls=0&mute=1&playlist=GrypM52edHg'
            allow='autoplay; encrypted-media'
            allowFullScreen
          ></iframe> */}

          <div className='fixed right-5 top-24'>
            <Card
              cityName={name}
              humidity={main.humidity}
              temperature={main.temp}
              windSpeed={wind.speed}
              visibility={visibility}
              icon={icon}
              weatherStatus={weatherStatus}
              weatherDescription={weatherDescription}
            />
          </div>
        </div>
      </>
    )
  } catch (error) {
    throw new Error('Please enter the valid city name')
  }
}
