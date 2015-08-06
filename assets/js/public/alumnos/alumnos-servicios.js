aulaInteligenteModule.factory('alumnosServicios', ['$http', function ($http) {
  var alumnosServicios = {
    getAlumnos: function () {
      return $http.get('/usuario');
    },

    guardarAlumno: function (alumno) {
      return $http.post('/usuario', JSON.stringify(alumno));
    },

    modificarAlumno: function (alumno, id) {
      $http.put('/usuario/'+id, JSON.stringify(alumno))
        .then(function onSuccess () {
          alert('alumno actualizado con éxito');
        })
        .catch(function onError(sailsResponse) {
          console.log(sailsResponse);
        })
        .finally(function eatherWay () {
          console.log('finalizado');
        });

    },

    consultarAlumno: function (id) {

    },

    eliminarAlumno: function (id) {
        return $http.delete('/usuario/' + id);
    },

    darPresente: function (alumno) {
        var fecha = moment();
        var asistencia = {
            alumno: alumno.id,
            fecha: fecha
        };

        return $http.post('/asistencia', asistencia);
    },

    leerTarjeta: function () {
        return $http.get('/tagId');
    }
  };

  return alumnosServicios;
}]);
