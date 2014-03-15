'use strict';

angular.module('HybridApp')
    .directive('background', function() {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                var url = attrs.background;
                element[0].style.backgroundImage = 'url(' + url + ')';
            }
        };
    });
