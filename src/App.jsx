import { useState } from 'react'
import TradingViewAdvanced from './components/TradingViewAdvanced.jsx';
import LightweightAPI from './components/LightweightAPI.jsx';
import LightweightLocal from './components/LightweightLocal.jsx';
import './styles/App.css'
import './styles/index.css'
import './styles/layout.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="container">
      {/*<LightweightAPI />*/}
      <LightweightLocal />
    </div>
  )
}

export default App
