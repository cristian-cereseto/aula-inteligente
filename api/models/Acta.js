/**
* Acta.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    clase: {
      model: 'clase'
    },
    fecha: {
      type: 'datetime'
    },
    asistencia: {
      collection: 'usuario',
      via: 'acta'
    }
  }
};

