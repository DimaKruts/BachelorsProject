var mqtt = require('mqtt')
const config = require('./Configer');
const client  = mqtt.connect(config.read().MQTT);
let list = new Map();
module.exports.list = list;
client.on('connect', function () 
{
  client.subscribe('#', function (err) 
  {
    if (err) 
    {
      console.log(err);
      process.exit(1);
    }
  });
});
client.on('message', function (topic, message) 
{
  try 
  {
    // let tmp = {...JSON.parse(message.toString(),};
    // console.log(tmp);
    list.set(topic.toString(), JSON.parse(message.toString()));
  } 
  catch (error) 
  {
    
  }
});

module.exports.publish = function(topic, message)
{
  client.publish(topic.toString(), message.toString());
}