/*jshint esversion: 6 */
const request = require("request");

const darkSky = (lat, long, callback) => {
  const apiKey = "cb3bd684c5147594a33daa61c14c185b";
  const url = `https://api.darksky.net/forecast/${apiKey}/${long},${lat}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Couldn't reach service.", undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      const dataCurrent = body.currently;
      const dataDaily =  body.daily.data[0];
      const weatherData = {
        dataDaily: dataDaily.summary,
        dailyHigh: dataDaily.temperatureHigh,
        dailyLow: dataDaily.temperatureLow,
        currentTemp: dataCurrent.temperature,
        percipitation: dataCurrent.precipProbability
      };

      callback(undefined, weatherData);
    }
  });
};
module.exports = darkSky;
