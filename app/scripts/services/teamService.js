'use strict';

angular.module('HybridApp')
    .service('Teamservice', function Teamservice($q, Rest, Auth) {

        var userid = Auth.getIdentity()._id;

        return {
            removeUser: function(user, team) {
                var deferred = $q.defer();
                Rest(false).one('team', team).one('users', user).remove().then(function() {
                    deferred.resolve();
                }, function() {
                    deferred.reject();
                });
                return deferred.promise;
            },
            getTeam: function(id, cache) {
                var deferred = $q.defer();

                Rest(cache).one('team', id).get().then(function(team) {
                    deferred.resolve(team);
                }, function() {
                    deferred.reject();
                });

                return deferred.promise;
            },
            getTeams: function(cache) {
                var deferred = $q.defer();

                Rest(cache).all('team').one('user', userid).getList().then(function(data) {
                    deferred.resolve(data);
                }, function() {
                    deferred.reject();
                });

                return deferred.promise;

            },
            getMyTeams: function(cache) {
                var deferred = $q.defer();

                Rest(cache).all('team').one('manager', userid).getList().then(function(data) {
                    deferred.resolve(data);
                }, function() {
                    deferred.reject();
                });

                return deferred.promise;
            },
            create: function(team){
                var deferred = $q.defer();

                Rest(false).all('team').post(team).then(function() {
                    deferred.resolve();
                }, function() {
                    deferred.reject();
                });

                return deferred.promise;
            },
            update: function(id, data) {
                var deferred = $q.defer();

                Rest(false).one('team', id).put(data).then(function() {
                    deferred.resolve();
                }, function() {
                    deferred.reject();
                });

                return deferred.promise;
            },
            updateLogo: function(id, data) {
                var deferred = $q.defer();

                Rest(false).one('team', id).customPOST(data, 'img').then(function() {
                    deferred.resolve();
                }, function() {
                    deferred.reject();
                });

                return deferred.promise;
            }
        };
    });
