import { useState } from 'react'
import LightweightAPI from './components/LightweightAPI.jsx';
import LightweightLocal from './components/LightweightLocal.jsx';
import './styles/App.css'
import './styles/index.css'
import './styles/layout.css'

function App() {
  return (
    <div className="container">
      <LightweightAPI />
      {/*<LightweightLocal />*/}
    </div>
  )
}

export default App
