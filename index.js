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
var OvenService = require('./oven-service');
var Oven = require('./oven');

var oven = new Oven();
var ovenBleService = new OvenService(oven);

console.log('loading ble engine')

/**
 * if loaded externally, this externalizes the
 * engine for the oven  service and exploses oven object 
 */
function BleEngine() {
  this.oven = oven;
}

/**
 * listen for power on
 */
bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    bleno.startAdvertising('PizzaOven', [ovenBleService.uuid], function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  else {
    bleno.stopAdvertising();
  }
});

/**
 * listen for advertising
 */
bleno.on('advertisingStart', function(err) {
  if (!err) {
    bleno.setServices([
      ovenBleService
    ]);
  }
});

module.exports = BleEngine;
