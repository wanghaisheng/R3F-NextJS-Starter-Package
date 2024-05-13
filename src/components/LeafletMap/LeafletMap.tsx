import 'leaflet/dist/leaflet.css'
import { LatLngBoundsExpression } from 'leaflet'
import Image from 'next/image'
import L from 'leaflet'

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'

import { FaMapMarker } from 'react-icons/fa'

import { renderToString } from 'react-dom/server' // Import the renderToString function from react-dom/server
export default function MapComponent() {
  const mapBounds: LatLngBoundsExpression = [
    [51.49, -0.08],
    [51.5, -0.06],
  ]

  const customIcon = L.divIcon({
    html: renderToString(<FaMapMarker color='red' size={24} />), // Render the React Icon component to HTML using renderToString
    iconSize: [24, 24], // Set the icon size
    className: 'leaflet-div-icon', // Set the class name for styling (required)
  })

  const onCountryClick = (event) => {
    // You can handle the click event here
    console.log(event.target.feature.properties.name)
  }

  return (
    <div className='h-[500px] w-full'>
      {/* <MapContainer center={[51.505, -0.09]} zoom={5} className='h-full'>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <ImageOverlay url='/card/abstract4.webp' bounds={mapBounds} />
        <Marker position={[51.505, -0.09]} icon={customIcon}>
          <Popup>
            <div>
              <h2>Popup Title</h2>
              <p>A description of the popup.</p>
              <Image src='/card/abstract2.webp' alt='Image Alt Text' height={200} width={300} />
            </div>
          </Popup>
        </Marker>
      </MapContainer> */}

      {/* Africa Map */}
      <MapContainer center={[0, 20]} zoom={3} className='h-full'>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      </MapContainer>

      {/* Asia Map */}
      <MapContainer center={[30, 100]} zoom={3} className='h-full'>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      </MapContainer>
    </div>
  )
}
