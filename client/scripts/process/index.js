'use strict';
if (typeof define !== 'function') { var define = require('amdefine')(module); }
/* jshint unused: false */
define([
           'require', 'angular', 'moment',
           'camunda-tasklist/process/data',
           'text!camunda-tasklist/process/start.html'
], function(require,   angular,   moment) {

  /**
   * @module cam.tasklist.process
   */

  /**
   * @memberof cam.tasklist
   */

  var processModule = angular.module('cam.tasklist.process', [
    'cam.tasklist.process.data',
    'ui.bootstrap',
    'cam.form'
  ]);

  processModule.controller('processStartModalCtrl', [
          '$modalInstance',
  function($modalInstance) {
    console.warn('Yada yada.....');
  }]);

  processModule.controller('processStartCtrl', [
          '$modal', '$scope', '$rootScope',
  function($modal,   $scope,   $rootScope) {
    console.warn('Should open a modal window with process.');
  }]);

  return processModule;
});
