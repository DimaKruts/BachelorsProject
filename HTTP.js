const compression = require('compression');
const express = require("express");
const config = require('./Configer');
const bodyParser = require("body-parser");
const { grapfic, averageTemp } = require('./Math');
const { getTemp } = require('./Timer');
const MQTT = require('./MQTT');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if(config.read().HTTP.auth)
{
    app.use('/auth', require('./Auth'));
    app.use('/api', require('./auth.middleware'),require('./Routers'));
}
else
{
    app.use('/api', require('./Routers'));    
};

app.get("/data", function(request, response)
{
    //let temp = [22.0, averageTemp()];
    let temp = [getTemp(), averageTemp()];
    response.send(temp);
});

app.get("/grapfic", function(request, response)
{
    //response.send(grapfic());
    response.send(require('./test.json'));
});

app.get("/", function(request, response)
{
    
});

app.listen(3000);