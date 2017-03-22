(function () {
    'use strict';
    angular.module('fotr')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('index', {
                    url: '/index',
                    views: {
                        'navbar@': {
                            templateUrl: 'views/navbar_main.html',
                            controller: 'IndexController'
                        },
                        'content@': {
                            templateUrl: 'views/main.html',
                            controller: 'IndexController'
                        }
                    }
                });
        }])
        .controller('IndexController', ['$scope', '$http', function ($scope, $http) {

        }]);
})();