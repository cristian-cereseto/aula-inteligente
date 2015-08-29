aulaInteligenteModule.controller('tableroController', ['$scope', '$http', function ($scope, $http) {

    var URL_ROOT = '/Arduino/digital/';
    var PIN_LUZ_1 = '5/';
    var PIN_LUZ_2 = '6/';
    var PIN_CAL = '7/';
    var PIN_AA = '8/';

    $scope.toggleControlLuz1 = function (control) {
      var action = (control) ? 1 : 0;

      $http.get(URL_ROOT + PIN_LUZ_1 + action);
      setTimeout(function () {
        console.log('Enviando request al arduino');
      }, 1000);
    };

    $scope.toggleControlLuz2 = function (control) {
      var action = (control) ? 1 : 0;

      $http.get(URL_ROOT + PIN_LUZ_2 + action);
      setTimeout(function () {
        console.log('Enviando request al arduino');
      }, 1000);
    };

    $scope.toggleControlCalefaccion = function (control) {
      var action = (control) ? 1 : 0;

      $http.get(URL_ROOT + PIN_CAL+ action);
      setTimeout(function () {
        console.log('Enviando request al arduino');
      }, 1000);
    };

    $scope.toggleControlAire = function (control) {
      var action = (control) ? 1 : 0;

      $http.get(URL_ROOT + PIN_AA + action);
      setTimeout(function () {
        console.log('Enviando request al arduino');
      }, 1000);
    };

    $scope.init = function () {
      $scope.isLoading = false;

      $http.get(URL_ROOT + PIN_LUZ_1).then(function (response) {
        $scope.isLoading = true;
        console.log(URL_ROOT + PIN_LUZ_1);
        $scope.control_luz_1 = (response.data.return_value === 1);
        setTimeout(function () {
          console.log('Enviando request al arduino');
        }, 1000);
        console.log('1', response.data.return_value);
        $scope.isLoading = false;
      });

      $http.get(URL_ROOT + PIN_LUZ_2).then(function (response) {
        console.log(URL_ROOT + PIN_LUZ_2);
        $scope.control_luz_2 = (response.data.return_value === 1);
        setTimeout(function () {
          console.log('Enviando request al arduino');
        }, 1000);
        console.log('2', response.data.return_value);
      });

      $http.get(URL_ROOT + PIN_CAL).then(function (response) {
        console.log(URL_ROOT + PIN_CAL);
        $scope.control_cal = (response.data.return_value === 1);
        setTimeout(function () {
          console.log('Enviando request al arduino');
        }, 1000);
        console.log('3', response.data.return_value);
      });

      $http.get(URL_ROOT + PIN_AA).then(function (response) {
        console.log(URL_ROOT + PIN_AA);
        $scope.control_aa = (response.data.return_value === 1);
        setTimeout(function () {
          console.log('Enviando request al arduino');
        }, 1000);
        console.log('4', response.data.return_value);
      });
    };

    $scope.init();
}]);
