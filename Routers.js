const { Router } = require('express');
const timer = require('./Timer');
const config = require('./Configer');
const { v4: uuidv4 } = require('uuid');

const router = Router();
// /api/temp
router.get('/temp', function(request, response)
{  
    response.send({temp:timer.Temp()});
});
// /api/addTemp
router.post('/addTemp', function(request, response)
{
    let {time, hour, minute, temp} = request.body;
    if(!temp) response.sendStatus(406);
    if(time) 
    {
        if(!(hour && minute))
        {
            minute = time % 60;
            hour = (time - minute) / 60;
        }
    }
    else if(!(hour && minute))
    {
        time = hour * 60 + minute;
    }
    else response.sendStatus(406);
    timer.AddTemp({time, hour, minute, temp});
    response.sendStatus(200);
});
// /api/addTemps
router.post('/addTemps', function(request, response)
{
    timer.setTemp(request.body);
    response.sendStatus(200);
});
// /api/delTemp
router.post('/delTemp', function(request, response)
{
    let {time, hour, minute, temp} = request.body;
    if(!temp) response.sendStatus(406);
    if(time) 
    {
        if(!(hour && minute))
        {
            minute = time % 60;
            hour = (time - minute) / 60;
        }
    }
    else if(!(hour && minute))
    {
        time = hour * 60 + minute;
    }
    else response.sendStatus(406);
    timer.RemoveTemp({time, hour, minute, temp});
    response.sendStatus(200);
});
// /api/multiplier
router.get('/multiplier', function(request, response)
{  
    response.send({multiplier:timer.Multiplier()});
});
// /api/addMultiplier
router.post('/addMultiplier', function(request, response)
{
    let {time, hour, minute, multiplier} = request.body;
    if(!multiplier) response.sendStatus(406);
    if(time) 
    {
        if(!(hour && minute))
        {
            minute = time % 60;
            hour = (time - minute) / 60;
        }
    }
    else if(!(hour && minute))
    {
        time = hour * 60 + minute;
    }
    else response.sendStatus(406);
    timer.AddMultiplier({time, hour, minute, multiplier});
    response.sendStatus(200);
});
// /api/addMultiplier
router.post('/addMultipliers', function(request, response)
{
    timer.setMultiplier(request.body);
    response.sendStatus(202);
});
// /api/delMultiplier
router.post('/delMultiplier', function(request, response)
{
    let {time, hour, minute, temp} = request.body;
    if(!temp) response.sendStatus(406);
    if(time) 
    {
        if(!(hour && minute))
        {
            minute = time % 60;
            hour = (time - minute) / 60;
        }
    }
    else if(!(hour && minute))
    {
        time = hour * 60 + minute;
    }
    else response.sendStatus(406);
    timer.RemoveMultiplier({time, hour, minute, temp});
    response.sendStatus(202);
});
// /api/mqtt
router.get('/mqtt', function(request, response)
{  
    let mqtt = config.read('./mqtt.json');
    let res = [];
    mqtt.inside.forEach(element => {
        res.push({...element, id: uuidv4(), group:1});
    });
    mqtt.outside.forEach(element => {
        res.push({...element, id: uuidv4(), group:2});
    });
    mqtt.voltage.forEach(element => {
        res.push({...element, id: uuidv4(), group:3});
    });
    response.send(res);
});
// /api/addMqtt
router.post('/addMqtt', function(request, response)
{
    // console.log(request.body);
    const {topic, group, json} = request.body;
    let mqtt = config.read('./mqtt.json');
    if(group == 1)
    {
        if(mqtt.inside.find(element => element.topic == topic)) 
        {
            response.sendStatus(409);
            return;
        }
        mqtt.inside.push({topic, json});
        config.write('./mqtt.json', mqtt);
    } 
    else if(group == 2)
    {
        if(mqtt.outside.find(element => element.topic == topic)) 
        {
            response.sendStatus(409);
            return;
        }
        mqtt.outside.push({topic, json});
        config.write('./mqtt.json', mqtt);
    }
    else if(group == 3)
    {
        if(mqtt.voltage.find(element => element.topic == topic)) 
        {
            response.sendStatus(409);
            return;
        }
        mqtt.voltage.push({topic, json});
        config.write('./mqtt.json', mqtt);
    }
    else response.sendStatus(418);
    response.sendStatus(200);
});
// /api/addMqtts
router.post('/addMqtts', function(request, response)
{
    let mqtt = config.read('./mqtt.json');
    mqtt.inside = [];
    mqtt.outside = [];
    mqtt.voltage = [];
    request.body.forEach(elements => {
        const { topic, group, json } = elements;
        if (group == 1) {
                mqtt.inside.push({ topic, json });
        }
        else if (group == 2) {
                mqtt.outside.push({ topic, json });
        }
        else if (group == 3) {
                mqtt.voltage.push({ topic, json });
        }
    });
    config.write('./mqtt.json', mqtt);
    response.sendStatus(200);
});
// /api/delMultiplier
router.post('/delMqtt', function(request, response)
{
    const {topic, group } = request.body;
    let mqtt = config.read('./mqtt.json');
    if(group == 1)
    {
        mqtt.inside = mqtt.inside.filter(item => item.topic  !== topic );
    } 
    else if(group == 2)
    {
        mqtt.outside = mqtt.outside.filter(item => item.topic  !== topic );
    }
    else if(group == 3)
    {
        mqtt.voltage = mqtt.voltage.filter(item => item.topic  !== topic );
    }
    else response.sendStatus(418);
    config.write('./mqtt.json', mqtt);
    response.sendStatus(200);
});
// /api/tariff
router.post("/tariff", function(request, response)
{
    let {tariff} = request.body;
    if(!tariff) response.sendStatus(406);
    let conf = config.read();
    conf.Other.tariff = tariff;
    config.write("config.json", conf);
    response.sendStatus(202);
});



module.exports = router;