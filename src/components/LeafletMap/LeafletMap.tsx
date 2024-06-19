'use client'

import 'leaflet/dist/leaflet.css'
import { useState, useEffect } from 'react'
import worldGeoJSON from 'geojson-world-map'

import { GeoJsonObject } from 'geojson'

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'

const MapComponent = ({ filteredContinent }: { filteredContinent: string }) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([30, 100]) // Initial map center to asia

  const handleFlyTo = (center: [number, number]) => {
    setMapCenter(center) // Update the map center state
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (filteredContinent === 'NORTH AMERICA') {
        handleFlyTo([47.0902, -115.7129])
      } else if (filteredContinent === 'ASIA') {
        handleFlyTo([30, 100])
      } else if (filteredContinent === 'AFRICA') {
        handleFlyTo([0, 20])
      } else if (filteredContinent === 'SOUTH AMERICA') {
        handleFlyTo([-25.235, -56.9253])
      } else if (filteredContinent === 'EUROPE') {
        handleFlyTo([54.526, 15.2551])
      } else if (filteredContinent === 'AUSTRALIA & OCEANIA') {
        handleFlyTo([-25.2744, 133.7751])
      } else if (filteredContinent === 'ANTARCTICA') {
        handleFlyTo([-62.8628, 135])
      }
    }
  }, [filteredContinent])

  return (
    <div className='z-0 h-screen w-full'>
      {/* Map */}
      <MapContainer
        key={mapCenter[0]}
        center={mapCenter}
        zoom={3}
        className='h-full rounded-lg'
        // scrollWheelZoom={false}
      >
        <GeoJSON
          data={worldGeoJSON as GeoJsonObject} // Cast worldGeoJSON to GeoJsonObject
          style={() => ({
            color: '#4a83ec',
            weight: 0.5,
            fillColor: '#1a1d62',
            fillOpacity: 0,
          })}
        />
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      </MapContainer>
    </div>
  )
}

export default MapComponent
