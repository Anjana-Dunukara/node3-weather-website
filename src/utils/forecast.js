const request = require("request");

const forecast = (latitude, longtitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=fe42a58169837ab002c0615d7698f253&query=" +
    encodeURIComponent(longtitude) +
    "," +
    encodeURIComponent(latitude) +
    "";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather Stack API", undefined);
    } else if (body.error) {
      callback("Unable to find location your seraching");
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is curruntly " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " degrees out. Humidity "+body.current.humidity
      );
    }
  });
};

module.exports = forecast;
