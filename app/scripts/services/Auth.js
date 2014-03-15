'use strict';

angular.module('HybridApp')
    .factory('Auth', function(Base64, $http, localStorageService, Restangular) {

        return {
            isAuthenticated: function() {
                var auth = localStorageService.get('authdata');
                return auth ? true : false;
            },
            setAuthHeader: function() {
                var authdata = localStorageService.get('authdata');
                $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
                Restangular.setDefaultHeaders({
                    'Authorization': 'Basic ' + authdata
                });
            },
            setCredentials: function(username, password) {
                var encoded = Base64.encode(username + ':' + password);
                localStorageService.add('authdata', encoded);
            },
            clearCredentials: function() {
                document.execCommand("ClearAuthenticationCache");
                localStorageService.remove('authdata');
                $http.defaults.headers.common.Authorization = 'Basic ';
                Restangular.setDefaultHeaders({
                    'Authorization': 'Basic '
                });
            },
            storeIdentity: function(user) {
                localStorageService.add('user', user);
            },
            removeIdentity: function(){
                localStorageService.remove('user');
            },
            getIdentity: function() {
                return localStorageService.get('user');
            }
        };
    });
