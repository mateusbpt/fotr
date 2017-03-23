(function () {
    'use strict';
    angular.module('fotr')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('index', {
                    url: '/index',
                    views: {
                        'navbar@': {
                            templateUrl: 'views/navbar.html',
                            controller: 'IndexController'
                        },
                        'content@': {
                            templateUrl: 'views/main.html',
                            controller: 'IndexController'
                        },
                    }
                })
                .state('teste', {
                    url: '/teste',
                    views: {
                        'navbar@': {
                            templateUrl: 'views/navbar.html',
                            controller: 'IndexController'
                        },
                        'content@': {
                            templateUrl: 'views/main2.html',
                            controller: 'IndexController'
                        }
                    }
                })
        }])
        .controller('IndexController', ['$scope', '$http', '$state', function ($scope, $http, $state) {


            $scope.logout = function () {
                localStorage.clear();
                $scope.userAtual = {};
                $scope.logado = localStorage.getItem('logado');
                $state.go('index');
            }

            function verificaLogado() {
                $scope.logado = localStorage.getItem('logado');
                $http.get('/api/users/' + localStorage.getItem('id')).then(function (res) {
                    var user = {
                        "username": res.data.username,
                        "email": res.data.email
                    }
                    $scope.userAtual = angular.copy(user);
                });

            };

            verificaLogado();

        }]);
})();