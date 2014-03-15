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

        $scope.setView = function(view) {

            $scope.view = view;
            localStorageService.add('homeView', view);

            switch (view) {
                case 'Teams':
                    if ($scope.teams) {
                        break
                    } else {
                        Teamservice.getTeams(true).then(function(teams) {
                            setTitle();
                            $scope.teams = teams;
                        });
                    }
                    break
                case 'News':
                    if ($scope.messages) {
                        break
                    } else {
                        Messageservice.getAll(new Date().toISOString(), true).then(function(msgs) {
                            setTitle();
                            console.log(msgs);
                            $scope.messages = msgs;
                        });
                    }
                    break
                case 'Tasks':
                    if ($scope.tasks) {
                        break
                    } else {
                        Taskservice.getCurrentByUser(true).then(function(tasks) {
                            setTitle();
                            $scope.tasks = tasks;
                        });
                    }
                    break
            }

        };

        $scope.setView($scope.view);

        $scope.$on('refresh', function() {
            removeTitle();
            switch ($scope.view) {
                case 'Teams':
                    Teamservice.getTeams(false).then(function(teams) {
                        setTitle();
                        $scope.teams = teams;
                    }, function() {
                        setTitle();
                    });
                    break
                case 'News':
                    Messageservice.getNew($scope.messages[0].date).then(function(msgs) {
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
        });

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
