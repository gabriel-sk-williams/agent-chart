import { useState, useEffect } from 'react'
import LightweightAPI from './components/LightweightAPI.jsx';
import LightweightLocal from './components/LightweightLocal.jsx';
import { getUnixRangeAndInterval } from './data/time.js';
import './styles/layout.css'

function App() {

  const [ range, setRange ] = useState("1D");
  const [ priceData, setPriceData ] = useState(false);
  const [ tradeData, setTradeData ] = useState(false);

  const apiKey = import.meta.env.VITE_ALLORA_BIRDEYE_API_KEY;
  const tokenAddress = import.meta.env.VITE_TOKEN_ADDRESS;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-chain': 'solana',
      'X-API-KEY': apiKey
    }
  };

  const { timeStart, timeEnd, interval } = getUnixRangeAndInterval(range)
  
  const baseUrl = "https://public-api.birdeye.so/" 
  const historicalPricePath = `${baseUrl}defi/history_price?address=${tokenAddress}&address_type=token&type=${interval}&time_from=${timeStart}&time_to=${timeEnd}`;
  const tradeDataPath = `${baseUrl}defi/v3/token/trade-data/single?address=${tokenAddress}`

  // fetch trade data
  useEffect(() => {
    fetch(tradeDataPath, options)
      .then(res => res.json())
      .then(json => {
          setTradeData(json)
      })
      .catch(err => console.error(err));
  }, [tokenAddress])

  // fetch historical price
  useEffect(() => {
    fetch(historicalPricePath, options)
      .then(res => res.json())
      .then(json => {
          const prices = json.data.items.map(item => ({
              time: item.unixTime,
              value: item.value,
          }));
          setPriceData(prices)

          
          const display = json.data.items.map(item => ({
            time: new Date(item.unixTime * 1000),
            value: item.value,
          }));
          console.log(display)
          
      })
      .catch(err => console.error(err));
  }, [range]);

  return (
    <div className="container">
      <div className="right">
        <button onClick={() => setRange("1H")}>1H</button>
        <button onClick={() => setRange("1D")}>1D</button>
        <button onClick={() => setRange("1W")}>1W</button>
        <button onClick={() => setRange("1M")}>1M</button>
        <button onClick={() => setRange("1Y")}>1Y</button>
      </div>
      <LightweightAPI priceData={priceData} />
    </div>
  )
}

export default App
