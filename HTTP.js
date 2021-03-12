const compression = require('compression');
const express = require("express");
const config = require('./Configer');
const bodyParser = require("body-parser");

const app = express();

app.use(compression());
//app.disable('x-powered-by');
app.set("view engine", "ejs");
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/static"));

if(config.read().HTTP.auth)
{
    app.use('/auth', require('./Auth'));
}

app.get("/data", function(request, response)
{
    let temp = 25.0 - 25.0 * Math.random();
    response.send(`{"temp":${temp.toFixed(2)}}`);
});

app.get("/", function(request, response)
{
    response.render("index");
});

app.get("/auth", function(request, response)
{
    response.render("auth");
});

// начинаем прослушивать подключения на 3000 порту
app.listen(3000);