'use strict';

angular.module('HybridApp')
    .controller('ManageusersCtrl', function(Navbar, $scope, Teamservice, $routeParams) {
        
        Navbar.init('Users', {
            'back': true
        });
        
        Teamservice.getTeam($routeParams.id, false).then(function(team) {
            $scope.team = team;
            team.getList('users').then(function(users) {
                $scope.users = users;
            });
        });
    });
