/*jshint esversion: 6 */
const request = require("request");

const darkSky = (lat, long, callback) => {
  const apiKey = "cb3bd684c5147594a33daa61c14c185b";
  const url = `https://api.darksky.net/forecast/${apiKey}/${long},${lat}?units=si&lang=de`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Couldn't reach service.", undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      const dataCurrent = body.currently;
      const dataDaily = body.daily.data[0].summary;
      callback(
        undefined,
        ` ${dataDaily} Es ist ${dataCurrent.temperature} grad, mit eine ${
          dataCurrent.precipProbability
        } prozent Niederschlagswarscheinlichkeit.`
      );
    }
  });
};
module.exports = darkSky;
