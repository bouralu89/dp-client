'use strict';

angular.module('HybridApp')
    .controller('MainCtrl', function($rootScope, $scope, $location, localStorageService, Auth, server, $window) {

        $rootScope.msgDetail = {};
        $rootScope.showMsgDetail = false;

        $rootScope.spinner = false;
        $rootScope.sb_visibility = false;
        $rootScope.navbar = false;
        $rootScope.spinner = false;

        $rootScope.$on('$routeChangeStart', function(next, current) {
            var auth = localStorageService.get('authdata');
            var path = $location.url();
            if (!auth) {
                $rootScope.navbar = false;
                if (path === "/SignUp" || path === "/Login") {
                    return
                } else {
                    $location.url('Login');
                };
            } else {
                $rootScope.navbar = true;
                if (path === "/SignUp" || path === "/Login") {
                    $location.url('Home');
                }
            };
        });

        $rootScope.openMessage = function(message) {
            $rootScope.msgDetail = message;
            $rootScope.showMsgDetail = true;
        };

        $scope.$on('move', function() {
            $scope.sb_visibility = !$scope.sb_visibility;
        });
        $rootScope.showSB = function() {
            if ($location.path() === "/Login" || $location.path() === "/SignUp") {
                return
            };
            $scope.sb_visibility = true;
        };
        $rootScope.hideSB = function() {
            if ($location.path() === "/Login" || $location.path() === "/SignUp") {
                return
            };
            $scope.sb_visibility = false;
        };
        $rootScope.go_to = function(path) {
            //$scope.animation = 'view_forward';
            $scope.sb_visibility = false;
            $location.url(path);
        };
        $rootScope.go_back = function(path) {
            //$scope.animation = 'view_back';
            $scope.sb_visibility = false;
            $window.history.back();
        };
        $rootScope.logout = function() {
            Auth.clearCredentials();
            localStorageService.remove('user');
            $scope.sb_visibility = false;
            $location.url('Login');
        };
        $rootScope.url = server;
    });
