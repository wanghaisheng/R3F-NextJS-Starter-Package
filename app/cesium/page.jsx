import CesiumMap from '@/components/LeafletMap/CesiumMap'

const Cesium = () => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <CesiumMap />
      </div>
    </div>
  )
}

export default Cesium
