var util = require('util');
var events = require('events');

function Oven() {
  console.log('initializing oven object');
  events.EventEmitter.call(this);
  this.displayTemperature = 77;
}

util.inherits(Oven, events.EventEmitter);

module.exports.Oven = Oven;
