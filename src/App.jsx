import { useState, useEffect } from 'react'
import LightweightAPI from './components/LightweightAPI.jsx';
// import LightweightLocal from './components/LightweightLocal.jsx';
import PreviewGraph from './components/PreviewGraph.jsx';
import { getUnixRangeAndInterval, getPreviewInterval } from './data/time.js';
import './styles/layout.css'

function App() {

  const [ range, setRange ] = useState("1D");
  const [ priceData, setPriceData ] = useState(false);
  const [ tradeData, setTradeData ] = useState(false);
  const [ previewRange, setPreviewRange ] = useState("1W");
  const [ previewData, setPreviewData ] = useState(false);

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

  const { timeStart, timeEnd, interval } = getUnixRangeAndInterval(range);
  const { prevStart, prevEnd, prevInterval } = getPreviewInterval(previewRange);
  console.log(prevStart, prevEnd, prevInterval);
  
  const baseUrl = "https://public-api.birdeye.so/" 
  const historicalPricePath = `${baseUrl}defi/history_price?address=${tokenAddress}&address_type=token&type=${interval}&time_from=${timeStart}&time_to=${timeEnd}`;
  const previewPricePath = `${baseUrl}defi/history_price?address=${tokenAddress}&address_type=token&type=${prevInterval}&time_from=${prevStart}&time_to=${prevEnd}`;
  const tradeDataPath = `${baseUrl}defi/v3/token/trade-data/single?address=${tokenAddress}`

  useEffect(() => {
    fetch(previewPricePath, options)
      .then(res => res.json())
      .then(json => {
          const prices = json.data.items.map(item => ({
              time: item.unixTime,
              value: item.value,
          }));
          setPreviewData(prices) 
      })
      .catch(err => console.error(err));
  }, [previewRange])

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
          console.log("display", display)
          
      })
      .catch(err => console.error(err));
  }, [range]);

  return (
    <div className="container">
      {/*
      <div className="right">
        <button onClick={() => setRange("1H")}>1H</button>
        <button onClick={() => setRange("1D")}>1D</button>
        <button onClick={() => setRange("1W")}>1W</button>
        <button onClick={() => setRange("1M")}>1M</button>
        <button onClick={() => setRange("1Y")}>1Y</button>
      </div>
        <LightweightAPI priceData={priceData} />
      */}
      <div style={{marginLeft: '20rem'}}>
        <div className="flex-column">
          <PreviewGraph previewData={previewData} />
          <PreviewGraph previewData={previewData} />
          <PreviewGraph previewData={previewData} />
        </div>
      </div>
    </div>
  )
}

export default App
