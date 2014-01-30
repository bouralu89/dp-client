'use strict';

angular.module('HybridApp')
    .controller('EditprofileCtrl', function($scope, $http, localStorageService, Userservice, Cameraservice, server, Notificationservice) {

        $scope.newPassword = '';
        $scope.user = localStorageService.get('user');

        $scope.$emit('navbar', {
            'title': $scope.user.username,
            'buttons': {
                'move': true,
                'save': true
            }
        });

        $scope.logoUrl = server + '/user/' + $scope.user._id + '/img';
        $scope.changePass = false;
        $scope.device = navigator.camera ? "mobile" : "desktop";


        // for upload from web browser during development
        $scope.uploadFile = function(files) {
            $scope.$emit('title', {
                'title': null
            });
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", files[0]);
            console.log(files[0]);
            $http.post(server + '/user/' + $scope.user._id + '/img', fd, {
                withCredentials: false,
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity
            }).success(function() {
                 $scope.$emit('title', {
                    'title': $scope.user.username
                });
                $scope.logoUrl = server + '/user/' + $scope.user._id + '/img#' + new Date().getTime();
                Notificationservice.alert("Done");
            }).error(function() {
                 $scope.$emit('title', {
                    'title': $scope.user.username
                });
                Notificationservice.alert("error");
            });

        };

        // for upload in hybrid app
        $scope.editLogo = function() {
            Cameraservice.getFileURI().then(function(imageURI) {

                Cameraservice.uploadImage('user', $scope.user._id, imageURI).then(function() {
                    $scope.logoUrl = server + '/user/' + $scope.user._id + '/img#' + new Date().getTime();
                    Notificationservice.alert("Done");
                }, function() {
                    Notificationservice.alert("Error");
                });

            }, function() {
                Notificationservice.error("There was an error!");
            });
        };

        $scope.$on('save', function() {
            var user = $scope.user;

            if ($scope.changePass) {
                user.password = new Hashes.SHA1().hex($scope.newPassword);
            };

            Userservice.update(user).then(function() {
                Notificationservice.alert('Done');
            }, function() {
                Notificationservice.error('Error');
            });
        });
    });
