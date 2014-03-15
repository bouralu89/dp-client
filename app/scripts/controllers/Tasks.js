'use strict';

angular.module('HybridApp')
    .controller('TasksCtrl', function(Navbar, $scope, $location, $routeParams, Taskservice) {

        Navbar.init(null, {
            'back': true
        });

        $scope.tasks = [];
        var status = $routeParams.status;
        var teamId = $routeParams.teamid;

        $scope.detail = function(id) {
            $location.url('Task/' + id);
        }

        switch (status) {
            case 'current':
                Taskservice.getCurrentByTeam(teamId).then(function(tasks) {
                    Navbar.setTitle('Current tasks');
                    $scope.tasks = tasks;
                });
                break
            case 'archive':
                Taskservice.getArchiveByTeam(teamId).then(function(tasks) {
                    Navbar.setTitle('Archive tasks');
                    $scope.tasks = tasks;
                });
                break
        }

    });
