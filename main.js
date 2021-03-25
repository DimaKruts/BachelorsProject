const config = require('./Configer');
const {NextMultiplier, getMultiplier} = require('./Timer');

console.log("Currnt", getMultiplier());
console.log("Netx", NextMultiplier());

// let data = config.read();
// console.log(config.read().Sources);
// data.HTTP.auth = false;
// console.log(data);
// config.write("config.json", data);

// console.log();
// weather(data.Weather.key, data.Weather.id).then(data => console.log(data)).catch(e => console.log(e));
// curl -H "Content-Type: application/json" -d '{"tariff": 1.7}' 127.0.1:3000/api/tariff
