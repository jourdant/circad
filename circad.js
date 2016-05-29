var suncalc = require('suncalc');

var lat = -37.781152;
var lon = 175.220182;


const nowDate = new Date();
const now = nowDate.getTime();

var sunDates = suncalc.getTimes(nowDate, lat, lon);

var times = {
    sunrise: sunDates.sunrise.getTime(),
    sunriseEnd: sunDates.sunriseEnd.getTime(),
    sunsetStart: sunDates.sunsetStart.getTime(),
    sunset: sunDates.sunset.getTime(),
};

var lightRatio;
var nextUpdate;

if (now > times.sunrise && now < times.sunriseEnd) {
    lightRatio =
        (now - times.sunrise) /
        (times.sunriseEnd - times.sunrise);
    nextUpdate = now + UPDATE_FREQUENCY;
    } else if (
        now > times.sunriseEnd &&
        now < times.sunsetStart
    ) {
        lightRatio = 1;
        nextUpdate = times.sunsetStart;
    } else if (now > times.sunsetStart && now < times.sunset) {
        lightRatio =
            (times.sunset - now) /
            (times.sunset - times.sunsetStart);
        nextUpdate = now + UPDATE_FREQUENCY;
    } else {
        lightRatio = 0;
        nextUpdate = times.sunrise;
}

// Range (in lux) from 0.0001 to 100000 in increments of 0.0001.
const lightLevel = Math.round(1 + lightRatio * 999999999) / 10000;

console.log(lightLevel);