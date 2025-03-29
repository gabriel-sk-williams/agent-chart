import { unixSecond, unixMinute, unixHour, unixDay, unixWeek, unixMonth, unixYear } from './time'

// Create options using 
// https://tradingview.github.io/lightweight-charts/docs/api
export const chartOptions = {
    // LayoutOptions
    layout: {
        background: { type: 'solid', color: 'transparent'},
        attributionLogo: false,
    },
    // TimeScaleOptions
    timeScale: {
        visible: false,
    },
    // GridOptions
    grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
    },
    crosshair: {
        mode: 2, // hidden
        vertLine: { visible: false },
        horzLine: { visible: false },
    },
    // ChartOptionsBase
    width: 360,    // 120, [figma]
    height: 267,    // 89, [figma]
    handleScroll: false,
    handleScale: false,
    rightPriceScale: {
        visible: false
    },
    
};

export const lineStyles = {
    // LineStyleOptions
    color: "#00B96D",
    lineWidth: '6',
    lineType: 2, // Curved
    
    // SeriesOptionsCommon
    lastValueVisible: false,
    priceLineVisible: false,
}