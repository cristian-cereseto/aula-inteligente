var aulaInteligenteModule = angular.module('aulaInteligenteModule', ['ngRoute']);

aulaInteligenteModule.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/gestionar-alumnos', {
      controller: 'alumnosController',
      templateUrl: 'partials/gestionar-alumnos.html'
    })
    .when('/control', {
        controller: 'tableroController',
        templateUrl: 'partials/tablero-control.html'
    })
    .when('/ingreso', {
        controller: 'alumnosController',
        templateUrl: 'partials/ingresos.html'
    });
}]);

