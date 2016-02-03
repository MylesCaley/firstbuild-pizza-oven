var util = require('util');
var bleno = require('bleno');


var oven = require('./oven');
var OvenService = require('./oven-service');
var serviceName = 'PizzaOven';
var ovenService = new OvenService(new oven.Oven());

bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    bleno.startAdvertising(serviceName, [ovenService.uuid], function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  else {
    bleno.stopAdvertising();
  }
});


bleno.on('advertisingStart', function(err) {
  if (!err) {
    console.log('advertising...');
    bleno.setServices([
      ovenService
    ]);
  }
});