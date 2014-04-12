'use strict';

angular.module('HybridApp')
    .directive('messagedetail', function(server, Rest, Auth) {
        return {
            templateUrl: 'views/directives/MessageDetail.html',
            restrict: 'E',
            scope: {
                message: '=msg'
            },
            link: function postLink(scope, element, attrs) {
                var user = Auth.getIdentity();

                scope.url = server;

                Rest(false).one('messages', scope.message._id).getList('comments').then(function(comments) {
                    scope.message.comments = comments;
                });

                scope.hideMessage = function() {
                    scope.$parent.closeMessage();
                };

                scope.postComment = function(comment) {
                    comment.user = user._id;
                    scope.message.comments.post(comment).then(function() {
                        comment.user = user;
                        comment.date = new Date();
                        scope.message.comments.splice(0, 0, comment);
                        scope.comment = {};
                    });
                };
            }
        };
    });
