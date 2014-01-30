'use strict';

angular.module('HybridApp')
    .factory('Auth', function(Base64, $http, localStorageService, Restangular) {
        
        return {
            setAuthHeader: function(username, password) {
                var encoded = Base64.encode(username + ':' + password);
                $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
                Restangular.setDefaultHeaders({'Authorization': 'Basic ' + encoded });
            },
            setCredentials: function(username, password) {
                var encoded = Base64.encode(username + ':' + password);
                $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
                Restangular.setDefaultHeaders({'Authorization': 'Basic ' + encoded });
                localStorageService.add('authdata', encoded);
            },
            clearCredentials: function() {
                document.execCommand("ClearAuthenticationCache");
                localStorageService.remove('authdata');
                $http.defaults.headers.common.Authorization = 'Basic ';
                Restangular.setDefaultHeaders({'Authorization': 'Basic '});
            }
        };
    });
