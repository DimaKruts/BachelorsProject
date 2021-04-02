const config = require('./Configer');
//time = hour * 60 + minute
module.exports.getMultiplier = function()
{
    let time = new Date;
    let hour = time.getHours();
    let minute = time.getMinutes();
    let t = hour * 60 + minute;
    const list = config.read('time.json').multiplier;
    let ind = list.findIndex(element => element.time >= t);
    return (ind > 1)?list[ind - 1].multiplier:list[0].multiplier;
};
module.exports.Multiplier = function()
{
    return config.read('time.json').multiplier;
};
module.exports.NextMultiplier = function()
{
    let time = new Date;
    let hour = time.getHours();
    let minute = time.getMinutes();
    let t = hour * 60 + minute;
    const list = config.read('time.json').multiplier;
    if(t > list[list.length - 1].time) return list[0];
    let ind = list.findIndex(element => element.time >= t);
    return list[ind];
};
module.exports.RemoveMultiplier = function(mult)
{
    let list = config.read('time.json');
    list.multiplier = list.multiplier.filter(item => item.time  !== value.time );
    config.write('time.json', list);
};
module.exports.setMultiplier = function (newArray) 
{
    let list = config.read('time.json');
    list.multiplier = newArray;
    config.write('time.json', list);
};
module.exports.AddMultiplier = function(mult)
{
    let list = config.read('time.json');
    list.multiplier.push(mult);
    list.multiplier.sort((a, b) => a.time - b.time);
    config.write('time.json', list);
};
module.exports.getTemp = function()
{
    let time = new Date;
    let hour = time.getHours();
    let minute = time.getMinutes();
    let t = hour * 60 + minute;
    const list = config.read('time.json').temp;
    let ind = list.findIndex(element => element.time >= t);
    return (ind > 1)?list[ind - 1].temp:list[0].temp;
};
module.exports.Temp = function()
{
    return config.read('time.json').temp;
};
module.exports.setTemp = function(newArray)
{
    let list = config.read('time.json');
    list.temp = newArray;
    config.write('time.json', list);
};
module.exports.AddTemp = function(mult)
{
    let list = config.read('time.json');
    list.temp.push(mult);
    list.temp.sort((a, b) => a.time - b.time);
    config.write('time.json', list);
};
module.exports.RemoveTemp = function(mult)
{
    let list = config.read('time.json');
    list.temp = list.temp.filter(item => item.time  !== value.time );
    config.write('time.json', list);
};
module.exports.NextTemp = function()
{
    let time = new Date;
    let hour = time.getHours();
    let minute = time.getMinutes();
    let t = hour * 60 + minute;
    const list = config.read('time.json').temp;
    if(t > list[list.length - 1].time) return list[0];
    let ind = list.findIndex(element => element.time >= t);
    return list[ind];
};
module.exports.Time = function()
{
    let time = new Date;
    let hour = time.getHours();
    let minute = time.getMinutes();
    let t = hour * 60 + minute;
    return t;
};