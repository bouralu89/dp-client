'use strict';

angular.module('HybridApp')
    .controller('TeamusersCtrl', function(Navbar, $scope, $routeParams, Teamservice) {

        Navbar.init(null, {
            'back': true
        });

        Teamservice.getTeam($routeParams.id, true).then(function(team) {
            team.getList('users').then(function(users) {
                Navbar.setTitle('Users');
                $scope.users = users;
            });
        });
    });
