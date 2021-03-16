const config = require('./Configer');
const { weather } = require('./Weather');
// const mqtt = require('./MQTT');
// const http = require('./HTTP');

// config.read().then((value) => 
// {
//     console.log(value);
// });

// let data = config.read();
// console.log(data);
// data.HTTP.auth = false;
// console.log(data);
// config.write("config.json", data);

//console.log();
weather(1, 2);