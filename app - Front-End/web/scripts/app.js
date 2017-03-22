(function () {
    'use strict';
    angular
        .module('fotr', ['ui.router', 'ui.bootstrap'])
        .config(['$urlRouterProvider', function ($urlRouterProvider) {
            $urlRouterProvider.otherwise("/index");
        }]);
})();