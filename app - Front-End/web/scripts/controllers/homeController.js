(function () {
    'use strict';
    angular.module('fotr')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    views: {
                        'navbar@': {
                            templateUrl: 'views/navbar_home.html',
                            controller: 'MainController'
                        },
                        'content@': {
                            templateUrl: 'views/principal.html',
                            controller: 'MainController'
                        }
                    }
                })
        }])
        .controller('MainController', ['$scope', '$http', '$state', function ($scope, $http, $state) {

        }])
})();