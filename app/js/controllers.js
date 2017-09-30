(function () {
    angular.module('BitChow')
        .controller('NavController', ['$scope', '$http', '$state', function ($scope, $hhtp, $state) {

            $scope.logIn = function () {
                $scope.loggedIn = true
            }

            $scope.logOut = function () {
                localStorage.clear();
                $scope.loggedIn = false;
                window.location = ('/');
            }
        }])

        .controller('MainViewController', ['$scope', '$http', '$state', function ($scope, $http, $state) {

        }])


        .controller('LoginController', ['$scope', '$state', '$http', function ($scope, $state, $http) {

        }])

        .controller('SignUpController', ['$scope', '$state', '$http', function ($scope, $state, $http) {

        }])

        .controller('NewbieController', ['$scope', '$state', function ($scope, $state) {

        }])
}());