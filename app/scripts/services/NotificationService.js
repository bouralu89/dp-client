'use strict';

angular.module('HybridApp')
    .service('Notificationservice', function Notificationservice($rootScope) {
        return {
            alert: function(text) {
                if (navigator.notification) {
                    navigator.notification.alert(
                        text, // message
                        null, // callback
                        'Done', // title
                        'OK' // buttonName
                    );
                } else {
                    alert(text);
                };
            },
            error: function(text) {
                if (navigator.notification) {
                    navigator.notification.alert(
                        text, // message
                        null, // callback
                        'Error', // title
                        'OK' // buttonName
                    );
                } else {
                    alert(text);
                };
            },
            confirm: function(text, cb) {
                if (navigator.notification) {
                    navigator.notification.confirm(
                        text,
                        cb
                    );
                } else {
                    if (confirm(text)) {
                        cb(1);
                    };
                };
            },
            spinner: {
                show: function() {
                    $rootScope.spinner = true;
                },
                hide: function() {
                    $rootScope.spinner = false;
                }
            }
        }
    });
