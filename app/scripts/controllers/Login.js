'use strict';

angular.module('HybridApp')
    .controller('LoginCtrl', function($rootScope, $scope, $location, localStorageService, Restangular, Userservice, Notificationservice) {

        $rootScope.navbar = false;
        $scope.user = {};

        $scope.login = function() {
            var user = $scope.user;

            if (!user.username && !user.password) {
                Notificationservice.alert("Please fill username and password... !");
                return
            };

            var hash = new Hashes.SHA1().hex(user.password);
            user.password = hash;
            Userservice.login(user).then(function() {
                $rootScope.navbar = true;
                $location.url('Home');
            }, function(err) {
                if (err == undefined) {
                    Notificationservice.error('Error.');
                    $scope.user.password = '';
                    return
                };
                Notificationservice.error(err);
                $scope.user.password = '';
            });
        };
    });
