'use strict';

angular.module('HybridApp')
    .service('Contactservice', function Contactservice($q, Notificationservice, CordovaService) {
        return {
            findAll: function() {
                var deferred = $q.defer();
                CordovaService.ready.then(function() {
                    var obj = new ContactFindOptions();
                    obj.multiple = true;

                    navigator.contacts.find(
                        ["displayName", "name", "phoneNumbers", "emails", "urls", "note"],
                        function(contacts) {
                            deferred.resolve(contacts);
                        },
                        function(e) {
                            deferred.reject(e.code);
                        },
                        obj);


                });
                return deferred.promise;
            },

            create: function(user) {
                CordovaService.ready.then(function() {
                    try {
                        var contact = navigator.contacts.create({
                            "displayName": user.firstName + ' ' + user.lastName
                        });
                        var contactName = {
                            formatted: user.firstName + ' ' + user.lastName,
                            familyName: user.lastName,
                            givenName: user.firstName,
                            middleName: ""
                        };

                        contact.name = contactName;

                        var phoneNumbers = [1];
                        phoneNumbers[0] = new ContactField('work', user.phoneNumber, true);
                        contact.phoneNumbers = phoneNumbers;

                        var emails = [1];
                        emails[0] = new ContactField('work', user.email, true);
                        contact.emails = emails;

                        contact.save(
                            function() {
                                Notificationservice.alert("Contact saved.");
                            },
                            function(e) {
                                if (e.code == 0) {
                                    Notificationservice.alert('Contact saved.');
                                } else {
                                    Notificationservice.error('Some error occured.');
                                };
                            }
                        );
                    } catch (e) {
                        Notificationservice.alert("Contact save failed.");
                    }
                });

            }
        }
    });
