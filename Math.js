let tempInside = new Map();
let tempOutside = new Map();
let voltege = new Map();
let grapficts = [];
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

module.exports.grapficts = function()
{
    return grapficts;
};
module.exports.tempInside = tempInside;
module.exports.tempOutside = tempOutside;
module.exports.voltege = voltege;
module.exports.averageTemp = function()
{
    return averageTemp(tempInside);
} 
    

setInterval(() =>
{
    tempInside = filter(tempInside);
    tempOutside = filter(tempOutside);
    voltege = filter(voltege);
}, 10000);

setInterval(() =>
{
    let tempSet = 0;
    let temp = averageTemp(tempInside);
    let time = new Date.now();
    let str = `${time.getHours()}:${time.getMinutes()}`;
    let tmp = { name:str, temp, tempSet };
    grapficts.push(tmp);
    if(grapficts.length > 60)
    {
        grapficts.shift();
    }
}, 60000);