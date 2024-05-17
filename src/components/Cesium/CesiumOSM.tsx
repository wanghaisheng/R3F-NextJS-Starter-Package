'use client'
import {
  Cartesian3,
  ScreenSpaceEventHandler,
  Ion,
  Math,
  Terrain,
  Viewer,
  createOsmBuildingsAsync,
  Cesium3DTileStyle,
  ScreenSpaceEventType,
} from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { useEffect } from 'react'
import './css/main.css'
import { color } from 'framer-motion'

export default function CesiumOSM() {
  useEffect(() => {
    const initializeCesiumViewer = async () => {
      // CesiumJS has a default access token built in but it's not meant for active use.
      // Please set your own access token can be found at: https://cesium.com/ion/tokens.
      // Ion.defaultAccessToken = "YOUR TOKEN HERE";

      Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkZGUzY2FhOC00M2ViLTQ2ZmQtYWQ1Yy1kYzNhYzFhZmVkZjIiLCJpZCI6MjAwOTU1LCJpYXQiOjE3MTAyMjkxNDF9.09cBca1kjkwB2lSOjuJMFMjOUV1DWT75cHXqT3zGxIU'

      // const clock = new Clock({
      //   // adjust time so scene is lit by sun
      //   startTime: JulianDate.fromIso8601('2013-12-25'),
      //   currentTime: JulianDate.fromIso8601('2013-12-25'),
      //   stopTime: JulianDate.fromIso8601('2013-12-26'),
      //   clockRange: ClockRange.LOOP_STOP, // loop when we hit the end time
      //   clockStep: ClockStep.SYSTEM_CLOCK_MULTIPLIER,
      //   // multiplier: 40, // how much time to advance each tick
      //   // shouldAnimate: true, // Animation on by default
      // })

      // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
      const viewer = new Viewer('cesiumContainer', {
        terrain: Terrain.fromWorldTerrain(),
      })

      const handler = new ScreenSpaceEventHandler(viewer.scene.canvas)

      // // Add Cesium OSM Buildings, a global 3D buildings layer.
      const osmBuildingsTileset = await createOsmBuildingsAsync()
      viewer.scene.primitives.add(osmBuildingsTileset)

      // Fly the camera to Portland at the given longitude, latitude, and height.
      // viewer.camera.flyTo({
      //   destination: Cartesian3.fromDegrees(-122.6515, 45.5252, 525),
      //   orientation: {
      //     heading: Math.toRadians(0.0),
      //     pitch: Math.toRadians(-15.0),
      //   },
      // })

      // Set the initial camera to look at Seattle
      viewer.scene.camera.setView({
        destination: Cartesian3.fromDegrees(-122.3472, 47.598, 370),
        orientation: {
          heading: Math.toRadians(10),
          pitch: Math.toRadians(-10),
        },
      })

      // Styling functions

      // Color by material checks for null values since not all
      // buildings have the material property.
      function colorByMaterial() {
        osmBuildingsTileset.style = new Cesium3DTileStyle({
          defines: {
            material: "${feature['building:material']}",
          },
          color: {
            conditions: [
              ['${material} === null', "color('white')"],
              ["${material} === 'glass'", "color('skyblue', 0.5)"],
              ["${material} === 'concrete'", "color('grey')"],
              ["${material} === 'brick'", "color('indianred')"],
              ["${material} === 'stone'", "color('lightslategrey')"],
              ["${material} === 'metal'", "color('lightgrey')"],
              ["${material} === 'steel'", "color('lightsteelblue')"],
              ['true', "color('white')"], // This is the else case
            ],
          },
        })
      }

      function highlightAllResidentialBuildings() {
        osmBuildingsTileset.style = new Cesium3DTileStyle({
          color: {
            conditions: [
              [
                "${feature['building']} === 'apartments' || ${feature['building']} === 'residential'",
                "color('cyan', 0.9)",
              ],
              [true, "color('white')"],
            ],
          },
        })
      }

      function showByBuildingType(buildingType) {
        switch (buildingType) {
          case 'office':
            osmBuildingsTileset.style = new Cesium3DTileStyle({
              show: "${feature['building']} === 'office'",
            })
            break
          case 'apartments':
            osmBuildingsTileset.style = new Cesium3DTileStyle({
              show: "${feature['building']} === 'apartments'",
            })
            break
          default:
            break
        }
      }

      // Color the buildings based on their distance from a selected central location
      function colorByDistanceToCoordinate(pickedLatitude, pickedLongitude) {
        osmBuildingsTileset.style = new Cesium3DTileStyle({
          defines: {
            distance: `distance(vec2(\${feature['cesium#longitude']}, \${feature['cesium#latitude']}), vec2(${pickedLongitude},${pickedLatitude}))`,
          },
          color: {
            conditions: [
              ['${distance} > 0.014', "color('blue')"],
              ['${distance} > 0.010', "color('green')"],
              ['${distance} > 0.006', "color('yellow')"],
              ['${distance} > 0.0001', "color('red')"],
              ['true', "color('white')"],
            ],
          },
        })
      }

      // When dropdown option is not "Color By Distance To Selected Location",
      // remove the left click input event for selecting a central location
      function removeCoordinatePickingOnLeftClick() {
        const infoPanel = document.querySelector('.infoPanel') as HTMLElement | null
        if (infoPanel) {
          infoPanel.style.visibility = 'hidden'
        }
        handler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK)
      }

      // Add event listeners to dropdown menu options
      // document.querySelector('.infoPanel').style.visibility = 'hidden'
      // const menu = document.getElementById('dropdown')

      const menu = document.getElementById('dropdown') as HTMLSelectElement

      menu.addEventListener('change', function () {
        switch (menu.value) {
          case 'colorByMaterial':
            removeCoordinatePickingOnLeftClick()
            colorByMaterial()
            break
          case 'colorByDistanceToCoordinate':
            // Default to Space Needle as the central location
            colorByDistanceToCoordinate(47.62051, -122.34931)
            handler.setInputAction(function (movement) {
              viewer.selectedEntity = undefined
              const pickedBuilding = viewer.scene.pick(movement.position)
              if (pickedBuilding) {
                const pickedLatitude = pickedBuilding.getProperty('cesium#latitude')
                const pickedLongitude = pickedBuilding.getProperty('cesium#longitude')
                colorByDistanceToCoordinate(pickedLatitude, pickedLongitude)
              }
            }, ScreenSpaceEventType.LEFT_CLICK)
            break
          case 'highlightAllResidentialBuildings':
            removeCoordinatePickingOnLeftClick()
            highlightAllResidentialBuildings()
            break
          case 'showByBuildingTypeOffice':
            removeCoordinatePickingOnLeftClick()
            showByBuildingType('office')
            break
          case 'showByBuildingTypeApartments':
            removeCoordinatePickingOnLeftClick()
            showByBuildingType('apartments')
            break
          default:
            break
        }
      })

      colorByMaterial() // Default styling
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
      <div className='absolute right-36 top-24 bg-black'>
        <select id='dropdown' className='bg-black'>
          <option value='colorByMaterial'>Color By Material</option>
          <option value='colorByDistanceToCoordinate'>Color By Distance To Selected Location</option>
          <option value='highlightAllResidentialBuildings'>Highlight All Residential Buildings</option>
          <option value='showByBuildingTypeOffice'>Show Office Buildings</option>
          <option value='showByBuildingTypeApartments'>Show Apartment Buildings</option>
        </select>
      </div>
    </>
  )
}
