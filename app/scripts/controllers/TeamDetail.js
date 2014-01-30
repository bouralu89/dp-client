'use strict';

angular.module('HybridApp')
    .controller('TeamdetailCtrl', function($scope, $timeout, $routeParams, Teamservice, localStorageService) {

        var teamId = $scope.teamId = $routeParams.id;

        $scope.$emit('navbar', {
            'title': null,
            'buttons': {
                'back': true,
                'menu': true
            }
        });

        $scope.topmenu = false;
        $scope.user = localStorageService.get('user');
        $scope.showDetail = false;

        Teamservice.getTeam(teamId, true).then(function(team) {
            $scope.team = team;

            team.getList('messages').then(function(msgs) {
                $scope.$emit('title', {
                    'title': team.code
                });
                $scope.msgs = msgs;
            });
        });

        $scope.$on('menu', function() {
            $scope.topmenu = !$scope.topmenu;
        });


    });
