import React, { useEffect, useRef } from 'react';
import { createChart, AreaSeries } from 'lightweight-charts';
import editedData from '../data/edited.json';
import { getUnixRangeAndInterval } from '../data/time.js';
import { chartOptions, lineStyles } from '../data/settings.js';


const LightweightLocal = ({range}) => {
    const chartContainerRef = useRef(null);

    const { timeStart, timeEnd, interval } = getUnixRangeAndInterval(range);
    var then = new Date(timeStart * 1000);
    var now = new Date(timeEnd * 1000);

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