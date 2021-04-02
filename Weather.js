const request = require('request');

module.exports.weather = function (data) 
{
    const {key, id} = data;
    let uri = `https://api.openweathermap.org/data/2.5/weather?id=${id}&exclude=hourly&units=metric&appid=${key}`;

    return new Promise((resolve, reject) => 
    {
        request(uri, function (error, response, body) 
        {
            if(error) reject(error);
            let tmp = JSON.parse(body);
            let temp = tmp.main.temp;
            let pressure = tmp.main.pressure;
            let humidity = tmp.main.humidity;
            let wind = tmp.wind.speed;
            let weather = { temp, pressure, humidity, wind };
            resolve(weather);
        });
    });
}

