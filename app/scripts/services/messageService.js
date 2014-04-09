'use strict';

angular.module('HybridApp')
    .service('Messageservice', function Messageservice($q, Rest, Auth) {

        var userid = Auth.getIdentity()._id;

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
            getNew: function(from) {
                var deferred = $q.defer();
                Rest(false).one('user', userid).all('newmessages').getList({from: from}).then(function(data) {
                    deferred.resolve(data);
                }, function() {
                    deferred.reject();
                });
                return deferred.promise;
            },
            getMore: function(from) {
                var deferred = $q.defer();
                Rest(false).one('user', userid).all('messages').getList({from: from}).then(function(data) {
                    deferred.resolve(data);
                }, function() {
                    deferred.reject();
                });
                return deferred.promise;
            }
        };
    });
