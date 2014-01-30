'use strict';

angular.module('HybridApp')
    .controller('EdittaskCtrl', function($scope, $window, Sharedproperties, Taskservice, Notificationservice) {
        $scope.task = Sharedproperties.getProperty();
        $scope.task.endDate = moment($scope.task.endDate).format("DD.MM.YYYY HH:mm");
        $scope.$emit('navbar', {
            'title': 'Edit task',
            'buttons': {
                'back': true,
                'delete': true,
                'save': true
            }
        });
        $scope.$on('save', function() {
            var task = $scope.task;
            task.endDate = moment(task.endDate, "DD.MM.YYYY hh:mm");
            task.put().then(function() {
                task.endDate = moment($scope.task.endDate).format("DD.MM.YYYY HH:mm");
                Notificationservice.alert('Task has been updated.');
            }, function() {
                task.endDate = moment($scope.task.endDate).format("DD.MM.YYYY HH:mm");
                Notificationservice.error('Error while updating task.');
            });
        });
        $scope.$on('delete', function() {
            var task = $scope.task;
            Notificationservice.confirm('Are you sure?', function(num) {
                if (num == 1) {
                    task.remove().then(function() {
                        Notificationservice.alert('Task has been deleted.');
                        $window.history.back();
                    }, function() {
                        Notificationservice.error('Error while deleting task.');
                    });
                };
            });
        });
    });
