const compression = require('compression');
const express = require("express");
const config = require('./Configer');
const bodyParser = require("body-parser");
const {list} = require('./MQTT');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if(config.read().HTTP.auth)
{
    app.use('/auth', require('./Auth'));
}

app.get("/tariff", function(request, response)
{
    const tariff = 1.68;
    // const multiplier = 1.5; 
    const multiplier = Math.random() * 2;
    let res = {tariff, multiplier, current:(tariff*multiplier).toFixed(2)};
    response.send(res);
});

app.get("/data", function(request, response)
{

    let temp = [list.get("Room_room").temp, list.get("Room_room").temp + Math.random()];
    response.send(temp);
});

app.get("/", function(request, response)
{
    
});

app.listen(3000);