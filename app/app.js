(function () {
    angular.module('BitChow', ['ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider.state('main', {
                url: '/',
                templateUrl: '/app/main-view.html',
                controller: 'MainViewController'
            })


        })
}());