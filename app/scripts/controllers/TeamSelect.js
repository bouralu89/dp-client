'use strict';

angular.module('HybridApp')
    .controller('TeamselectCtrl', function(Navbar, $scope, Teamservice) {
        
        Navbar.init('Select team', {
            'move': true
        });

        Teamservice.getMyTeams().then(function(teams) {
            $scope.teams = teams;
        });
    });
