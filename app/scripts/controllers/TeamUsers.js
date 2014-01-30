'use strict';

angular.module('HybridApp')
    .controller('TeamusersCtrl', function($scope, $routeParams, Teamservice) {
        $scope.$emit('navbar', {
            'title': null,
            'buttons': {
                'back': true
            }
        });
        Teamservice.getTeam($routeParams.id, true).then(function(team) {
            team.getList('users').then(function(users) {
                $scope.$emit('title', {
                    'title': 'Users'
                });
                $scope.users = users;
            });
        });
    });
