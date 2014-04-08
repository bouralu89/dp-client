'use strict';

angular.module('HybridApp')
    .controller('HomeCtrl', function(Restangular, $scope, Auth, localStorageService, Navbar, Taskservice, Teamservice, Messageservice) {

        Navbar.init(null, {
            'move': true,
            'refresh': true,
            'newMsg': true
        });

        var user = Auth.getIdentity();
        var id = user._id;

        function setTitle() {
            Navbar.setTitle(user.first_name + ' ' + user.surname);
        }

        function removeTitle() {
            Navbar.showLoader();
        }

        $scope.view = localStorageService.get('homeView') || 'News';
        $scope.views = [{
            'view': 'News',
            'icon': 'comments'
        }, {
            'view': 'Teams',
            'icon': 'group'
        }, {
            'view': 'Tasks',
            'icon': 'clipboard'
        }];
        $scope.loading = false;
        $scope.allMessages = false;
        $scope.messages = [];

        $scope.setView = function(view) {
            $scope.view = view;
            localStorageService.add('homeView', view);

            resolveData(view);
        };
        $scope.setView($scope.view);

        $scope.$on('refresh', function() {
            removeTitle();
            resolveData($scope.view);
        });

        function resolveData(view) {
            switch (view) {
                case 'Teams':
                    Teamservice.getTeams(false).then(function(teams) {
                        setTitle();
                        console.log(teams);
                        $scope.teams = teams;
                    }, function() {
                        setTitle();
                    });
                    break
                case 'News':
                    var date = $scope.messages.length > 0 ? $scope.messages[0].date : moment().format();
                    Messageservice.getNew(date).then(function(msgs) {
                        setTitle();
                        if (msgs.length != 0) {
                            $scope.messages.unshift(msgs);
                        }
                    }, function() {
                        setTitle();
                    });
                    break
                case 'Tasks':
                    Taskservice.getCurrentByUser(false).then(function(tasks) {
                        setTitle();
                        $scope.tasks = tasks;
                    }, function() {
                        setTitle();
                    });
                    break
            }
        };

        $scope.isSelected = function(view) {
            return $scope.view === view;
        };

        $scope.loadMore = function() {
            if ($scope.loading) {
                return
            };
            $scope.loading = !$scope.loading;

            Messageservice.getAll($scope.messages[$scope.messages.length - 1].date, false).then(function(msgs) {
                if (msgs.length == 5) {
                    _.forEach(msgs, function(msg) {
                        $scope.messages.push(msg);
                    });
                } else if (msgs.length < 5 && msgs.length >= 0) {
                    _.forEach(msgs, function(msg) {
                        $scope.messages.push(msg);
                    });
                    $scope.allMessages = true;
                } else {
                    $scope.allMessages = true;
                }


                $scope.loading = !$scope.loading;
            });

        };

    });
