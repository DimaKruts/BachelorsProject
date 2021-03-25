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
};

function constrain(input, minOut, maxOut)
{
    if(input > maxOut) return maxOut;
    if(input < minOut) return minOut;
    return input;
}

let integral = 0, prevErr = 0;
function computePID(input, setpoint, kp, ki, kd, dt, minOut, maxOut) 
{
    err = setpoint - input;
    integral = 0, prevErr = 0;
    integral = constrain(integral + err * dt * ki, minOut, maxOut);
    D = (err - prevErr) / dt;
    prevErr = err;
    return constrain(err * kp + integral + D * kd, minOut, maxOut);
};

module.exports.computePID = computePID;
module.exports.constrain = constrain;
    

setInterval(() =>
{
    
}, 30000);

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