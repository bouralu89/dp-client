'use strict';

angular.module('HybridApp')
  .filter('fromNow', function () {
    return function (dateString) {
      return moment(new Date(dateString)).fromNow(true);
    };
  });
