var mqtt = require('mqtt')
const config = require('./Configer');
const { tempInside, tempOutside } = require('./Math');
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
  let topics = config.read('./mqtt.json').inside;
  if(topics.find(element => element.topic === topic.toString()))
  {
    let tmp = {...JSON.parse(message.toString()), time: Date.now()};
    tempInside.set(topic.toString(), tmp);
  }
  topics = config.read('./mqtt.json').outside;
  if(topics.find(element => element.topic === topic.toString()))
  {
    let tmp = {...JSON.parse(message.toString()), time: Date.now()};
    tempOutside.set(topic.toString(), tmp);
  }
  topics = config.read('./mqtt.json').voltage;
  if(topics.find(element => element.topic === topic.toString()))
  {
    let tmp = {...JSON.parse(message.toString()), time: Date.now()};
    voltage.set(topic.toString(), tmp);
  }
});

module.exports.publish = function(topic, message)
{
  client.publish(topic.toString(), message.toString());
}