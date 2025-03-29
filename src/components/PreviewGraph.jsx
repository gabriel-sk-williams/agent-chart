import React, { useState, useEffect, useRef } from 'react';
import { createChart, AreaSeries, LineSeries } from 'lightweight-charts';
import { chartOptions, lineStyles } from '../data/settings_preview.js';

const PreviewGraph = ({ previewData }) => {
    const chartContainerRef = useRef(null);

    useEffect(() => {
        if (previewData) {

            // Create the chart instance
            const chart = createChart(chartContainerRef.current);

            chart.applyOptions(chartOptions)

            // Create line series
            const areaSeries = chart.addSeries(LineSeries, lineStyles);
            areaSeries.setData(previewData)
            
            chart.timeScale().fitContent();

            // Cleanup on component unmount
            return () => {
                chart.remove();
            };
        }
    }, [previewData]);

  return <div ref={chartContainerRef} />;
};

export default PreviewGraph;