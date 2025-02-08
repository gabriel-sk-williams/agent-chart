import React, { useEffect, useRef } from 'react';
import { createChart, AreaSeries } from 'lightweight-charts';
import editedData from '../data/edited.json';
import { getUnixRangeAndInterval } from '../data/time.js';
import { chartOptions, lineStyles } from '../data/settings.js';


const LightweightLocal = () => {
    const chartContainerRef = useRef(null);

    const buns = getUnixRangeAndInterval("1D");
    console.log("buns", buns)

    useEffect(() => {
        // Create the chart instance
        const chart = createChart(chartContainerRef.current);

        chart.applyOptions(chartOptions)

        // Create line series
        const areaSeries = chart.addSeries(AreaSeries, lineStyles);
        areaSeries.setData(editedData.data.items)
        chart.timeScale().fitContent();

        // Cleanup on component unmount
        return () => {
            chart.remove();
        };
    }, []);

  return <div ref={chartContainerRef} />;
};

export default LightweightLocal;