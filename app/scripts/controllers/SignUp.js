'use strict';

angular.module('HybridApp')
    .controller('SignupCtrl', function($scope, Restangular, Notificationservice, $location) {
        $scope.signup = function(user) {
            console.log('click');
            if ($scope.user.password != $scope.confirmpassword) {
                Notificationservice.alert('Passwords doesn´t match...');
                return
            }

            if ($scope.signupform.$invalid) {
                Notificationservice.alert('Invalid form...');
                return
            }

            var hash = new Hashes.SHA1().hex(user.password).toString();
            user.password = hash;

            Restangular.all('users').post(user).then(function() {
                $scope.user = {};
                $scope.confirmpassword = '';
                Notificationservice.alert('Your profile has been created.');
                $location.url('Login');
            }, function(response) {
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
