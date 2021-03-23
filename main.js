const config = require('./Configer');
const { getTemp, AddTemp } = require('./Timer');
// const mqtt = require('./MQTT');
// const http = require('./HTTP');

// config.read().then((value) => 
// {
//     console.log(value);
// });

// let data = config.read();
// console.log(config.read().Sources);
// data.HTTP.auth = false;
// console.log(data);
// config.write("config.json", data);

// console.log();
// weather(data.Weather.key, data.Weather.id).then(data => console.log(data)).catch(e => console.log(e));

AddTemp({time:1260, hour:21, minute:0, temp:23})

