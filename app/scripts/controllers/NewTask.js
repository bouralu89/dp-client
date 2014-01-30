'use strict';

angular.module('HybridApp')
    .controller('NewtaskCtrl', function($scope, $routeParams, localStorageService, Taskservice, Notificationservice) {

        $scope.task = {};
        $scope.$emit('navbar', {
            'title': 'New task',
            'buttons': {
                'back': true,
                'done': true
            }
        });
        $scope.$on('done', function() {
            var task = $scope.task;
            task.team = $routeParams.id;
            task.creator = localStorageService.get('user')._id;
            var date = task.endDate;
            task.endDate = moment(task.endDate, "DD.MM.YYYY hh:mm");
            if (task.endDate < new Date) {
                Notificationservice.alert('Wrong date.');
                return
            };
            Taskservice.createTask(task).then(function(err) {
                task.endDate = moment($scope.task.endDate).format("DD.MM.YYYY HH:mm");
                Notificationservice.alert('Done');
            }, function() {
                task.endDate = moment($scope.task.endDate).format("DD.MM.YYYY HH:mm");
                Notificationservice.alert('Error');
            });
        });
    });
