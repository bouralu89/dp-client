'use strict';

angular.module('HybridApp')
    .controller('SignupCtrl', function($scope, Restangular, Notificationservice, $location) {

        $scope.user = {};

        $scope.signup = function(isValid) {
            var user = $scope.user;
            if (user.password != $scope.confirmpassword) {
                Notificationservice.alert('Passwords doesn´t match...');
                return
            }

            if (!isValid) {
                Notificationservice.alert('Invalid form...');
                return
            }

            Notificationservice.spinner.showText('Please wait...');

            var hash = new Hashes.SHA1().hex(user.password).toString();
            user.password = hash;

            Restangular.all('users').post(user).then(function() {
                Notificationservice.spinner.hide();
                $scope.user = {};
                $scope.confirmpassword = '';
                Notificationservice.alert('Your profile has been created.');
                $location.url('Login');
            }, function(response) {
                Notificationservice.spinner.hide();
                if (response.status == 406) {
                    $scope.user.password = '';
                    $scope.user.username = '';
                    $scope.confirmpassword = '';
                    Notificationservice.error('Username already in use...');
                } else {
                    $scope.user.password = '';
                    $scope.confirmpassword = '';
                    Notificationservice.error('Error while signing up...');
                };
            });
        };


    });
