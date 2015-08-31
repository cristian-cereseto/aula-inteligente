/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  var aRest = require('arest')(sails);
  var Promise = require('bluebird');

  // Verificar la url y el puerto donde está conectado el Arduino
  aRest.addDevice('serial','/dev/ttyACM3', 115200, function () {

    // Get device
    device = aRest.getDevice('Arduino');

    // Get variable
    var configPin5 = Promise.promisifyAll(device.pinMode.bind(this, 5, 'o'));
    var configPin6 = Promise.promisifyAll(device.pinMode.bind(this, 6, 'o'));
    var configPin7 = Promise.promisifyAll(device.pinMode.bind(this, 7, 'o'));
    var configPin8 = Promise.promisifyAll(device.pinMode.bind(this, 8, 'o'));

    Promise.join(configPin5(), configPin6(), configPin7(), configPin8(), function () {
      console.log('Entradas configuradas');
    });
  });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
