import React, { useState, useEffect, useRef } from 'react';
import { createChart, AreaSeries } from 'lightweight-charts';
import editedData from '../data/edited.json';

const LightweightLocal = () => {
    const chartContainerRef = useRef(null);

    useEffect(() => {
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
        areaSeries.setData(editedData.data.items)
        // chart.timeScale().fitContent();

        // Cleanup on component unmount
        return () => {
            chart.remove();
        };
    }, []);

  return <div ref={chartContainerRef} />;
};

export default LightweightLocal;