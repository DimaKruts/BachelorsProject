const HTTP = require('./HTTP');
const MQTT = require('./MQTT');
const math = require('./Math');
const Timer = require('./Timer');
const config = require('./Configer');

const {min, max} = config.read().Other.power;

function main()
{
    let tariff = Timer.getMultiplier();
    let nextTariff = Timer.NextMultiplier();
    
    let tempIn = math.averageTempIn();
    let tempOut = math.averageTempOut();
    let temtSet = Timer.getTemp();
    let tempSN = Timer.NextTemp();
    
    let { kp, ki, kd, speed } = config.read('./math.json');
    let speedHeat = speed.heat;  //*C/min
    let speedCold = speed.cold //*C/min

    let time = Timer.Time();
    
    // console.log({tariff, nextTariff, tempIn, tempOut, temtSet, tempSN});
    // console.log({max, min, kp, ki, kd, speedHeat, speedCold });

    if(tempSN.temp > temtSet)
    {
        let needTime = Number((tempSN.temp - temtSet) / speed.heat);
        // console.log(needTime);
        if(time + needTime > tempSN.time)
        {
            temtSet = tempSN.temp;
        }
    }
    let power = math.computePID(tempIn, tempSN, kp, ki, kd, 30000, min, max);

    MQTT.publish("heater", JSON.stringify({power}));

}

main();
setInterval(main, 30000);
