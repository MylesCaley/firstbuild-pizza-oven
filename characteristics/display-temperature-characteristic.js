/*
 * Copyright (c) 2016 FirstBuild
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

var util = require('util');
var bleno = require('bleno');
var _oven;

/**
 * constructor
 */
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

  _oven = oven;
}

util.inherits(DisplayTemperatureCharacteristic, bleno.Characteristic);

/**
 * read
 */
DisplayTemperatureCharacteristic.prototype.onReadRequest = function(offset, callback) {
  var data = new Buffer(2);
  data.writeUInt16BE(_oven.displayTemperature, 0);
  callback(this.RESULT_SUCCESS, data);
};

/**
 * subscribe, listen for updates on oven
 */
DisplayTemperatureCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  _oven.on('displayTemperatureUpdated', function() {
    if (updateValueCallback) {
      var data = new Buffer(2);
      data.writeUInt16BE(_oven.displayTemperature, 0);
      updateValueCallback(data);
    }
  });
};

module.exports = DisplayTemperatureCharacteristic;
