'use strict';

angular.module('HybridApp')
    .service('Taskservice', function Taskservice($q, Rest, Auth) {

        var userid = Auth.getIdentity()._id;

        return {
            create: function(task) {
                var deferred = $q.defer();
                Rest(false).all('task').post(task).then(function() {
                    deferred.resolve();
                }, function() {
                    deferred.reject();
                });
                return deferred.promise;
            },
            update: function(task) {
                var deferred = $q.defer();

                Rest(false).one('task', task._id).put(task).then(function() {
                    deferred.resolve();
                }, function() {
                    deferred.reject();
                });

                return deferred.promise;
            },
            delete: function(id) {
                var deferred = $q.defer();
                Rest(false).one('task', id).remove().then(function() {
                    deferred.resolve();
                }, function() {
                    deferred.reject();
                });
                return deferred.promise;
            },
            get: function(id, cache) {
                var deferred = $q.defer();
                Rest(cache).one('task', id).get().then(function(task) {
                    deferred.resolve(task);
                }, function() {
                    deferred.reject();
                });
                return deferred.promise;
            },
            getCurrentByTeam: function(id, cache) {
                var deferred = $q.defer();
                Rest(cache).one('team', id).all('tasks').getList().then(function(tasks) {
                    deferred.resolve(tasks);
                }, function() {
                    deferred.reject();
                });
                return deferred.promise;
            },
            getCurrentByUser: function(cache) {
                var deferred = $q.defer();
                Rest(cache).all('task').one('user', userid).getList().then(function(tasks) {
                    deferred.resolve(tasks);
                }, function() {
                    deferred.reject();
                });
                return deferred.promise;
            },
            getArchiveByTeam: function(id, cache) {
                var deferred = $q.defer();
                Rest(cache).all('task').one('team', id).getList('archive').then(function(tasks) {
                    deferred.resolve(tasks);
                }, function() {
                    deferred.reject();
                });
                return deferred.promise;
            }
        }
    });
