'use strict';

angular.module('HybridApp')
    .factory('Rest', function(Restangular) {
        
        return function(cache) {
            if (cache) {
                return Restangular;
            } else {
                return Restangular.withConfig(function(RestangularConfigurer) {
                    RestangularConfigurer.setDefaultHttpFields({
                        cache: false
                    });
                });
            };
        };
    });
