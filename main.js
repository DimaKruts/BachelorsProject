const config = require('./Configer');

// config.read().then((value) => 
// {
//     console.log(value);
// });

let data = config.read();
console.log(data);
// data.HTTP.auth = false;
// console.log(data);
// config.write("config.json", data);