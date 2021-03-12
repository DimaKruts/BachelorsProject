var mqtt = require('mqtt')
const json = require('./config.json');
var client  = mqtt.connect(json.MQTT)
let list = new Map();
module.exports.list = list;
client.on('connect', function () 
{
  client.subscribe('#', function (err) 
  {
    if (err) 
    {
      console.log(err);
    }
  });
});
client.on('message', function (topic, message) 
{
  list.set(topic.toString(), JSON.parse(message));
});

module.exports.publish = function(topic, message)
{
  client.publish(topic.toString(), message.toString());
}


// let timerId = setTimeout(function tick() {
//   console.log(list);
//   timerId = setTimeout(tick, 2000); // (*)
// }, 60000);