var util = require('util');
var bleno = require('bleno');

var DisplayTemperatureCharacteristic = require('./characteristics/display-temperature-characteristic');

function OvenService(oven) {
    bleno.PrimaryService.call(this, {
        uuid: '13333333333333333333333333333337',
        characteristics: [
            new DisplayTemperatureCharacteristic(oven)
        ]
    });
}

util.inherits(OvenService, bleno.PrimaryService);

module.exports = OvenService;