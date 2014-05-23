'use strict';
if (typeof define !== 'function') { var define = require('amdefine')(module); }
/* jshint unused: false */
define([
           'require', 'angular', 'moment',
           'camunda-tasklist/sessions/data',
           'text!camunda-tasklist/sessions/login.html'
], function(require,   angular,   moment) {

  /**
   * @module cam.tasklist.session
   */

  /**
   * @memberof cam.tasklist
   */

  var sessionModule = angular.module('cam.tasklist.session', [
    'cam.tasklist.session.data',
    'ui.bootstrap',
    'cam.form'
  ]);

  sessionModule.controller('sessionStartModalCtrl', [
          '$modalInstance',
  function($modalInstance) {
    console.warn('Yada yada.....');
  }]);

  sessionModule.controller('sessionStartCtrl', [
          '$modal', '$scope', '$rootScope',
  function($modal,   $scope,   $rootScope) {
    console.warn('Should open a modal window with sessions.');
  }]);

  return sessionModule;
});
