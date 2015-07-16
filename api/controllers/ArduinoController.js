/**
 * ArduinoController
 *
 * @description :: Server-side logic for managing arduinoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var app = require('arest');
module.exports = {

  getDevice: function (req, res) {
    // Command
    app.get('/:device/:command', function (req, res) {

      console.log('Variable/function request sent to device: ' + req.params.device);

      // Get device
      device = aREST.getDevice(req.params.device);

      if (typeof(device) != 'undefined') {

        if (req.query.params) {

          // Execute function
          device.execFunction(req.params.command, req.query.params, function (error, response, body) {
            res.json(body);
          });

        }
        else {

          // Get variable
          device.getVariable(req.params.command, function (error, response, body) {
            res.json(body);
          });
        }

      }
      else {
        res.json({message: 'Device not found'});
      }

    });
  },

  digitalWrite: function (req, res) {

// Digital write
    app.get('/:device/digital/:pin/:value', function (req, res) {

      console.log('Digital write request sent to device: ' + req.params.device);

      // Get device
      device = aREST.getDevice(req.params.device);

      if (typeof(device) != 'undefined') {

        // Send command
        device.digitalWrite(req.params.pin, req.params.value, function (error, response, body) {
          res.json(body);
        });
      }
      else {
        res.json({message: 'Device not found'});
      }
    });

  },

  analogRead: function (req, res) {

// Analog read
    app.get('/:device/analog/:pin/', function (req, res) {

      console.log('Analog read request sent to device: ' + req.params.device);

      // Get device
      device = aREST.getDevice(req.params.device);

      // Get variable
      device.analogRead(req.params.pin, function (error, response, body) {
        res.json(body);
      });
    });

  },

  analogWrite: function (req, res) {


// Analog Write
    app.get('/:device/analog/:pin/:value', function (req, res) {

      console.log('Analog write request sent to device: ' + req.params.device);

      // Get device
      device = aREST.getDevice(req.params.device);

      // Get variable
      device.analogWrite(req.params.pin, req.params.value, function (error, response, body) {
        res.json(body);
      });
    });

  },

  digitalRead: function (req, res) {

// Digital read
    app.get('/:device/digital/:pin/', function (req, res) {

      console.log('Digital read request sent to device: ' + req.params.device);

      // Get device
      device = aREST.getDevice(req.params.device);

      // Get variable
      device.digitalRead(req.params.pin, function (error, response, body) {
        res.json(body);
      });
    });
  }
};

