import { useState } from 'react'
import TradingViewAdvanced from './components/TradingViewAdvanced.jsx';
import LightweightChart from './components/LightweightChart.jsx';
import './styles/App.css'
import './styles/index.css'
import './styles/layout.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="container">
      <LightweightChart />
      {/*
        <div className="view-container">
        <TradingViewAdvanced />
      </div>
      */}
    </div>
  )
}

export default App
