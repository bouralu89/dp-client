'use strict';

angular.module('HybridApp')
    .controller('UserdetailCtrl', function(Navbar, $scope, Restangular, $routeParams, server, Contactservice, Notificationservice) {
        
        Navbar.init(null, {
            'back': true,
                'contacts': true
        });

        var id = $routeParams.id;

        Restangular.one('user', id).get().then(function(user) {
            Navbar.setTitle(user.username);
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
