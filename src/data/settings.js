import { unixSecond, unixMinute, unixHour, unixDay, unixWeek, unixMonth, unixYear } from './time'

// Create options using 
// https://tradingview.github.io/lightweight-charts/docs/api
export const chartOptions = {
    // LayoutOptions
    layout: {
        background: { type: 'solid', color: 'transparent'},
        textColor: "#60497F",
        // fontFamily: Inter,
        fontSize: 24, // 12 [figma]
        attributionLogo: false,
    },
    // TimeScaleOptions
    timeScale: {
        secondsVisible:false,
        ticksVisible: true, // barely visible
        uniformDistribution: true,
        tickMarkFormatter: customTimeFormatter
    },
    // GridOptions
    grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
    },
    // ChartOptionsBase
    width: 1200,    // 831, [figma]
    height: 600,    // 410, [figma]
    handleScroll: false,
    handleScale: false,
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
}

// custom formatter for Time Scale
function customTimeFormatter(time, tickMarkType, locale) {
    
    var now = Date.now()
    var dayCutoff = now - unixDay;
    var hourCutoff = now - unixHour;

    var today = new Date(now)
    var currentDate = today.getDate();

    var date = new Date(time * 1000);
    console.log("")
    console.log(date)

    var month = date.toLocaleString('default', { month: 'short' });
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();

    // if longer than a day ago, return short date
    if (date < dayCutoff) {
        return `${month} ${day}`;
    }

    // if within the last hour and not on the hour, show hour:minute
    if (date > hourCutoff && minute !== 0) {
        if (hour > 12) {
            return `${hour-12}:${minute}`;
        } else {
            return `${hour}:${minute}`;
        }
    }
    
    // show date at midnight
    if (currentDate == day && hour == 0) {
        return `${month} ${day}`;
    }

    // if between and hour and day ago, show hour and AM/PM
    if (hour > 12) {
        return `${hour-12} PM`
    } else if (hour == 12) {
        return `${hour} PM`
    } else if (hour == 0) {
        return `12 AM`
    }else {
        return `${hour} AM`
    }
}