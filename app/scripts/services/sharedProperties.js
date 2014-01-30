'use strict';

angular.module('HybridApp')
    .service('Sharedproperties', function Sharedproperties() {
        var property = null;

        return {
            getProperty: function() {
                return property;
            },
            setProperty: function(value) {
                property = value;
            }
        };
    });