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
      //const dataDaily = body.daily.data[0].summary;
      const weatherData = {
        
        dataDaily: body.daily.data[0].summary,
        dailyHigh: body.daily.data[0].temperatureHigh,
        dailyLow: body.daily.data[0].temperatureLow,
        currentTemp: dataCurrent.temperature,
        percipitation: dataCurrent.precipProbability
      };

      callback(
        undefined,
         weatherData
      );
    }
  });
};
module.exports = darkSky;
