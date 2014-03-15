'use strict';

angular.module('HybridApp')
    .service('Userservice', function Userservice($q, Rest, Auth) {
        return {
            updateLogo: function(id, data) {
                var deferred = $q.defer();

                Rest(false).one('user', id).customPOST(data, 'img').then(function() {
                    deferred.resolve();
                }, function() {
                    deferred.reject();
                });

                return deferred.promise;
            },
            update: function(user) {
                var deferred = $q.defer();

                Rest(false).one('user', user._id).customPUT(user).then(function() {
                    if (user.password) {

                        Auth.setCredentials(user.username, user.password);
                    };
                    Auth.storeIdentity(user);
                    deferred.resolve();
                }, function() {
                    deferred.reject();
                });

                return deferred.promise;
            },
            login: function(user) {
                var deferred = $q.defer();

                Rest(false).all('login').post(user).then(function(res) {
                    Auth.setCredentials(user.username, user.password);
                    Auth.setAuthHeader();
                    Auth.storeIdentity(res);
                    deferred.resolve();
                }, function(res) {
                	deferred.reject(res.data.error);
                });

                return deferred.promise;
            },
            checkLogin: function(){
            	var deferred = $q.defer();

                Rest(false).all('login').getList().then(function(res) {
                    Auth.storeIdentity(res);
                    deferred.resolve();
                }, function() {
                	deferred.reject();
                });

                return deferred.promise;
            }
        }
    });
