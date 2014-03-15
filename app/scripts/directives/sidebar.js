'use strict';

angular.module('HybridApp')
    .directive('sidebar', function() {
        return {
            templateUrl: 'views/directives/Sidebar.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                scope.broadcast = function(value) {
                    console.log(value);
                    scope.$emit(value);
                };
            }
        };
    });
