import { useState } from 'react'
import LightweightAPI from './components/LightweightAPI.jsx';
import LightweightLocal from './components/LightweightLocal.jsx';
import './styles/layout.css'

function App() {
  return (
    <div className="container">
      <LightweightLocal />
    </div>
  )
}

export default App
