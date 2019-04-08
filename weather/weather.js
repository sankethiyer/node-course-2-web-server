const API_KEY = 'ed657b20e9e75590ded976a7c1b46d1f';

const request = require('request');

var getWeather = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}?units=si`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('couldnt fetch weather');
        }
    });
}

module.exports.getWeather = getWeather;