var mqtt = require('mqtt')
const config = require('./Configer');
const client  = mqtt.connect(config.read().MQTT);
let list = new Map();
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
  const topics = config.read().Sources.inside;
  try 
  {
    let tmp = {...JSON.parse(message.toString()), time: Date.now()};
  } 
  catch (error) 
  {
    
  }
});

module.exports.publish = function(topic, message)
{
  client.publish(topic.toString(), message.toString());
}