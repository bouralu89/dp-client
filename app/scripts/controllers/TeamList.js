'use strict';

angular.module('HybridApp')
    .controller('TeamlistCtrl', function($scope, Restangular, $routeParams) {

        switch ($routeParams.who) {
            case 'manager':
                Restangular.one('user', $routeParams.id).all('teams/manager').getList().then(function(teams) {
                	$scope.teams = teams;
                });
                break;
            case 'user':
                Restangular.one('user', $routeParams.id).all('teams/user').getList().then(function(teams) {
                	$scope.teams = teams;
                });
                break;
        };

    });
