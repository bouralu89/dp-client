'use strict';

angular.module('HybridApp')
    .controller('MainCtrl', function($scope, $location, Auth, server, $window) {

        $scope.msgDetail = {};
        $scope.showMsgDetail = false;
        $scope.spinner = false;
        $scope.sb_visibility = false;
        $scope.spinner = false;

        $scope.$on('move', function() {
            $scope.sb_visibility = !$scope.sb_visibility;
        });

        $scope.openMessage = function(message) {
            $scope.msgDetail = message;
            $scope.showMsgDetail = true;
        };
        $scope.closeMessage = function(){
            $scope.showMsgDetail = false;
        };

        $scope.showSB = function() {
            if ($location.path() === "/Login" || $location.path() === "/SignUp") {
                return
            };
            $scope.sb_visibility = true;
        };

        $scope.hideSB = function() {
            if ($location.path() === "/Login" || $location.path() === "/SignUp") {
                return
            };
            $scope.sb_visibility = false;
        };

        $scope.go_to = function(path) {
            $scope.sb_visibility = false;
            $location.url(path);
        };

        $scope.go_back = function(path) {
            $scope.sb_visibility = false;
            $window.history.back();
        };

        $scope.logout = function() {
            Auth.clearCredentials();
            Auth.removeIdentity();
            $scope.sb_visibility = false;
            $location.url('Login');
        };
        
        $scope.url = server;
    });
