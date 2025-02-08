// Create options using 
// https://tradingview.github.io/lightweight-charts/docs/api
export const chartOptions = {
    // LayoutOptions
    layout: {
        background: { type: 'solid', color: 'transparent'},
        textColor: "#60497F",
        // fontFamily: Inter,
        fontSize: 24,
        attributionLogo: false,
    },
    // TimeScaleOptions
    timeScale: {
        timeVisible: true,
        tickMarkMaxCharacterLength: 5,
        allowBoldLabels: true,
        tickMarkFormatter: customTimeFormatter
    },
    // GridOptions
    grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
    },
    // ChartOptionsBase
    // figma chart size is = { width: 831, height: 410 };
    width: 1200,
    height: 600,
    rightPriceScale: {
        visible: false
    }
};

export const lineStyles = {
    // AreaStyleOptions
    topColor: '#00B96D',
    lineColor: "#00B96D",
    lineWidth: '2',
    lineType: 2,
    
    // SeriesOptionsCommon
    lastValueVisible: false,
    priceLineVisible: false,
    priceFormat: { 
        type: 'price', 
        precision: 5, 
        minMove: 0.0000001 
    },
}

// custom formatter for Time Scale
function customTimeFormatter(time, tickMarkType, locale) {
    // console.log("formatting:", time) // 1735344000
    // console.log(tickMarkType) // 2
    // console.log(locale) // en-US

    var date = new Date(time * 1000);

    var hour = date.getHours();

    if (hour > 12) {
        return `${hour-12} PM`
    } else if (hour < 12) {
        return `${hour} AM`
    } else {
        return "Dec 27"
    }
}