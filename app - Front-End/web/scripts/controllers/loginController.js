 (function () {
     'use strict';
     angular.module('fotr')
         .config(['$stateProvider', function ($stateProvider) {
             $stateProvider
                 .state('login', {
                     url: '/login',
                     views: {
                         'navbar@': {
                             templateUrl: 'views/navbar_form.html',
                             controller: 'LoginController'
                         },
                         'content@': {
                             templateUrl: 'views/login.html',
                             controller: 'LoginController'
                         }
                     }
                 })
         }])
         .controller('LoginController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
             $scope.user = {};
             $scope.errors = false;

             $scope.login = function (form) {
                 form.$submitted = true;
                 if (!form.$invalid && form.$valid) {
                     var data = angular.copy($scope.user);
                     $http.post('api/signin', data)
                         .then(
                             function (res) {
                                 if (res.data.logado) {
                                     $state.go('index');
                                     localStorage.setItem('logado', true);
                                     localStorage.setItem('id', res.data.id);
                                 }
                                 $scope.errors = true;
                             });
                 }
             }

             function go() {
                 if (localStorage.getItem('logado')) {
                     $state.go('index');
                 }
             }

             go();

         }]);
 })();