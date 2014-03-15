'use strict';

angular.module('HybridApp')
    .controller('NewteamCtrl', function(Navbar, $scope, Auth, Teamservice, Notificationservice) {

        Navbar.init('New team', {
            'move': true
        });

        $scope.create = function(team) {

            if ($scope.newTeam.$invalid) {
                Notificationservice.error('Invalid form...');
                return
            }

            var hash = new Hashes.SHA1().hex(team.password).toString();

            team.password = hash;
            team.manager = Auth.getIdentity()._id;


            Teamservice.create(team).then(function() {
                $scope.team = {};
                Notificationservice.alert('Team has beem created.');
            }, function() {
                Notificationservice.error('Error while creating team!');
            });

        };
    });
