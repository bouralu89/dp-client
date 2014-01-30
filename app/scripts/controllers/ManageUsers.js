'use strict';

angular.module('HybridApp')
  .controller('ManageusersCtrl', function ($scope, Teamservice, $routeParams) {
	$scope.$emit('navbar', {
            'title': 'Users',
            'buttons': {
                'back': true
            }
        });
	Teamservice.getTeam($routeParams.id, false).then(function(team){	
		$scope.team = team;	
		team.getList('users').then(function(users){
			$scope.users = users;
		});
	});	
});