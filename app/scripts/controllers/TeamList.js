'use strict';

angular.module('HybridApp')
    .controller('TeamlistCtrl', function(Navbar, $scope, Restangular, $routeParams) {

        Navbar.init(null, {
            'back': true
        });

        switch ($routeParams.who) {
            case 'manager':
                Restangular.one('user', $routeParams.id).all('teams/manager').getList().then(function(teams) {
                    Navbar.setTitle('As manager');
                	$scope.teams = teams;
                });
                break;
            case 'user':
                Restangular.one('user', $routeParams.id).all('teams/user').getList().then(function(teams) {
                    Navbar.setTitle('As user');
                	$scope.teams = teams;
                });
                break;
        };

    });
