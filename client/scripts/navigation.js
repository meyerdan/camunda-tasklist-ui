'use strict';
if (typeof define !== 'function') { var define = require('amdefine')(module); }
/* jshint unused: false */
define(['angular', 'camunda-tasklist/utils', 'text!camunda-tasklist/navigation.html'],
function(angular) {
  var navigationModule = angular.module('cam.tasklist.navigation', [
    require('camunda-tasklist/utils').name,
    'ui.bootstrap',
    'cam.tasklist.user'
  ]);

  navigationModule.directive('camTasklistNavigation', function() {
    return {
      scope: {},
      controller: [
              '$rootScope', '$scope', '$modal', 'camStorage', 'camSettings',
      function($rootScope,   $scope,   $modal,   camStorage,   camSettings) {
        var settings = camSettings(navigationModule);
        $scope.links = settings.links || [];

        $scope.user = $rootScope.user;

        $rootScope.$watch('user', function() {
          $scope.user = $rootScope.user;
        });

        if (!$scope.user) {
          $rootScope.user = camStorage.get('user') || {};
        }


        if (!$rootScope.user.id && !$rootScope.user.userId) {
          $modal.open({
            backdrop:     false,
            keyboard:     false,
            windowClass:  'user-login',
            template:     require('text!camunda-tasklist/user/login.html')
          });
        }
      }],
      template: require('text!camunda-tasklist/navigation.html')
    };
  });

  return navigationModule;
});
