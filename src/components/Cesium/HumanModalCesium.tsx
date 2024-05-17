'use client'
import { Cartesian3, Ion, Viewer, Color, Clock } from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { useEffect } from 'react'
import './css/main.css'

export default function HumanModalCesium() {
  useEffect(() => {
    const initializeCesiumViewer = async () => {
      // CesiumJS has a default access token built in but it's not meant for active use.
      // Please set your own access token can be found at: https://cesium.com/ion/tokens.
      // Ion.defaultAccessToken = "YOUR TOKEN HERE";

      Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkZGUzY2FhOC00M2ViLTQ2ZmQtYWQ1Yy1kYzNhYzFhZmVkZjIiLCJpZCI6MjAwOTU1LCJpYXQiOjE3MTAyMjkxNDF9.09cBca1kjkwB2lSOjuJMFMjOUV1DWT75cHXqT3zGxIU'

      const clock = new Clock({
        // // adjust time so scene is lit by sun
        // startTime: JulianDate.fromIso8601('2013-12-25'),
        // currentTime: JulianDate.fromIso8601('2013-12-25'),
        // stopTime: JulianDate.fromIso8601('2013-12-26'),
        // clockRange: ClockRange.LOOP_STOP, // loop when we hit the end time
        // clockStep: ClockStep.SYSTEM_CLOCK_MULTIPLIER,
        // multiplier: 400, // how much time to advance each tick
        // shouldAnimate: true, // Animation on by default
      })

      // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
      const viewer = new Viewer('cesiumContainer', {
        // show terrain // currently disabled don't know the altitude for the ground to put the human avatar
        // terrain: Terrain.fromWorldTerrain({
        //   // for day-night effect
        //   requestWaterMask: true, // required for water effects
        //   requestVertexNormals: true, // required for terrain lighting
        // }),
        // clockViewModel: new ClockViewModel(clock), // Shows the clock
        // infoBox: false,
        // selectionIndicator: false,
        // shadows: true,
        // shouldAnimate: true,
      })

      // Enable rendering the sky
      // viewer.scene.skyAtmosphere.show = true

      // // set lighting to true
      // viewer.scene.globe.enableLighting = true

      // // for blue sky effect
      // viewer.scene.globe.depthTestAgainstTerrain = true

      viewer.entities.removeAll()

      // const position = Cartesian3.fromDegrees(85.28472, 27.688835, 1255.5)
      const position = Cartesian3.fromDegrees(85.283948, 27.689929)
      const position2 = Cartesian3.fromDegrees(85.284047, 27.689821)
      // const heading = (210 * Math.PI) / 180
      // const pitch = 0
      // const roll = 0
      // const hpr = new HeadingPitchRoll(heading, pitch, roll)
      // const orientation = Transforms.headingPitchRollQuaternion(position, hpr)

      const url = 'https://models.readyplayer.me/66038d9e2aa392635c277ea9.glb' // avatar model
      const url2 = 'female-animation-catwalk.glb' // avatar model

      const entity = viewer.entities.add({
        name: url,
        position: position,
        // orientation: orientation,
        model: {
          uri: url,
        },
      })
      const entity2 = viewer.entities.add({
        name: url2,
        position: position2,
        // orientation: orientation,
        model: {
          uri: url2,
        },
      })

      viewer.trackedEntity = entity
      // viewer.trackedEntity = entity2

      const greenCircle = viewer.entities.add({
        position: Cartesian3.fromDegrees(85.283948, 27.689929),
        name: 'Green circle at height with outline',
        ellipse: {
          semiMinorAxis: 300.0,
          semiMajorAxis: 300.0,
          height: 0.0,
          material: Color.GREEN.withAlpha(0.5),
          outline: true, // height must be set for outline to display
        },
      })

      // viewer.zoomTo(viewer.entities)
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
