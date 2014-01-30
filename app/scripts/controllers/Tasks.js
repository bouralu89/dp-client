'use strict';

angular.module('HybridApp')
    .controller('TasksCtrl', function($scope, $location, $routeParams, Taskservice) {

        $scope.tasks = [];
        var status = $routeParams.status;
        var teamId = $routeParams.teamid;

        $scope.$emit('navbar', {
            'title': null,
            'buttons': {
                'back': true
            }
        });

        $scope.detail = function(id) {
            $location.url('Task/' + id);
        }

        switch (status) {
            case 'current':
                Taskservice.getCurrentByTeam(teamId).then(function(tasks) {
                    $scope.$emit('title', {
                        'title': 'Tasks'
                    });
                    $scope.tasks = tasks;
                });
                break
            case 'archive':
                Taskservice.getArchiveByTeam(teamId).then(function(tasks) {
                    $scope.$emit('title', {
                        'title': 'Tasks'
                    });
                    $scope.tasks = tasks;
                });
                break
        }

    });
