'use client'
import { Ion, Viewer, CesiumWidget, Cartesian3 } from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { useEffect, useRef } from 'react'

import './css/main.css'

const CesiumMap = ({ filteredContinent }: { filteredContinent: string }) => {
  const cesiumRef = useRef<CesiumWidget | null>(null)

  const cameraZoom: number = 9500000

  useEffect(() => {
    const initializeCesiumViewer = async () => {
      // Check if the CesiumWidget has already been initialized
      if (!cesiumRef.current) {
        // CesiumJS has a default access token built in but it's not meant for active use.
        // Please set your own access token can be found at: https://cesium.com/ion/tokens.
        Ion.defaultAccessToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkZGUzY2FhOC00M2ViLTQ2ZmQtYWQ1Yy1kYzNhYzFhZmVkZjIiLCJpZCI6MjAwOTU1LCJpYXQiOjE3MTAyMjkxNDF9.09cBca1kjkwB2lSOjuJMFMjOUV1DWT75cHXqT3zGxIU'

        // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
        cesiumRef.current = new CesiumWidget('cesiumContainer')
      }

      if (cesiumRef.current && filteredContinent === 'NORTH AMERICA') {
        const northAmericaBoundingBox = {
          west: -169.5,
          east: -34.6,
          north: 83.1,
          south: 7.2,
        }

        // Destructure values for brevity
        const { west, east, north, south } = northAmericaBoundingBox

        const diagonalDistance = Cartesian3.distance(
          Cartesian3.fromDegrees(west, north),
          Cartesian3.fromDegrees(east, south),
        )

        // Add a margin to ensure the entire continent is visible
        const margin = cameraZoom // Adjust this as needed
        const altitude = diagonalDistance + margin

        const centerLongitude = (west + east) / 2
        const centerLatitude = (south + north) / 2

        cesiumRef.current.camera.flyTo({
          destination: Cartesian3.fromDegrees(centerLongitude, centerLatitude, altitude),
        })
      } else if (cesiumRef.current && filteredContinent === 'SOUTH AMERICA') {
        const southAmericaBoundingBox = {
          west: -85.1, // Westernmost point (Ecuador)
          east: -34.9, // Easternmost point (Brazil)
          north: 13.4, // Northernmost point (Venezuela)
          south: -55.9, // Southernmost point (Chile)
        }

        // Destructure values for brevity
        const { west, east, north, south } = southAmericaBoundingBox

        const diagonalDistance = Cartesian3.distance(
          Cartesian3.fromDegrees(west, north),
          Cartesian3.fromDegrees(east, south),
        )

        // Add a margin to ensure the entire continent is visible
        const margin = cameraZoom // Adjust this as needed
        const altitude = diagonalDistance + margin

        const centerLongitude = (west + east) / 2
        const centerLatitude = (south + north) / 2

        cesiumRef.current.camera.flyTo({
          destination: Cartesian3.fromDegrees(centerLongitude, centerLatitude, altitude),
        })
      } else if (cesiumRef.current && filteredContinent === 'EUROPE') {
        const europeBoundingBox = {
          west: -25.0,
          east: 45.0,
          north: 70.0,
          south: 35.0,
        }

        // Destructure values for brevity
        const { west, east, north, south } = europeBoundingBox

        const diagonalDistance = Cartesian3.distance(
          Cartesian3.fromDegrees(west, north),
          Cartesian3.fromDegrees(east, south),
        )

        // Add a margin to ensure the entire continent is visible
        const margin = cameraZoom // Adjust this as needed
        const altitude = diagonalDistance + margin

        const centerLongitude = (west + east) / 2
        const centerLatitude = (south + north) / 2

        cesiumRef.current.camera.flyTo({
          destination: Cartesian3.fromDegrees(centerLongitude, centerLatitude, altitude),
        })
      } else if (cesiumRef.current && filteredContinent === 'AFRICA') {
        const africaBoundingBox = {
          west: -24.0,
          east: 60.0,
          north: 37.0,
          south: -36.0,
        }

        // Destructure values for brevity
        const { west, east, north, south } = africaBoundingBox

        const diagonalDistance = Cartesian3.distance(
          Cartesian3.fromDegrees(west, north),
          Cartesian3.fromDegrees(east, south),
        )

        // Add a margin to ensure the entire continent is visible
        const margin = cameraZoom // Adjust this as needed
        const altitude = diagonalDistance + margin

        const centerLongitude = (west + east) / 2
        const centerLatitude = (south + north) / 2

        cesiumRef.current.camera.flyTo({
          destination: Cartesian3.fromDegrees(centerLongitude, centerLatitude, altitude),
        })
      } else if (cesiumRef.current && filteredContinent === 'ASIA') {
        const asiaBoundingBox = {
          west: 25.0,
          east: 180.0,
          north: 80.0,
          south: -10.0,
        }

        // Destructure values for brevity
        const { west, east, north, south } = asiaBoundingBox

        const diagonalDistance = Cartesian3.distance(
          Cartesian3.fromDegrees(west, north),
          Cartesian3.fromDegrees(east, south),
        )

        // Add a margin to ensure the entire continent is visible
        const margin = cameraZoom // Adjust this as needed
        const altitude = diagonalDistance + margin

        const centerLongitude = (west + east) / 2
        const centerLatitude = (south + north) / 2

        cesiumRef.current.camera.flyTo({
          destination: Cartesian3.fromDegrees(centerLongitude, centerLatitude, altitude),
        })
      } else if (cesiumRef.current && filteredContinent === 'AUSTRALIA & OCEANIA') {
        const australiaOceaniaBoundingBox = {
          west: 110.0,
          east: 180.0,
          north: 0.0,
          south: -55.0,
        }

        // Destructure values for brevity
        const { west, east, north, south } = australiaOceaniaBoundingBox

        const diagonalDistance = Cartesian3.distance(
          Cartesian3.fromDegrees(west, north),
          Cartesian3.fromDegrees(east, south),
        )

        // Add a margin to ensure the entire continent is visible
        const margin = cameraZoom // Adjust this as needed
        const altitude = diagonalDistance + margin

        const centerLongitude = (west + east) / 2
        const centerLatitude = (south + north) / 2

        cesiumRef.current.camera.flyTo({
          destination: Cartesian3.fromDegrees(centerLongitude, centerLatitude, altitude),
        })
      } else if (cesiumRef.current && filteredContinent === 'ANTARCTICA') {
        const antarcticaBoundingBox = {
          west: -180.0,
          east: 180.0,
          north: -60.0,
          south: -90.0,
        }

        // Destructure values for brevity
        const { west, east, north, south } = antarcticaBoundingBox

        const diagonalDistance = Cartesian3.distance(
          Cartesian3.fromDegrees(west, north),
          Cartesian3.fromDegrees(east, south),
        )

        // Add a margin to ensure the entire continent is visible
        const margin = cameraZoom // Adjust this as needed
        const altitude = diagonalDistance + margin

        const centerLongitude = (west + east) / 2
        const centerLatitude = (south + north) / 2

        cesiumRef.current.camera.flyTo({
          destination: Cartesian3.fromDegrees(centerLongitude, centerLatitude, altitude),
        })
      }
    }

    initializeCesiumViewer()

    // Cleanup function (optional)
    return () => {
      // Any cleanup code if needed
    }
  }, [filteredContinent]) // Empty dependency array to run the effect only once

  return (
    <div id='cesiumContainer' className='h-screen w-full'>
      {/* Cesium Viewer container */}
    </div>
  )
}

export default CesiumMap
