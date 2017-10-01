(function () {
    angular.module('BitChow')
        .controller('NavController', ['$scope', '$http', '$state', '$interval', function ($scope, $http, $state, $interval) {

            $scope.logIn = function () {
                $scope.loggedIn = true
            }

            $scope.logOut = function () {
                localStorage.clear();
                $scope.loggedIn = false;
                $state.go('newbie')
            }
        }])

        .controller('MainViewController', ['$scope', '$http', '$state', function ($scope, $http, $state) {

        }])

        .controller('LoginController', ['$scope', '$state', '$http', function ($scope, $state, $http) {

            $scope.login = function () {

                $http.post('/api/user/login', $scope.user).then(function (response) {
                    localStorage.setItem('UserData', JSON.stringify(response.data));
                    $scope.loggedIn = true;
                    $state.go('main');
                }, function (err) {
                    console.log(err);
                    $scope.loggedIn = false;
                })
            }
        }])

        .controller('SignUpController', ['$scope', '$state', '$http', function ($scope, $state, $http) {

            if (localStorage['User-Data']) {
                $scope.loggedIn = true;
                $state.go('main');
            } else {
                $scope.loggedIn = false;
            }

            $scope.signUp = function () {
                console.log($scope.newUser);
                var testUser = angular.copy($scope.newUser);
                if (testUser.password1 !== testUser.password2 || validateEmail(testUser.email) == false) {
                    if (testUser.password1 !== testUser.password2) {
                        console.log('incorrect passwords')
                    }
                    if (validateEmail(testUser.email) == false) {
                        console.log('invalid emails');
                    }
                } else {
                    var newUser = {}
                    newUser.email = testUser.email;
                    newUser.password = testUser.password1;

                    $http.post('/api/user/signup', newUser).then(function (response) {}, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    })
                }
            }

        }])

        .controller('NewbieController', ['$scope', '$state', function ($scope, $state) {

        }])

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(email)) {
            return true;
        } else {
            return false;
        }
    }

}());