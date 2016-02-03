var util = require('util');
var bleno = require('bleno');
var oven = require('../oven');

function DisplayTemperatureCharacteristic(oven) {
  bleno.Characteristic.call(this, {
    uuid: '13333333333333333333333333330003',
    properties: ['notify', 'read'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'temperature displayed on screens'
      })
    ]
  });

  this.oven = oven;
}

util.inherits(DisplayTemperatureCharacteristic, bleno.Characteristic);

DisplayTemperatureCharacteristic.prototype.onReadRequest = function(offset, callback) {
  var data = new Buffer(2);
  data.writeUInt16BE(this.oven.displayTemperature, 0);
  callback(this.RESULT_SUCCESS, data);
};

DisplayTemperatureCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('subscribe')
  // console.log('displayTemperature - onSubscribe');

  // this._updateValueCallback = updateValueCallback;
};

module.exports = DisplayTemperatureCharacteristic;
