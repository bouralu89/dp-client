'use strict';

angular.module('HybridApp')
    .controller('TaskdetailCtrl', function($scope, $routeParams, Taskservice, $timeout, CordovaService, Notificationservice) {
        var taskID = $routeParams.id;
        $scope.$emit('navbar', {
            'title': null,
            'buttons': {
                'back': true,
                'calendar': true
            }
        });

        Taskservice.get(taskID, true).then(function(task) {
            $scope.$emit('title', {
                    'title': moment(new Date(task.endDate)).fromNow(true)
                });
            $scope.task = task;
        }, function() {
            Notificationservice.alert('Error while getting task...');
        });

        $scope.$on('addToCalendar', function() {
            var task = $scope.task;
            CordovaService.ready.then(function() {
                window.plugins.calendar.createEvent(task.title, null, task.text, new Date(task.created), new Date(task.endDate), function() {
                    Notificationservice.alert('Done.');
                }, function() {
                    Notificationservice.alert('Error.');
                });
            });

        });
    });
