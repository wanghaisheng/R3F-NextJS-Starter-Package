'use client'

import { useState, useEffect } from 'react'

export default function GetUserLocation({
  onLocationFound,
}: {
  onLocationFound: (location: [number, number]) => void
}) {
  //ask perms to get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationFound([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          handleLocationError(error)
        },
      )
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  const handleLocationError = (error: any) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('User denied the request for Geolocation.')
        break
      case error.POSITION_UNAVAILABLE:
        alert('Location information is unavailable.')
        break
      case error.TIMEOUT:
        alert('The request to get user location timed out.')
        break
      case error.UNKNOWN_ERROR:
        alert('An unknown error occurred.')
        break
    }
  }

  //without perms via IPAddress get location
  const getLocationViaIP = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      onLocationFound([data.latitude, data.longitude]) // Pass latitude and longitude
      // alert(data.latitude + ', ' + data.longitude + ' ' + data.city + ', ' + data.region + ', ' + data.country_name)
    } catch (error) {
      console.error('Error fetching location via IP:', error)
      alert('Error getting location via IP address.')
    }
  }

  return (
    <div className='flex flex-col gap-y-2'>
      <button onClick={getUserLocation} className='rounded-md bg-white p-2 text-black'>
        Get Location asking perms
      </button>
      <button onClick={getLocationViaIP} className='rounded-md bg-white p-2 text-black'>
        Get Location Via IP
      </button>
    </div>
  )
}
