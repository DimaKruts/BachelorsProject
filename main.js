const config = require('./Configer');
const { getMultiplier, getTemp } = require('./Timer');

// let data = config.read();
// console.log(config.read().Sources);
// data.HTTP.auth = false;
// console.log(data);
// config.write("config.json", data);

// console.log();
// weather(data.Weather.key, data.Weather.id).then(data => console.log(data)).catch(e => console.log(e));

console.log(getTemp());
