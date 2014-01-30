'use strict';

angular.module('HybridApp')
    .controller('NewmessageCtrl', function($scope, Teamservice, Messageservice, localStorageService, Notificationservice) {
        Teamservice.getTeams(false).then(function(teams) {
            $scope.teams = teams;
        });
        $scope.$emit('navbar', {
            'title': 'New message',
            'buttons': {
                'back': true,
                'send': true
            }
        });
        $scope.$on('send', function() {
        	var msg = $scope.msg;
            if ($scope.newMessage.$invalid) {
                Notificationservice.alert('Invalid form!');
                return
            }
            msg.user = localStorageService.get('user')._id;
            msg.date = new Date;
            Messageservice.send(msg).then(function() {
                msg.text = '';
                Notificationservice.alert('Message has been sent.');
            }, function() {
                Notificationservice.error('Error while sending message!');
            });
        });
    });
