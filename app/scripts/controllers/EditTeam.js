'use strict';

angular.module('HybridApp')
    .controller('EditteamCtrl', function(Navbar, $scope, $http, Teamservice, Cameraservice, Sharedproperties, server, Notificationservice) {

        Navbar.init('Edit team', {
            'back': true,
            'save': true
        });

        $scope.team = Sharedproperties.getProperty();

        $scope.newPassword = '';

        $scope.logoUrl = server + '/team/' + Sharedproperties.getProperty()._id + '/img';

        $scope.changePass = false;

        $scope.device = navigator.camera ? "mobile" : "desktop";

        // for upload from web browser during development
        $scope.uploadFile = function(files) {
            Navbar.showLoader();
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
                Navbar.setTitle('Edit team');
                Notificationservice.alert("Done");
            }).error(function() {
                Navbar.setTitle('Edit team');
                Notificationservice.alert("error");
            });

        };

        $scope.editLogo = function() {
            Navbar.showLoader();
            Cameraservice.getFileURI().then(function(imageURI) {
                Cameraservice.uploadImage('team', $scope.team._id, imageURI).then(function() {
                    $scope.logoUrl = server + '/team/' + $scope.team._id + '/img#' + new Date().getTime();
                    Navbar.setTitle('Edit team');
                    Notificationservice.alert("Done");
                }, function() {
                    Navbar.setTitle('Edit team');
                    Notificationservice.alert("Error");
                });

            }, function() {
                Navbar.setTitle('Edit team');
                Notificationservice.error("There was an error!");
            });
        };

        $scope.$on('save', function() {
            Navbar.showLoader();
            var team = $scope.team;
            if ($scope.changePass) {
                team.password = new Hashes.SHA1().hex($scope.newPassword);
            };

            team.put().then(function(err) {
                Navbar.setTitle('Edit team');
                Notificationservice.alert('Done');
            }, function() {
                Navbar.setTitle('Edit team');
                Notificationservice.error('Error');
            });
        });
    });
