'use strict';

angular.module('HybridApp')
    .controller('UserdetailCtrl', function($scope, Restangular, $routeParams, server, Contactservice, Notificationservice) {
        var id = $routeParams.id;
        $scope.$emit('navbar', {
            'title': null,
            'buttons': {
                'back': true,
                'contacts': true
            }
        });
        Restangular.one('user', id).get().then(function(user) {
            $scope.$emit('title', {
                'title': user.username
            });
            $scope.user = user;

        }, function(res) {
            alert('Error while getting user...');
        });

        $scope.$on('addToContacts', function() {
            var u = $scope.user;
            Contactservice.findAll().then(function(contacts) {
                if (contacts.length == 0) {
                    Contactservice.create(u);
                } else {
                    var inContacts = false;
                    for (var i = 0; i < contacts.length; i++) {
                        if (contacts[i].emails != undefined) {
                            for (var j = 0; j < contacts[i].emails.length; j++) {
                                if (contacts[i].emails[j].value == u.email) {
                                    inContacts = true;
                                }
                            };
                        };
                        if (contacts[i].phoneNumbers != undefined) {
                            for (var k = 0; k < contacts[i].phoneNumbers.length; k++) {
                                if (contacts[i].phoneNumbers[k].value == u.phoneNumber) {
                                    inContacts = true;
                                }
                            };
                        };
                    };

                    if (!inContacts) {
                        Contactservice.create(u);
                    } else {
                        Notificationservice.alert('User already in contacts.')
                    };
                };
            }, function(e) {
                Notificationservice.error('Some error occured.');
            });
        });
    });
