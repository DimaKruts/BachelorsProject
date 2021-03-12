const config = require('./Configer');
const { weather } = require('./Weather')

// config.read().then((value) => 
// {
//     console.log(value);
// });

// let data = config.read();
// console.log(data);
// data.HTTP.auth = false;
// console.log(data);
// config.write("config.json", data);
let res = config.read('./users.json');
res.push({login:"user3", password:"qwer1234"});
config.write('./users.json', res);