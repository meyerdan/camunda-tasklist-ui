'use strict';
if (typeof define !== 'function') { var define = require('amdefine')(module); }
/* jshint unused: false */
define([
           'require', 'angular', 'moment', 'jquery',
           'camunda-tasklist/user/data',
           'text!camunda-tasklist/user/login.html'
], function(require,   angular,   moment,   $) {

  /**
   * @module cam.tasklist.user
   */

  /**
   * @memberof cam.tasklist
   */

  var userModule = angular.module('cam.tasklist.user', [
    'cam.tasklist.user.data',
    'ui.bootstrap',
    'cam.form'
  ]);


  userModule.controller('userLoginCtrl', [
          '$location', '$modal', '$scope', '$rootScope',
  function($location,   $modal,   $scope,   $rootScope) {
    $modal.open({
      windowClass:  'user-login',
      template:     require('text!camunda-tasklist/user/login.html')
    });
  }]);


  userModule.controller('userLoginModalFormCtrl', [
          '$scope', '$rootScope', '$location', 'camStorage',
  function($scope,   $rootScope,   $location,   camStorage) {
    $rootScope.$watch('user', function() {
      $scope.user = $rootScope.user;
    });

    $scope.submitForm = function(htmlForm) {
      return htmlForm.$valid;
    };

    // /camunda/api/admin/auth/user/default/login/cockpit
    $scope.ok = function() {
      $.ajax({
        url: '/tasklist/sessions',
        type: 'POST',
        dataType: 'json',

        data: {
          username: $scope.username,
          password: $scope.password
        }
      })
      .success(function(data) {
        $rootScope.user = $rootScope.user || {};
        $rootScope.user = data;
        $rootScope.user.id = data.userId;

        camStorage.set('user', $rootScope.user);

        $scope.$parent.$parent.$close();

        $location.path('/');
      })
      .error(function() {
        $rootScope.user = {};

        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('userSession');
        }
      });
    };


    $scope.cancel = function() {
      camStorage.remove('user');

      $rootScope.user = {};

      $scope.$parent.$parent.$dismiss();
    };
  }]);


  userModule.controller('userLogoutCtrl', [
          '$location', '$rootScope', 'camStorage',
  function($location,   $rootScope,   camStorage) {
    camStorage.remove('user');

    $rootScope.user = {};

    $location.path('/loggedout');
  }]);

  return userModule;
});
