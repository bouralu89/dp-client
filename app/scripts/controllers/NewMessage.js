'use strict';

angular.module('HybridApp')
    .controller('NewmessageCtrl', function(Navbar, $scope, Teamservice, Messageservice, Auth, Notificationservice) {
        
        Navbar.init('New message', {
            'back': true,
                'send': true
        });

        Teamservice.getTeams(false).then(function(teams) {
            $scope.teams = teams;
        });

        $scope.$on('send', function() {
        	var msg = $scope.msg;
            if ($scope.newMessage.$invalid) {
                Notificationservice.alert('Invalid form!');
                return
            }
            msg.user = Auth.getIdentity()._id;
            msg.date = new Date;
            Messageservice.send(msg).then(function() {
                msg.text = '';
                Notificationservice.alert('Message has been sent.');
            }, function() {
                Notificationservice.error('Error while sending message!');
            });
        });
    });
