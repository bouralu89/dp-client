'use strict';

angular.module('HybridApp')
    .controller('NewtaskCtrl', function(Navbar, $scope, $routeParams, Auth, Taskservice, Notificationservice) {

        Navbar.init('New task', {
            'back': true,
            'done': true
        });

        $scope.task = {};

        $scope.$on('done', function() {
            var task = $scope.task;
            task.team = $routeParams.id;
            task.creator = Auth.getIdentity()._id;
            var date = task.endDate;
            task.endDate = moment(task.endDate, "DD.MM.YYYY hh:mm");
            if (task.endDate < new Date) {
                Notificationservice.alert('Wrong date.');
                return
            };
            Taskservice.create(task).then(function(err) {
                task.endDate = moment($scope.task.endDate).format("DD.MM.YYYY HH:mm");
                Notificationservice.alert('Done');
            }, function() {
                task.endDate = moment($scope.task.endDate).format("DD.MM.YYYY HH:mm");
                Notificationservice.alert('Error');
            });
        });
    });
