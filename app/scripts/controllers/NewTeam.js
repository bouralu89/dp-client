'use strict';

angular.module('HybridApp')
    .controller('NewteamCtrl', function($scope, localStorageService, Teamservice, Notificationservice) {

        $scope.$emit('navbar', {
            'title': 'New team',
            'buttons': {
                'move': true
            }
        });

        $scope.create = function(team) {

            if ($scope.newTeam.$invalid) {
                Notificationservice.error('Invalid form...');
                return
            }

            var hash = new Hashes.SHA1().hex(team.password).toString();

            team.password = hash;
            team.manager = localStorageService.get('user')._id;


            Teamservice.create(team).then(function() {
                $scope.team = {};
                Notificationservice.alert('Team has beem created.');
            }, function() {
                Notificationservice.error('Error while creating team!');
            });

        };
    });
