const request = require('request');

module.exports.weather = function (key, id) {
    let uri = "https://api.openweathermap.org/data/2.5/weather?id=689558&exclude=hourly&units=metric&appid=5ebcbd31f66ba54d501239131b6c8205";
    //let uri = `https://api.openweathermap.org/data/2.5/weather?id=${id}&exclude=hourly&units=metric&appid=${key}`;

    request(uri, function (error, response, body) 
    {
        let tmp = JSON.parse(body);
        let temp = tmp.main.temp;
        let pressure = tmp.main.pressure;
        let humidity = tmp.main.humidity;
        
        console.log(tmp);
    });
}

//pressure: 1002,
//humidity: 87
