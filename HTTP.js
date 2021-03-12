const compression = require('compression');
const express = require("express");
const config = require('./Configer')

const app = express();

app.use(compression());
app.disable('x-powered-by');
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/static"));

if(config.read().HTTP.auth)
{
    //app.use();
}

app.get("/", function(request, response)
{
    response.send("<h2>Привет Express!</h2>");
});
// начинаем прослушивать подключения на 3000 порту
app.listen(3000);