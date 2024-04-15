'use client'

import { useState } from 'react'

const Card = ({
  cityName,
  humidity,
  temperature,
  windSpeed,
  visibility,
  icon,
  weatherStatus,
  weatherDescription,
}: {
  cityName: string
  humidity: number
  temperature: number
  windSpeed: number
  visibility: number
  icon: string
  weatherStatus: string
  weatherDescription: string
}) => {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(!clicked)
  }

  return (
    <>
      {!clicked ? (
        <div
          className='absolute right-2 top-2 cursor-pointer rounded-full bg-black/20 shadow-md shadow-white transition duration-1000 hover:scale-105 hover:shadow-pink-600 hover:duration-200'
          onClick={handleClick}
        >
          <h5 className='bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text p-2 text-3xl font-bold text-transparent drop-shadow-sm '>
            {Math.round(temperature)}°C
          </h5>
        </div>
      ) : (
        <div className='h-1/2 rounded-lg bg-gradient-to-r from-black bg-cover bg-center bg-no-repeat p-6 shadow-lg shadow-white transition duration-1000 hover:scale-105 hover:shadow-pink-600 hover:duration-300'>
          <button
            className='absolute right-2 top-2 flex rounded-full bg-pink-600 p-2 text-white'
            onClick={handleClick}
          ></button>

          <div className='flex items-center'>
            <p className='bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-lg font-extrabold text-transparent drop-shadow-sm'>
              {cityName}
              {/* {currentTime.toLocaleString()} */}
            </p>
          </div>

          <div className='flex flex-col'>
            <div className='flex items-center justify-between'>
              <div className='mt-7'>
                <h5 className='bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-5xl font-bold text-transparent drop-shadow-sm '>
                  {Math.round(temperature)}°C
                  {/* <p className="text-sm pt-4">
                  Feels like {Math.round(main.feels_like)}°C
                </p> */}
                </h5>
              </div>

              <div className='flex flex-col items-center bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-lg font-extrabold text-transparent'>
                <img
                  src={`
            https://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt='icon'
                />
                <h1 className='text-xl font-bold'>{weatherStatus.charAt(0).toUpperCase() + weatherStatus.slice(1)}</h1>
                <p className='text-sm '>{weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}</p>
              </div>
            </div>
          </div>
          <div className='mt-6 flex justify-between bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text font-semibold text-transparent drop-shadow-sm'>
            <span className='flex flex-col items-center justify-evenly p-3'>
              <small className='font-bold'>Wind</small>
              <p className='text-sm'>{windSpeed}km/h</p>
            </span>
            <span className='flex flex-col items-center  justify-evenly  p-3'>
              <small className='font-bold'>Visibility </small>
              <p className='text-sm'>{visibility / 1000}km</p>
            </span>
            <span className='flex flex-col items-center  justify-evenly p-3'>
              <small className='font-bold'>Humidity </small>
              <p className='text-sm'>{humidity}%</p>
            </span>
            <div className='justify-evenly'></div>
          </div>
        </div>
      )}
    </>
  )
}

export default Card
