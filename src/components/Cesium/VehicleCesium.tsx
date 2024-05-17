'use client'
import {
  Cartesian3,
  Ion,
  Viewer,
  Transforms,
  HeadingPitchRoll,
  JulianDate,
  ClockRange,
  Clock,
  ClockStep,
  ClockViewModel,
  Terrain,
  createOsmBuildingsAsync,
  Math,
} from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { useEffect } from 'react'
import './css/main.css'

export default function VehicleCesium() {
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
        multiplier: 1, // how much time to advance each tick
        shouldAnimate: true, // Animation on by default
      })

      // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
      const viewer = new Viewer('cesiumContainer', {
        // // show terrain // currently disabled don't know the altitude for the ground to put the human avatar
        terrain: Terrain.fromWorldTerrain({
          // for day-night effect
          requestWaterMask: true, // required for water effects
          requestVertexNormals: true, // required for terrain lighting
        }),

        clockViewModel: new ClockViewModel(clock), // Shows the clock
        infoBox: false,
        selectionIndicator: false,
        shadows: true,
        shouldAnimate: true,
      })

      // // Enable rendering the sky
      // viewer.scene.skyAtmosphere.show = true

      // // set lighting to true
      // viewer.scene.globe.enableLighting = true

      // // for blue sky effect
      // viewer.scene.globe.depthTestAgainstTerrain = true

      viewer.entities.removeAll()

      const position = Cartesian3.fromDegrees(85.28472, 27.688835, 1255.5)
      const heading = (210 * Math.PI) / 180
      const pitch = 0
      const roll = 0
      const hpr = new HeadingPitchRoll(heading, pitch, roll)
      const orientation = Transforms.headingPitchRollQuaternion(position, hpr)

      //Vehicle Modals
      // const url = "mclaren.glb";
      const url = 'honda_twister_300.glb'
      // const url = "carblack.glb";

      const entity = viewer.entities.add({
        name: url,
        position: position,
        orientation: orientation,
        model: {
          uri: url,
          minimumPixelSize: 64, // Ensure the model is always visible regardless of zoom level
          maximumScale: 20000, // Cap the model's scale when zooming in
        },
      })
      viewer.trackedEntity = entity

      // // // Add Cesium OSM Buildings, a global 3D buildings layer.
      // const osmBuildingsTileset = await createOsmBuildingsAsync()
      // viewer.scene.primitives.add(osmBuildingsTileset)

      // Fly the camera
      // viewer.camera.flyTo({
      //   destination: Cartesian3.fromDegrees(85.28472, 27.688835, 1300),
      //   orientation: {
      //     heading: Math.toRadians(0.0),
      //     pitch: Math.toRadians(-15.0),
      //   },
      // })
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
