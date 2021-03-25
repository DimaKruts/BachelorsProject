const { Router } = require('express');
const timer = require('./Timer');
const config = require('./Configer');

const router = Router();
// /api/getCurretnTemp
router.get('/getCurretnTemp', function(request, response)
{  
    response.send({temp:timer.getTemp()});
});
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
    response.sendStatus(202);
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
    response.sendStatus(202);
});
// /api/getCurretnMultiplier
router.get('/getCurretnMultiplier', function(request, response)
{  
    response.send({multiplier:timer.getMultiplier()});
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
    response.send(config.read().Sources);
});
// /api/addMqtt
router.post('/addMqtt', function(request, response)
{
    console.log(request.body);
    response.sendStatus(202);
});
// /api/delMultiplier
router.post('/delMqtt', function(request, response)
{
    console.log(request.body);
    response.sendStatus(202);
});
// /api/tariff
router.get("/tariff", function(request, response)
{
    const tariff = config.read().Other.tariff;
    const multiplier = timer.getMultiplier();
    let res = {tariff, multiplier, current:(tariff*multiplier).toFixed(2)};
    response.send(res);
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