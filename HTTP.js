const compression = require('compression');
const express = require("express");
const config = require('./Configer');
const bodyParser = require("body-parser");
const { grapfic, averageTempIn, averageTempOut, averageVoltage } = require('./Math');
const { getTemp, getMultiplier } = require('./Timer');
const MQTT = require('./MQTT');
const { request } = require('express');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if(config.read().HTTP.auth)
{
    app.use('/auth', require('./Auth'));
    //app.use('/api', require('./auth.middleware'),require('./Routers'));
    app.use('/api', require('./Routers'));   
}
else
{
    app.use('/api', require('./Routers'));    
};

app.get("/data", function(request, response)
{
    //let temp = [22.0, averageTemp()];
    let temp = [getTemp(), averageTempIn(), averageTempOut()];
    response.send(temp);
});

app.get("/voltage", function(request, response)
{
    let temp = {voltage: averageVoltage()};
    response.send(temp);
});

app.get("/grapfic", function(request, response)
{
    //response.send(grapfic());
    response.send(require('./test.json'));
});

app.get("/tariff", function(request, response)
{
    const tariff = config.read().Other.tariff;
    const multiplier = getMultiplier();
    let res = {tariff, multiplier, current:(tariff*multiplier).toFixed(2)};
    response.send(res);
});

app.post("/test", require('./auth.middleware'), function(request, response)
{
    console.log("Body", request.body);
    console.log("user", request.user);
    response.sendStatus(200);
});

app.get("/", function(request, response)
{
    
});

app.listen(config.read().HTTP.port);
