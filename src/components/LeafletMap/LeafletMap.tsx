import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const LeafletMap = ({
  provinceData,
  province_1,
  province_2,
  province_3,
  province_4,
  province_5,
  province_6,
  province_7,
}) => {
  const mapRef = useRef(null)

  useEffect(() => {
    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
      touchZoom: false,
      doubleClickZoom: false,
      zoomControl: true,
      dragging: true,
    }).setView([28.3949, 84.124], 8)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    const provinceGeoJson = L.geoJson(provinceData, {
      style: style,
      onEachFeature: onEachFeature,
    }).addTo(map)

    const bound = provinceGeoJson.getBounds()
    map.fitBounds(bound)

    function style(feature) {
      return {
        weight: 2,
        opacity: 1,
        color: '#FFF',
        dashArray: '1',
        fillOpacity: 0.7,
        fillColor: getProvinceColor(feature.properties.Province),
      }
    }

    function getProvinceColor(province) {
      switch (province) {
        case 1:
          return 'red'
        case 2:
          return 'green'
        case 3:
          return 'blue'
        case 4:
          return 'lightblue'
        case 5:
          return 'lightgreen'
        case 6:
          return 'yellow'
        case 7:
          return 'orange'
        default:
          return 'skyblue'
      }
    }

    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToProvince,
      })
    }

    function highlightFeature(e) {
      const layer = e.target

      layer.setStyle({
        weight: 2,
        color: 'black',
        dashArray: '',
        fillOpacity: 0.7,
        fillColor: '#fff',
      })

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront()
      }
    }

    function resetHighlight(e) {
      provinceGeoJson.resetStyle(e.target)
    }

    function zoomToProvince(e) {
      const province_number = e.target.feature.properties.Province

      map.fitBounds(e.target.getBounds())

      const json = eval(`province_${province_number}`)

      if (json) {
        const stateGeoJson = L.geoJson(json, {
          style: style,
          onEachFeature: onEachFeature,
        }).addTo(map)

        stateGeoJson.eachLayer(function (layer) {
          layer
            .bindTooltip(layer.feature.properties.DISTRICT, {
              permanent: true,
              direction: 'center',
            })
            .openTooltip()
        })
      }
    }
  }, [])

  return <div ref={mapRef} className='h-screen w-full' />
}

export default LeafletMap
