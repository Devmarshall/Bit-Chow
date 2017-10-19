(function () {
    angular.module('BitChow', ['ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider.state('main', {
                url: '/bitchow',
                templateUrl: '/app/templates/main-view.html',
                controller: 'MainViewController'
            })

            $stateProvider.state('newbie', {
                url: '/',
                templateUrl: '/app/templates/intro.html',
                controller: 'NewbieController'
            })

            $stateProvider.state('login', {
                url: '/login',
                templateUrl: '/app/templates/login.html',
                controller: 'LoginController'
            })

            $stateProvider.state('signup', {
                url: '/signup',
                templateUrl: '/app/templates/signup.html',
                controller: 'SignUpController'
            })

            $stateProvider.state('editProfile', {
                url: '/editProfile',
                templateUrl: '/app/templates/edit-profile.html',
                controller: 'EditProfileController'
            })

            $stateProvider.state('follow', {
                url: '/follow',
                templateUrl: '/app/templates/follow-view.html',
                controller: 'FollowViewController'
            })

            $stateProvider.state('messaging', {
                url: '/direct-messaging',
                templateUrl: '/app/templates/direct-messaging-view.html',
                controller: 'DirectMessagingController'
            })

        })
}());