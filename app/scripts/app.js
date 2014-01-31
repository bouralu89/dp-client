'use strict';

angular.module('HybridApp', [
    // <% if(development) { %>
    /*   
    // <% } %>
    'templates-main',
    // <% if(development) { %>
    */
    // <% } %>
    'LocalStorageModule',
    'ngRoute',
    'ngAnimate',
    'restangular',
    'swipe',
    'pasvaz.bindonce'
])
    .config(function($routeProvider) {
        $routeProvider
            .when('/EditTask', {
                templateUrl: 'views/EditTask.html',
                controller: 'EdittaskCtrl'
            })
            .when('/EditTeam', {
                templateUrl: 'views/EditTeam.html',
                controller: 'EditteamCtrl'
            })
            .when('/Home', {
                templateUrl: 'views/Home.html',
                controller: 'HomeCtrl'
            })
            .when('/JoinTeam', {
                templateUrl: 'views/JoinTeam.html',
                controller: 'JointeamCtrl'
            })
            .when('/Login', {
                templateUrl: 'views/Login.html',
                controller: 'LoginCtrl'
            })
            .when('/ManageTasks/:id', {
                templateUrl: 'views/ManageTasks.html',
                controller: 'ManagetasksCtrl'
            })
            .when('/ManageTeam/:id', {
                templateUrl: 'views/ManageTeam.html',
                controller: 'ManageteamCtrl'
            })
            .when('/ManageUsers/:id', {
                templateUrl: 'views/ManageUsers.html',
                controller: 'ManageusersCtrl'
            })
            .when('/NewMessage', {
                templateUrl: 'views/NewMessage.html',
                controller: 'NewmessageCtrl'
            })
            .when('/NewTask/:id', {
                templateUrl: 'views/NewTask.html',
                controller: 'NewtaskCtrl'
            })
            .when('/NewTeam', {
                templateUrl: 'views/NewTeam.html',
                controller: 'NewteamCtrl'
            })
            .when('/SignUp', {
                templateUrl: 'views/SignUp.html',
                controller: 'SignupCtrl'
            })
            .when('/TaskDetail/:id', {
                templateUrl: 'views/TaskDetail.html',
                controller: 'TaskdetailCtrl'
            })
            .when('/Tasks/:teamid', {
                templateUrl: 'views/Tasks.html',
                controller: 'TasksCtrl'
            })
            .when('/Tasks/:teamid/:status', {
                templateUrl: 'views/Tasks.html',
                controller: 'TasksCtrl'
            })
            .when('/TeamDetail/:id', {
                templateUrl: 'views/TeamDetail.html',
                controller: 'TeamdetailCtrl'
            })
            .when('/TeamSelect', {
                templateUrl: 'views/TeamSelect.html',
                controller: 'TeamselectCtrl'
            })
            .when('/TeamUsers/:id', {
                templateUrl: 'views/TeamUsers.html',
                controller: 'TeamusersCtrl'
            })
            .when('/UserDetail/:id', {
                templateUrl: 'views/UserDetail.html',
                controller: 'UserdetailCtrl'

            })
            .when('/TeamList/:who/:id', {
                templateUrl: 'views/TeamList.html',
                controller: 'TeamlistCtrl'
            })
            .when('/edituser/:team/:user', {
                templateUrl: 'views/edituser.html',
                controller: 'EdituserCtrl'
            })
            .when('/EditProfile', {
                templateUrl: 'views/EditProfile.html',
                controller: 'EditprofileCtrl'
            })
            .otherwise({
                redirectTo: '/Login'
            });
    })
    .run(function(Restangular, server, $http, $location, localStorageService, Userservice, Auth) {
        Restangular.setBaseUrl(server);
        Restangular.setRestangularFields({
            id: "_id"
        });
        Restangular.setDefaultHttpFields({
            cache: true
        });

        var authdata = localStorageService.get('authdata');

        if (authdata) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
            Restangular.setDefaultHeaders({
                'Authorization': 'Basic ' + authdata
            });
            Userservice.checkLogin().then(function(){
                $location.url('Home');
            }, function(){
                Auth.clearCredentials();
                $location.url('Login');
            });
        } else {
            $location.url('Login');
        };

    });
