'use strict';

angular.module('HybridApp')
    .controller('ManagetasksCtrl', function(Navbar, $scope, $location, $routeParams, Taskservice, Sharedproperties) {
        
        Navbar.init('Tasks', {
            'back': true,
            'new': true
        });

        var teamId = $routeParams.id;
        
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
            console.log(tasks);
            $scope.oldtasks = tasks;
        });
    });
