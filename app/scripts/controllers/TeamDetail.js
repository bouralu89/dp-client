'use strict';

angular.module('HybridApp')
    .controller('TeamdetailCtrl', function(Navbar, $scope, $routeParams, Teamservice, Auth) {

        Navbar.init(null, {
            'back': true,
            'menu': true
        });

        var teamId = $scope.teamId = $routeParams.id;

        $scope.topmenu = false;
        $scope.user = Auth.getIdentity();
        $scope.showDetail = false;

        Teamservice.getTeam(teamId, true).then(function(team) {
            $scope.team = team;

            team.getList('messages').then(function(msgs) {
                Navbar.setTitle(team.code);
                $scope.msgs = msgs;
            });
        });

        $scope.$on('menu', function() {
            $scope.topmenu = !$scope.topmenu;
        });


    });
