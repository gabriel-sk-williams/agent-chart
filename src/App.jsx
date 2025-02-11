import { useState } from 'react'
import LightweightAPI from './components/LightweightAPI.jsx';
import LightweightLocal from './components/LightweightLocal.jsx';
import './styles/layout.css'

function App() {

  const baseUrl = "https://public-api.birdeye.so/defi/history_price?address=";
  const tokenAddress = "5zy77ie2LVoLaMDy2h4SAvPCo3uc8Zno85YGZDZjpump";
  const [ range, setRange ] = useState("1D");

  return (
    <div className="container">
      <div className="right">
        <button onClick={() => setRange("1H")}>1H</button>
        <button onClick={() => setRange("1D")}>1D</button>
        <button onClick={() => setRange("1W")}>1W</button>
        <button onClick={() => setRange("1M")}>1M</button>
        <button onClick={() => setRange("1Y")}>1Y</button>
      </div>
      <LightweightAPI baseUrl={baseUrl} tokenAddress={tokenAddress} range={range}/>
    </div>
  )
}

export default App
