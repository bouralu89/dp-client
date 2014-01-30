'use strict';

angular.module('HybridApp')
    .directive('spinner', function() {
        return {
            templateUrl:'views/directives/Spinner.html',
            restrict: 'E',
            scope: {
            	text: "=text"
            }
        };
    });
