'use strict';

angular.module('HybridApp')
    .controller('TaskdetailCtrl', function(Navbar, $scope, $routeParams, Taskservice, CordovaService, Notificationservice) {

        Navbar.init(null, {
            'back': true,
            'calendar': true
        });

        var taskID = $routeParams.id;

        Taskservice.get(taskID, true).then(function(task) {
            Navbar.setTitle(moment(new Date(task.endDate)).fromNow(true));
            $scope.teamID = task.team._id;
            $scope.task = task;
        }, function() {
            Notificationservice.alert('Error while getting task...');
        });

        $scope.$on('addToCalendar', function() {
            var task = $scope.task;
            CordovaService.ready.then(function() {
                window.plugins.calendar.createEvent(task.title, task.team.name, task.text, task.text, new Date(task.created), new Date(task.endDate), function() {
                    Notificationservice.alert('Done.');
                }, function() {
                    Notificationservice.alert('Error.');
                });
            });

        });
    });
