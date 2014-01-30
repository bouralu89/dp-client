'use strict';

angular.module('HybridApp')
    .directive('sidebar', function($rootScope) {
        return {
            templateUrl: 'views/directives/SideBar.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                scope.broadcast = function(value) {
                	console.log(value);
                    scope.$emit(value);
                };
            }
        };
    });
