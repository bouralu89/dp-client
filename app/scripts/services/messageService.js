'use strict';

angular.module('HybridApp')
    .service('Messageservice', function Messageservice($q, Rest, localStorageService) {

        var userid = localStorageService.get('user')._id;

        return {
            send: function(msg) {
                var deferred = $q.defer();
                Rest(false).all('messages').post(msg).then(function() {
                    deferred.resolve();
                }, function() {
                    deferred.reject();
                });
                return deferred.promise;
            },
            getAll: function(from, cache) {
                var deferred = $q.defer();
                Rest(cache).one('user', userid).all('messages').getList({from: from}).then(function(data) {
                    deferred.resolve(data);
                }, function() {
                    deferred.reject();
                });
                return deferred.promise;
            },
            getNew: function(date) {
                var deferred = $q.defer();
                Rest(false).one('user', userid).all('newmessages').getList({date: date}).then(function(data) {
                    deferred.resolve(data);
                }, function() {
                    deferred.reject();
                });
                return deferred.promise;
            }
        };
    });
