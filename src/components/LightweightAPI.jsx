import React, { useState, useEffect, useRef } from 'react';
import { createChart, AreaSeries } from 'lightweight-charts';
import { chartOptions, lineStyles } from '../data/settings_graph.js';

const LightweightAPI = ({priceData}) => {
    const chartContainerRef = useRef(null);

    useEffect(() => {
        if (priceData) {

            // Create the chart instance
            const chart = createChart(chartContainerRef.current);

            chart.applyOptions(chartOptions)

            // Create line series
            const areaSeries = chart.addSeries(AreaSeries, lineStyles);
            areaSeries.setData(priceData)
            
            chart.timeScale().fitContent();

            // troubleshooting:
            const vr = chart.timeScale().getVisibleLogicalRange();
            console.log("vlrange", vr);
            const width = chart.timeScale().width();
            console.log(`ts width ${width}`);
            const barSpacing = width / (vr.to - vr.from);
            console.log(`bar spacing is ${barSpacing}`);

            // Cleanup on component unmount
            return () => {
                chart.remove();
            };
        }
    }, [priceData]);

  return <div ref={chartContainerRef} />;
};

export default LightweightAPI;