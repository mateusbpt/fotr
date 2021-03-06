 (function () {
     'use strict';
     angular.module('fotr')
         .config(['$stateProvider', function ($stateProvider) {
             $stateProvider
                 .state('register', {
                     url: '/register',
                     views: {
                         'navbar@': {
                             templateUrl: 'views/navbar_form.html',
                             controller: 'RegisterController'
                         },
                         'content@': {
                             templateUrl: 'views/register.html',
                             controller: 'RegisterController'
                         }
                     }
                 })
         }])
         .controller('RegisterController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
             $scope.new = {};
             $scope.errors = false;

             function go() {
                 if (localStorage.getItem('logado')) {
                     $state.go('index');
                 }
             }

             go();
         }]);
 })();