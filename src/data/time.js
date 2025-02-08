export const unixSecond = (1000)
export const unixMinute = (unixSecond * 60)
export const unixHour = (unixMinute * 60)
export const unixDay = (unixHour * 24)
export const unixWeek = (unixDay * 7)
export const unixMonth = (unixDay * 30)
export const unixYear = (unixDay * 365)

// Birdeye intervals:
// 1m, 3m, 5m, 15m, 30m
// 1H, 2H, 4H, 6H, 8H, 12H
// 1D, 3D, 1W, 1M
export const chartDictionary = {
    "1H": {
        interval: "1m",
        subtrahend: unixHour,
    },
    "1D": {
        interval: "5m",
        subtrahend: unixDay,
    },
    "1W": {
        interval: "30m",
        subtrahend: unixWeek,
    },
    "1M": {
        interval: "2H",
        subtrahend: unixMonth,
    },
    "1Y": {
        interval: "1D",
        subtrahend: unixYear,
    },
}

// inputs: 1H, 1D, 1W, 1M, 1Y
export function getUnixRangeAndInterval(input) {
    var dict = chartDictionary[input];
    var interval = dict.interval;

    var now = Date.now()
    var then = now-dict.subtrahend

    var timeStart = Math.round(then / 1000);
    var timeEnd = Math.round(now / 1000);
    
    return { timeStart, timeEnd, interval }
}

