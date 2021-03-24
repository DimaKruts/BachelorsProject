let tempInside = new Map();
let tempOutside = new Map();
let voltage = new Map();
let grapfic = [];
let time = 300;

function filter(list)
{
    for(let k of list.keys())
    {
        let tmp = list.get(k);
        if((Date.now() - tmp.time) > (time * 1000))
        {
            list.delet(k);
        };
    };
    return list;
};

function averageTemp(list)
{
    let count = list.size;
    let sum = 0
    try 
    {
        list.forEach(element => {
            sum += element.temp;
        });
    } 
    catch (error) 
    {
        
    }
    return sum / count;
};

module.exports.grapfic = function()
{
    return grapfic;
};
module.exports.voltage = voltage;
module.exports.tempInside = tempInside;
module.exports.tempOutside = tempOutside;
module.exports.averageTemp = function()
{
    return averageTemp(tempInside);
} 
    

setInterval(() =>
{
    voltage = filter(voltage);
    tempInside = filter(tempInside);
    tempOutside = filter(tempOutside);
}, 10000);

setInterval(() =>
{
    let tempSet = 0;
    let temp = averageTemp(tempInside);
    let time = new Date;
    let str = `${time.getHours()}:${time.getMinutes()}`;
    let tmp = { name:str, temp, tempSet };
    grapfic.push(tmp);
    if(grapfic.length > 60)
    {
        grapfic.shift();
    }
}, 60000);