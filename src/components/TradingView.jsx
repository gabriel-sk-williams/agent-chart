// TradingViewWidget.jsx
import React, { useEffect, useState, useRef, memo } from 'react';
import '../styles/layout.css'

function TradingViewWidget() {
  const initialized = useRef(false)
  const container = useRef();

  const [data, setData] = useState('');

  const apiKey = import.meta.env.VITE_BIRDEYE_API_KEY

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-chain': 'solana',
      'X-API-KEY': apiKey
    }
  };

  const path = 'https://public-api.birdeye.so/defi/history_price?address=5zy77ie2LVoLaMDy2h4SAvPCo3uc8Zno85YGZDZjpump&address_type=token&type=15m'

  // Fetch markdown content
  useEffect(() => {
    import(/* @vite-ignore */path).then(res => {
      fetch(res.default)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.error(err));
    })  
  }, [path]);

  useEffect(
    () => {
      if (!initialized.current) {
      initialized.current = true
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbols": [
            [
              "Google",
              "GOOGL|1D"
            ]
          ],
          "chartOnly": false,
          "width": "100%",
          "height": "100%",
          "locale": "en",
          "colorTheme": "dark",
          "autosize": true,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "area",
          "maLineColor": "#2962FF",
          "maLineWidth": 1,
          "maLength": 9,
          "headerFontSize": "medium",
          "lineWidth": 2,
          "lineType": 0,
          "dateRanges": [
            "1d|1",
            "1m|30",
            "3m|60",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ]
        }`;
      container.current.appendChild(script);
      }
    }, [data]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      {/*<div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>*/}
    </div>
  );
}

export default memo(TradingViewWidget);