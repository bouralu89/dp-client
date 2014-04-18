'use strict';

angular.module('HybridApp')
    .controller('EdittaskCtrl', function(Navbar, $scope, $window, Sharedproperties, Notificationservice, Restangular) {

        Navbar.init('Edit task', {
            'back': true,
            'delete': true,
            'save': true
        });

        $scope.task = Sharedproperties.getProperty();
        $scope.task.endDate = moment($scope.task.endDate).format("DD.MM.YYYY HH:mm");

        $scope.$on('save', function() {
            var task = Restangular.copy($scope.task);
            task.endDate = moment(new Date($scope.task.endDate).toISOString(), 'YYYY-DD-MM HH:mm');
            task.put().then(function() {
                $scope.task.endDate = moment(task.endDate).format("DD.MM.YYYY HH:mm");
                Notificationservice.alert('Task has been updated.');
            }, function() {
                $scope.task.endDate = moment(task.endDate).format("DD.MM.YYYY HH:mm");
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
