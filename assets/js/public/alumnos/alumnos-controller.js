aulaInteligenteModule.controller('alumnosController', ['$scope', 'alumnosServicios', function ($scope, alumnosServicios) {
    $scope.init = function () {
      alumnosServicios.getAlumnos().then(function (response) {
        $scope.alumnos = response.data;
      });
      $scope.disableForm = false;
    };

    $scope.guardarAlumno = function () {
      if ($scope.modoForm === 'alta') {
        if ($scope.usuario) {
          var alumno = {
              usuario: $scope.usuario,
              nombre: $scope.nombre,
              apellido: $scope.apellido,
              password: $scope.password,
              email: $scope.email,
              nroLegajo: $scope.nroLegajo,
              nroTarjeta: $scope.nroTarjeta
          };

          alumnosServicios.guardarAlumno(alumno).then(function (response) {
            $scope.alumnos.push(response.data);
          });
          $scope.cerrarModal();
        } else {
          $scope.formIncompleto = true;
        }
      } else {
        if ($scope.usuario) {

          var alumno = {
              'id': $scope.alumnoSeleccionado,
              usuario: $scope.usuario,
              nombre: $scope.nombre,
              apellido: $scope.apellido,
              password: $scope.password,
              email: $scope.email,
              nroLegajo: $scope.nroLegajo,
              nroTarjeta: $scope.nroTarjeta
          };

          index = $scope.alumnos.indexOf(_.findWhere($scope.alumnos, {id: $scope.alumnoSeleccionado}));
          $scope.alumnos[index] = alumno;
          alumnosServicios.modificarAlumno(alumno, $scope.alumnoSeleccionado);
          $scope.cerrarModal();
        } else {
          $scope.formIncompleto = true;
        }
      }
    };

    $scope.crearAlumno = function () {
      $scope.usuario = '';
      $scope.nombre = '';
      $scope.apellido = '';
      $scope.password = '';
      $scope.email = '';
      $scope.nroLegajo = '';
      $scope.nroTarjeta = '';
      $scope.disableForm = false;
      $scope.modoForm = 'alta';
      $scope.openModal();
    };

    $scope.modificarAlumno = function () {
      if(!_.isUndefined($scope.alumnoSeleccionado)) {
        $scope.modoForm = 'modificacion';
        var alumno = _.findWhere($scope.alumnos, {id: $scope.alumnoSeleccionado});

        $scope.descripcion = alumno.descripcion;
        $scope.openModal();
        $scope.disableForm = false;
      } else {
        alert('Seleccione un alumno!');
      }
    };

    $scope.consultarAlumno = function () {
      if(!_.isUndefined($scope.alumnoSeleccionado)) {
        $scope.modoForm = 'consulta';
        var alumno = _.findWhere($scope.alumnos, {id: $scope.alumnoSeleccionado});

        $scope.usuario = alumno.usuario;
        $scope.nombre = alumno.nombre;
        $scope.apellido = alumno.apellido;
        $scope.password = alumno.password;
        $scope.email = alumno.email;
        $scope.nroLegajo = alumno.nroLegajo;
        $scope.nroTarjeta = alumno.nroTarjeta ;
        $scope.openModal();
        $scope.disableForm = true;
      } else {
        alert('Seleccione un alumno!');
      }
    };

    $scope.eliminarAlumno = function () {
      if (!_.isUndefined($scope.alumnoSeleccionado)) {
        alumnosServicios.eliminarAlumno($scope.alumnoSeleccionado)
          .then(function () {
            $scope.alumnos.splice($scope.alumnos.indexOf($scope.alumnoSeleccionado));
            alert('Alumno eliminado con exito!');
          });
      } else {
        alert('Seleccione un alumno!');
      }
    };

    $scope.openModal = function () {
      $('#modal-detalles--alumno').foundation('reveal', 'open');
    };

    $scope.cerrarModal = function () {
      $('a.close-reveal-modal').trigger('click');
    };

    $scope.cancelar = function () {
      $scope.cerrarModal();
    };

    $scope.selectAlumno = function (id) {
      $scope.alumnoSeleccionado = id;
    };

    $scope.darPresente = function () {
        var alumno = _.findWhere($scope.alumnos, {usuario: $scope.alumnoPresente});
        if (alumno.password === $scope.passwordAlumno) {
            alumnosServicios.darPresente(alumno).then(function () {
                alert('Asistencia guardada!');
            });
        } else {
                alert('Ingrese los datos correctos!');
        }
    };

    $scope.leerTarjeta = function () {
      alumnosServicios.leerTarjeta();
    };

    $scope.init();
}]);
