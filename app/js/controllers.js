(function () {
    angular.module('BitChow')
        .controller('NavController', ['$scope', '$http', '$state', '$interval', function ($scope, $http, $state, $interval) {

            if (localStorage['User-Data']) {
                $scope.loggedIn = true;
                $scope.user = JSON.parse(localStorage['User-Data']);
            } else {
                $scope.loggedIn = false;
                $state.go('newbie');
            }

            $scope.homeClick = function () {
                if ($scope.loggedIn) {
                    $state.go('main');
                } else {
                    $state.go('newbie');
                }
            }

            $interval(function () {
                if (localStorage['User-Data']) {
                    $scope.loggedIn = true;
                } else {
                    $scope.loggedIn = false;
                }

            }, 20, 2)

            $scope.logOut = function () {
                localStorage.clear();
                $scope.loggedIn = false;
                $state.go('newbie')
            }
        }])

        .controller('MainViewController', ['$scope', '$http', '$state', '$interval', function ($scope, $http, $state, $interval) {

            if (localStorage['User-Data']) {
                $scope.loggedIn = true;
                $scope.user = JSON.parse(localStorage['User-Data']);
            } else {
                $scope.loggedIn = false;
                $state.go('newbie');
            }

            getAllTweets();

            $scope.postTweet = function () {

                var tweet = {
                    userId: $scope.user._id,
                    userEmail: $scope.user.email,
                    userName: $scope.user.userName,
                    content: $scope.newTweet
                }

                $http.post('/api/user/postTweet', tweet).then(function (response) {
                    $scope.allTweets = response.data;

                }, function (err) {
                    console.log(err);
                })
            }

            function getAllTweets() {

                $http.get('/api/main/getAllTweets').then(function (response) {
                    $scope.allTweets = response.data;
                }, function (err) {
                    console.log(err);
                })

            }

        }])

        .controller('LoginController', ['$scope', '$state', '$http', function ($scope, $state, $http) {

            if (localStorage['User-Data']) {
                $scope.loggedIn = true;
                $state.go('main');
            } else {
                $scope.loggedIn = false;
            }
            $scope.logIn = function () {
                $http.post('/api/user/login', $scope.user).then(function (response) {
                    localStorage.setItem('User-Data', JSON.stringify(response.data));
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
                    console.log('bad details');
                } else {
                    var newUser = {}
                    newUser.email = testUser.email;
                    newUser.userName = testUser.userName;
                    newUser.password = testUser.password1;

                    $http.post('/api/user/signup', newUser).then(function (response) {
                        localStorage.setItem('User-Data', JSON.stringify(response.data));
                        $scope.loggedIn = true;
                        $state.go('main');
                    }, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    })
                }
            }

        }])

        .controller('NewbieController', ['$scope', '$state', function ($scope, $state) {
            if (localStorage['User-Data']) {
                $scope.loggedIn = true;
                $state.go('main');
            } else {
                $scope.loggedIn = false;
            }
        }])

        .controller('EditProfileController', ['$scope', '$state', '$http', function ($scope, $state, $http) {
            if (localStorage['User-Data']) {
                $scope.loggedIn = true;
            } else {
                $scope.loggedIn = false;
                $state.go('newbie');
            }

            $scope.user = JSON.parse(localStorage['User-Data']);

            $scope.updateProfile = function () {

                var updatedDetails = {
                    email: $scope.user.email,
                    bio: $scope.updatedUser.bio,
                    userName: $scope.updatedUser.userName,
                    profileImg: $scope.updatedUser.userImg
                }
            }

        }])

        .controller('FollowViewController', ['$scope', '$state', '$http', function ($scope, $state, $http) {
            if (localStorage['User-Data']) {
                $scope.loggedIn = true;
                $scope.user = JSON.parse(localStorage['User-Data']);
            } else {
                $scope.loggedIn = false;
                $state.go('newbie');
            }

            getUsers();

            $scope.followUser = function (userId) {

                var followIds = {
                    follower: $scope.user._id,
                    following: userId
                }

                $http.post('/api/user/followUser', followIds).then(function (response) {
                    console.log(response.data);
                }, function (err) {
                    console.log(err);
                })



            }

            function getUsers() {
                $http.post('/api/user/getFollowableUsers', $scope.user).then(function (response) {
                    console.log(response.data);
                    $scope.followableUsers = response.data;

                    for (var i = 0; i < $scope.followableUsers.length; i++) {
                        if ($scope.followableUsers[i].following.indexOf($scope.user._id)) {
                            $scope.followableUsers[i].isFollowing = true;
                        } else {
                            $scope.followableUsers[i].isFollowing = false;
                        }
                    }

                }, function (err) {
                    console.log(err)
                });
            }

        }])

        .controller('DirectMessagingController', ['$state', '$scope', '$http', function ($state, $scope, $http) {
            if (localStorage['User-Data']) {
                $scope.loggedIn = true;
                $scope.user = JSON.parse(localStorage['User-Data']);
            } else {
                $scope.loggedIn = false;
                $state.go('newbie');
            }

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