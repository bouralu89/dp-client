'use strict';

angular.module('HybridApp')
    .service('Navbar', function Navbar($rootScope) {
        return {
            show: function() {
                $rootScope.navbar = true;
            },
            hide: function() {
                $rootScope.navbar = false;
            },
            init: function(title, buttons) {
                $rootScope.$broadcast('navbar', {
                    'title': title,
                    'buttons': buttons
                });
            },
            setTitle: function(title) {
                $rootScope.$broadcast('title', {
                    'title': title
                });
            },
            showLoader: function() {
                $rootScope.$broadcast('title', {
                    'title': null
                });
            }
        }
    });
