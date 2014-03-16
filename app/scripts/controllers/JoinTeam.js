'use strict';

angular.module('HybridApp')
    .controller('JointeamCtrl', function(Navbar, $scope, Auth, Restangular, Notificationservice) {

        Navbar.init('Join team', {
            'move': true
        });

        var user_id = Auth.getIdentity()._id;

        $scope.search = function(data) {
            Navbar.showLoader();
            var hash = new Hashes.SHA1().hex(data.password).toString();
            data.password = hash;
            Restangular.one('team').post('search', data).then(function(team) {
                Navbar.init(team.code, {
                    'backIn': true
                });
                $scope.team = team;
                if (team.manager._id == user_id || _.contains(team.users, user_id)) {
                    $scope.allreadyIn = true;
                }
            }, function() {
                Navbar.setTitle('Join team');
                $scope.data.password = '';
                Notificationservice.alert('Wrong code or password...');
            });
        };

        $scope.join = function() {

            var join_data = {
                user_id: user_id,
                team_id: $scope.team._id
            }

            Restangular.one('team').post('join', join_data).then(function() {

                $scope.allreadyIn = true;
                $scope.team.users.push(user_id);

            }, function(data, status) {
                Notificationservice.error('Error while joining team...');
            });
        };

        $scope.$on('back', function() {
            $scope.data.password = undefined;
            $scope.team = undefined;
            $scope.allreadyIn = false;
            Navbar.init('Join team', {
                'move': true
            });
        });

    });
