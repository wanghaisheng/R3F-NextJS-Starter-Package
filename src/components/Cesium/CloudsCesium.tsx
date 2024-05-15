'use client'
import {
  Cartesian2,
  Cartesian3,
  Clock,
  ClockRange,
  ClockStep,
  ClockViewModel,
  CloudCollection,
  Ion,
  JulianDate,
  Math,
  Terrain,
  Viewer,
  createOsmBuildingsAsync,
} from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { useEffect } from 'react'
import './css/main.css'

export default function CloudsCesium() {
  useEffect(() => {
    const initializeCesiumViewer = async () => {
      // CesiumJS has a default access token built in but it's not meant for active use.
      // Please set your own access token can be found at: https://cesium.com/ion/tokens.
      // Ion.defaultAccessToken = "YOUR TOKEN HERE";

      Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkZGUzY2FhOC00M2ViLTQ2ZmQtYWQ1Yy1kYzNhYzFhZmVkZjIiLCJpZCI6MjAwOTU1LCJpYXQiOjE3MTAyMjkxNDF9.09cBca1kjkwB2lSOjuJMFMjOUV1DWT75cHXqT3zGxIU'

      const clock = new Clock({
        // adjust time so scene is lit by sun
        startTime: JulianDate.fromIso8601('2013-12-25'),
        currentTime: JulianDate.fromIso8601('2013-12-25'),
        stopTime: JulianDate.fromIso8601('2013-12-26'),
        clockRange: ClockRange.LOOP_STOP, // loop when we hit the end time
        clockStep: ClockStep.SYSTEM_CLOCK_MULTIPLIER,
        multiplier: 400, // how much time to advance each tick
        shouldAnimate: true, // Animation on by default
      })

      // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
      const viewer = new Viewer('cesiumContainer', {
        // // show terrain
        terrain: Terrain.fromWorldTerrain({
          // for day-night effect
          requestWaterMask: true, // required for water effects
          requestVertexNormals: true, // required for terrain lighting
        }),
        clockViewModel: new ClockViewModel(clock), // Shows the clock
        infoBox: false,
        shouldAnimate: true,
      })

      // Enable rendering the sky
      viewer.scene.skyAtmosphere.show = true

      // set lighting to true
      viewer.scene.globe.enableLighting = true

      // for blue sky effect
      viewer.scene.globe.depthTestAgainstTerrain = true

      // // Add Cesium OSM Buildings, a global 3D buildings layer.
      const osmBuildingsTileset = await createOsmBuildingsAsync()
      viewer.scene.primitives.add(osmBuildingsTileset)

      // Create clouds
      Math.setRandomNumberSeed(2.5)
      function getRandomNumberInRange(minValue, maxValue) {
        return minValue + Math.nextRandomNumber() * (maxValue - minValue)
      }

      const clouds = new CloudCollection()

      // manually position clouds in the mountains
      function createBackLayerClouds() {
        clouds.add({
          position: Cartesian3.fromDegrees(-122.6908, 45.496, 300),
          scale: new Cartesian2(1500, 250),
          maximumSize: new Cartesian3(50, 15, 13),
          slice: 0.3,
        })

        clouds.add({
          position: Cartesian3.fromDegrees(-122.72, 45.5, 335),
          scale: new Cartesian2(1500, 300),
          maximumSize: new Cartesian3(50, 12, 15),
          slice: 0.36,
        })

        clouds.add({
          position: Cartesian3.fromDegrees(-122.72, 45.51, 260),
          scale: new Cartesian2(2000, 300),
          maximumSize: new Cartesian3(50, 12, 15),
          slice: 0.49,
        })

        clouds.add({
          position: Cartesian3.fromDegrees(-122.705, 45.52, 250),
          scale: new Cartesian2(230, 110),
          maximumSize: new Cartesian3(13, 13, 13),
          slice: 0.2,
        })

        clouds.add({
          position: Cartesian3.fromDegrees(-122.71, 45.522, 270),
          scale: new Cartesian2(1700, 300),
          maximumSize: new Cartesian3(50, 12, 15),
          slice: 0.6,
        })

        clouds.add({
          position: Cartesian3.fromDegrees(-122.705, 45.525, 250),
          scale: new Cartesian2(230, 110),
          maximumSize: new Cartesian3(15, 13, 15),
          slice: 0.35,
        })

        clouds.add({
          position: Cartesian3.fromDegrees(-122.721, 45.53, 220),
          scale: new Cartesian2(1500, 500),
          maximumSize: new Cartesian3(30, 20, 17),
          slice: 0.45,
        })
      }

      let long, lat, height, scaleX, scaleY, aspectRatio, cloudHeight, depth, slice

      // randomly generate clouds in a certain area
      function createRandomClouds(numClouds, startLong, stopLong, startLat, stopLat, minHeight, maxHeight) {
        const rangeLong = stopLong - startLong
        const rangeLat = stopLat - startLat
        for (let i = 0; i < numClouds; i++) {
          long = startLong + getRandomNumberInRange(0, rangeLong)
          lat = startLat + getRandomNumberInRange(0, rangeLat)
          height = getRandomNumberInRange(minHeight, maxHeight)
          scaleX = getRandomNumberInRange(150, 350)
          scaleY = scaleX / 2.0 - getRandomNumberInRange(0, scaleX / 4.0)
          slice = getRandomNumberInRange(0.3, 0.7)
          depth = getRandomNumberInRange(5, 20)
          aspectRatio = getRandomNumberInRange(1.5, 2.1)
          cloudHeight = getRandomNumberInRange(5, 20)
          clouds.add({
            position: Cartesian3.fromDegrees(long, lat, height),
            scale: new Cartesian2(scaleX, scaleY),
            maximumSize: new Cartesian3(aspectRatio * cloudHeight, cloudHeight, depth),
            slice: slice,
          })
        }
      }

      // manually position clouds in front
      const scratch = new Cartesian3()
      function createFrontLayerClouds() {
        clouds.add({
          position: Cartesian3.fromDegrees(-122.666, 45.5126, 97),
          scale: new Cartesian2(400, 150),
          maximumSize: new Cartesian3(25, 12, 15),
          slice: 0.36,
        })

        clouds.add({
          position: Cartesian3.fromDegrees(-122.6665, 45.5262, 76),
          scale: new Cartesian2(450, 200),
          maximumSize: new Cartesian3(25, 14, 12),
          slice: 0.3,
        })
      }

      createBackLayerClouds()
      createRandomClouds(8, -122.685, -122.67, 45.51, 45.525, 50, 250)
      createFrontLayerClouds()

      viewer.scene.primitives.add(clouds)

      // Fly the camera to Portland at the given longitude, latitude, and height.
      viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(-122.6515, 45.5252, 525),
        orientation: {
          heading: Math.toRadians(0.0),
          pitch: Math.toRadians(-15.0),
        },
      })
    }

    initializeCesiumViewer()

    // Cleanup function (optional)
    return () => {
      // Any cleanup code if needed
    }
  }, []) // Empty dependency array to run the effect only once
  return (
    <>
      <div className='absolute size-96'>
        <p>Loading ...</p>
      </div>
      <div id='cesiumContainer' className='h-screen w-full'>
        {/* Cesium Viewer container */}
      </div>
    </>
  )
}
