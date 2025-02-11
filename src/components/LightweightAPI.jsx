import React, { useState, useEffect, useRef } from 'react';
import { createChart, AreaSeries } from 'lightweight-charts';
import { getUnixRangeAndInterval } from '../data/time.js';
import { chartOptions, lineStyles } from '../data/settings.js';

const LightweightAPI = ({baseUrl, tokenAddress, range}) => {
    const chartContainerRef = useRef(null);
    const [ priceData, setPriceData ] = useState(false)

    const apiKey = import.meta.env.VITE_ALLORA_BIRDEYE_API_KEY
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-chain': 'solana',
            'X-API-KEY': apiKey
        }
    };

    const { timeStart, timeEnd, interval } = getUnixRangeAndInterval(range)
    console.log(interval)

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

                const look = json.data.items.map(item => ({
                    time: new Date(item.unixTime * 1000),
                    value: item.value,
                }));
                console.log(look.length)
                console.log(look)
            })
            .catch(err => console.error(err));
    }, [range]);
    
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