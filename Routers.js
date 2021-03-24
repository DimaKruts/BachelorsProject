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
    console.log(request.body);
    response.sendStatus(202);
});
// /api/delTemp
router.delete('/delTemp', function(request, response)
{
    console.log(request.body);
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
    console.log(request.body);
    response.sendStatus(202);
});
// /api/delMultiplier
router.delete('/delMultiplier', function(request, response)
{
    console.log(request.body);
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
router.delete('/delMqtt', function(request, response)
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
router.get("/mqtt", function(request, response)
{
    const tariff = config.read().Other.tariff;
    const multiplier = timer.getMultiplier();
    let res = {tariff, multiplier, current:(tariff*multiplier).toFixed(2)};
    response.send(res);
});


module.exports = router;