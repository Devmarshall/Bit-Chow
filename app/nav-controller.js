(function () {
    angular.module('BitChow')
        .controller('NavController', ['$scope', '$http', '$state', function ($scope, $hhtp, $state) {


            $scope.logIn = function () {
                $scope.loggedIn = true
            }




            
            $scope.logOut = function () {
                localStorage.clear();
                $scoep.loggedIn = false;
                window.location = ('/');
            }



        }])
}());