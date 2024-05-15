'use client'
import {
  Cartesian3,
  Ion,
  Viewer,
  JulianDate,
  ClockRange,
  Clock,
  ClockStep,
  ClockViewModel,
  Terrain,
  createOsmBuildingsAsync,
} from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { useEffect } from 'react'
import './css/main.css'

const AirCraftCesium = () => {
  useEffect(() => {
    const initializeCesiumViewer = async () => {
      Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkZGUzY2FhOC00M2ViLTQ2ZmQtYWQ1Yy1kYzNhYzFhZmVkZjIiLCJpZCI6MjAwOTU1LCJpYXQiOjE3MTAyMjkxNDF9.09cBca1kjkwB2lSOjuJMFMjOUV1DWT75cHXqT3zGxIU'

      const clock = new Clock({
        startTime: JulianDate.fromIso8601('2013-12-25'),
        currentTime: JulianDate.fromIso8601('2013-12-25'),
        stopTime: JulianDate.fromIso8601('2013-12-26'),
        clockRange: ClockRange.LOOP_STOP, // loop when we hit the end time
        clockStep: ClockStep.SYSTEM_CLOCK_MULTIPLIER,
        multiplier: 4000, // how much time to advance each tick
        shouldAnimate: true, // Animation on by default
      })

      const viewer = new Viewer('cesiumContainer', {
        // show terrain
        terrain: Terrain.fromWorldTerrain({
          // for day-night effect
          requestWaterMask: true,
          requestVertexNormals: true,
        }),
        clockViewModel: new ClockViewModel(clock), // Shows the clock
        infoBox: false,
        selectionIndicator: false,
        shadows: true,
        shouldAnimate: true,
      })

      viewer.scene.globe.enableLighting = true // for lighting
      viewer.entities.removeAll()
      const scene = viewer.scene
      scene.globe.depthTestAgainstTerrain = true

      if (!scene.sampleHeightSupported) {
        window.alert('This browser does not support sampleHeight.')
      }

      // const osmBuildingsTileset = await createOsmBuildingsAsync();
      // viewer.scene.primitives.add(osmBuildingsTileset);

      const height = 10000

      const position = Cartesian3.fromDegrees(85.28472, 27.688835, height)

      // const url = "aircraft.glb";
      const url = 'aeroplane.glb'

      const entity = (viewer.trackedEntity = viewer.entities.add({
        name: url,
        position: position,
        model: {
          uri: url,
        },
      }))
    }

    initializeCesiumViewer()

    // Cleanup function (optional)
    return () => {
      // Any cleanup code if needed
    }
  }, []) // Empty dependency array to run the effect only once

  return (
    <div id='cesiumContainer' style={{ width: '100%', height: '100vh' }}>
      {/* Cesium Viewer container */}
    </div>
  )
}

export default AirCraftCesium
