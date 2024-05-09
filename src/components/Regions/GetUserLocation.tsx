export default function GetUserLocation() {
  //ask perms to get user location
  const getUserLocation = () => {
    {
      navigator.geolocation
        ? navigator.geolocation.getCurrentPosition(showPosition, showError)
        : alert('Geolocation is not supported by this browser.')
    }
  }

  const showPosition = (position: any) => {
    alert(position.coords.latitude + ', ' + position.coords.longitude) // Concatenate latitude and longitude into a single string
  }

  const showError = (error: any) => {
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
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    alert(data.latitude + ', ' + data.longitude + ' ' + data.city + ', ' + data.region + ', ' + data.country_name)
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
