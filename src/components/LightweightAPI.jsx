import React, { useState, useEffect, useRef } from 'react';
import { createChart, AreaSeries } from 'lightweight-charts';
import { getUnixRangeAndInterval } from '../data/time.js';
import { chartOptions, lineStyles } from '../data/settings.js';

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

    const baseUrl = "https://public-api.birdeye.so/defi/history_price?address=";
    const tokenAddress = "5zy77ie2LVoLaMDy2h4SAvPCo3uc8Zno85YGZDZjpump";
    const userInput = "1D";
    const { timeStart, timeEnd, interval } = getUnixRangeAndInterval(userInput)

    const path = `${baseUrl}${tokenAddress}&address_type=token&type=${interval}&time_from=${timeStart}&time_to=${timeEnd}`;

    useEffect(() => {
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

            chart.applyOptions(chartOptions)

            // Create line series
            const areaSeries = chart.addSeries(AreaSeries, lineStyles);
            areaSeries.setData(priceData)
            chart.timeScale().fitContent();

            // Cleanup on component unmount
            return () => {
                chart.remove();
            };
        }
    }, [priceData]);

  return <div ref={chartContainerRef} />;
};

export default LightweightAPI;