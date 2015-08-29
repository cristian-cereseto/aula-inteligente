aulaInteligenteModule.controller('tableroController', ['$scope', '$http', function ($scope, $http) {
    var URL_ROOT = 'http://localhost:1334/serial/digital/';
    var PIN_LUZ_1 = '5/';
    var PIN_LUZ_2 = '6/';
    var PIN_CAL = '7/';
    var PIN_AA = '8/';

    $scope.toggleControlLuz1 = function (control) {
      var action = (control) ? 1 : 0;
        $http.get(URL_ROOT + PIN_LUZ_1 + action)
    };

    $scope.toggleControlLuz2 = function (control) {
      var action = (control) ? 1 : 0;
      $http.get(URL_ROOT + PIN_LUZ_2 + action)
    };

    $scope.toggleControlCalefaccion = function (control) {
      var action = (control) ? 1 : 0;
      $http.get(URL_ROOT + PIN_CAL+ action)
    };

    $scope.toggleControlAire = function (control) {
      var action = (control) ? 1 : 0;
      $http.get(URL_ROOT + PIN_AA + action)
    };

    $scope.init = function () {
      $http.get(URL_ROOT + PIN_LUZ_1 + 0).then(function (response) {
        $scope.control_luz_1 = false;
      });

      $http.get(URL_ROOT + PIN_LUZ_2 + 0).then(function (response) {
        $scope.control_luz_2 = false;
      });

      $http.get(URL_ROOT + PIN_CAL + 0).then(function (response) {
        $scope.control_cal = false;
      });

      $http.get(URL_ROOT + PIN_AA + 0).then(function (response) {
        $scope.control_aa = false;
      });
    };

    $scope.init();
}]);
