import './App.css'
import { MapContainer, TileLayer } from 'react-leaflet'

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  )
}

export default App
