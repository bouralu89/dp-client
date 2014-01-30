'use strict';

angular.module('HybridApp')
    .controller('ManagetasksCtrl', function($scope, $location, $routeParams, Taskservice, Sharedproperties) {
        var teamId = $routeParams.id;
        $scope.$emit('navbar', {
            'title': 'Tasks',
            'buttons': {
                'back': true,
                'new': true
            }
        });

        $scope.$on('new', function() {
            $location.url('NewTask/' + teamId);
        });

        $scope.edit = function(id) {
            Sharedproperties.setProperty($scope.tasks[id]);
            $location.url('EditTask');
        };

        Taskservice.getCurrentByTeam(teamId, false).then(function(tasks) {
            $scope.tasks = tasks;
        });
        Taskservice.getArchiveByTeam(teamId, true).then(function(tasks) {
            $scope.oldtasks = tasks;
        });
    });
