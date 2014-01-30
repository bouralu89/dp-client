'use strict';

angular.module('HybridApp')
    .controller('TeamselectCtrl', function($scope, Teamservice) {

        $scope.$emit('navbar', {
            'title': 'Select team',
            'buttons': {
                'move': true
            }
        });
        Teamservice.getMyTeams().then(function(teams) {
            $scope.teams = teams;
        });
    });
