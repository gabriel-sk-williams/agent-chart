import React, { useState, useEffect, useRef } from 'react';
import { createChart, AreaSeries } from 'lightweight-charts';

const LightweightAPI = () => {
    const chartContainerRef = useRef(null);
    const [ priceData, setPriceData ] = useState(false)

    const apiKey = import.meta.env.VITE_BIRDEYE_API_KEY
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        'x-chain': 'solana',
        'X-API-KEY': apiKey
        }
    };

    const baseUrl = "https://public-api.birdeye.so/defi/history_price?address="
    const tokenAddress = "5zy77ie2LVoLaMDy2h4SAvPCo3uc8Zno85YGZDZjpump"
    const timeStart = "1737813370"
    const timeEnd = "1738817626"
    const path = `${baseUrl}${tokenAddress}&address_type=token&type=1H&time_from=${timeStart}&time_to=${timeEnd}`;

    
    useEffect(() => {
        // const chartSize = {width: 831, height: 410 };
        console.log(apiKey)
        fetch(path, options)
            .then(res => res.json())
            .then(json => {
                const prices = json.data.items.map(item => ({
                    time: item.unixTime,
                    value: item.value,
                }));
                setPriceData(prices)
            })
            .catch(err => console.error(err));
    }, [apiKey]);
    

    useEffect(() => {
        if (priceData) {

            // Create the chart instance
            const chart = createChart(chartContainerRef.current);

            // Create options using https://tradingview.github.io/lightweight-charts/docs/api
            const chartOptions = {
                layout: {
                    background: { type: 'solid', color: 'transparent'},
                    textColor: "#60497F",
                    // fontFamily: Inter,
                    fontSize: 24,
                    attributionLogo: false,
                },
                timeScale: {
                    timeVisible: true,
                    tickMarkMaxCharacterLength: 5
                },
                grid: {
                    vertLines: { visible: false },
                    horzLines: { visible: false },
                },
                width: 1200,
                height: 600,
            };

            chart.applyOptions(chartOptions)

            const lineStyles = {
                color: '#00B96D',
                lineWidth: '2',
                lineType: 2
            }

            // Create line series
            const areaSeries = chart.addSeries(AreaSeries, lineStyles);
            areaSeries.setData(priceData)
            // chart.timeScale().fitContent();

            // Cleanup on component unmount
            return () => {
                chart.remove();
            };
        }
    }, [priceData]);

  return <div ref={chartContainerRef} />;
};

export default LightweightAPI;