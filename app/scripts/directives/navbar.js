'use strict';

angular.module('HybridApp')
    .directive('navbar', function() {
        return {
            templateUrl: 'views/directives/NavBar.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                scope.buttons = {
                    'move': true,
                    'refresh': true,
                    'newMsg': true
                };

                scope.$on('navbar', function(e, data) {
                    scope.title = data.title;
                    scope.buttons = data.buttons;
                });
                scope.$on('title', function(e, data) {
                    scope.title = data.title;
                });
                scope.broadcast = function(value) {
                    scope.$broadcast(value);
                };
            }
        };
    });
