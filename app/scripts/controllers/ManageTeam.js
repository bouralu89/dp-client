'use strict';

angular.module('HybridApp')
    .controller('ManageteamCtrl', function($scope, Auth, Teamservice, $routeParams, Sharedproperties, $location) {
        
        $scope.teamID = $routeParams.id;

        $scope.$emit('navbar', {
            'title': null,
            'buttons': {
                'back': true
            }
        });

        Teamservice.getTeam($scope.teamID).then(function(team) {
            $scope.$emit('title', {
                    'title': team.code
                });
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
