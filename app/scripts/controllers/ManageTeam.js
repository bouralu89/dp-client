'use strict';

angular.module('HybridApp')
    .controller('ManageteamCtrl', function(Navbar, $scope, Teamservice, $routeParams, Sharedproperties, $location) {

        Navbar.init(null, {
            'back': true
        });

        $scope.teamID = $routeParams.id;

        Teamservice.getTeam($scope.teamID).then(function(team) {

            Navbar.setTitle(team.code);

            $scope.team = team;
            Sharedproperties.setProperty(team);
        }, function() {
            alert('Error while geting team...');
        });

        $scope.manageUsers = function() {
            $location.url('/ManageUsers/' + $scope.team._id);
        }
        $scope.manageTasks = function() {
            $location.url('/ManageTasks/' + $scope.team._id);
        }
    });
