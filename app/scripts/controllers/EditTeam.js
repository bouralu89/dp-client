'use strict';

angular.module('HybridApp')
    .controller('EditteamCtrl', function($scope, $http, localStorageService, Teamservice, Cameraservice, Sharedproperties, server, Notificationservice) {

        $scope.team = Sharedproperties.getProperty();
        $scope.$emit('navbar', {
            'title': 'Edit team',
            'buttons': {
                'back': true,
                'save': true
            }
        });

        $scope.newPassword = '';

        $scope.logoUrl = server + '/team/' + Sharedproperties.getProperty()._id + '/img';

        $scope.changePass = false;

        $scope.device = navigator.camera ? "mobile" : "desktop";

        // for upload from web browser during development
        $scope.uploadFile = function(files) {
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", files[0]);
            console.log(files[0]);

            $http.post(server + '/team/' + $scope.team._id + '/img', fd, {
                withCredentials: false,
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity
            }).success(function() {
                $scope.logoUrl = server + '/team/' + $scope.team._id + '/img#' + new Date().getTime();
                Notificationservice.alert("Done");

            }).error(function() {
                Notificationservice.alert("error");
            });

        };

        $scope.editLogo = function() {
            Cameraservice.getFileURI().then(function(imageURI) {
                Cameraservice.uploadImage('team', $scope.team._id, imageURI).then(function() {
                    $scope.logoUrl = server + '/team/' + $scope.team._id + '/img#' + new Date().getTime();
                    Notificationservice.alert("Done");
                }, function() {
                    Notificationservice.alert("Error");
                });

            }, function() {
                Notificationservice.error("There was an error!");
            });
        };

        $scope.$on('save', function() {
            var team = $scope.team;
            if ($scope.changePass) {
                team.password = new Hashes.SHA1().hex($scope.newPassword);
            };

            team.put().then(function(err) {
                Notificationservice.alert('Done');
            }, function() {
                Notificationservice.error('Error');
            });
        });
    });
