'use strict';

angular.module('HybridApp')
    .filter('format', function() {
        return function(dateString, format) {
            return moment(new Date(dateString)).format(format);
        };
    });
