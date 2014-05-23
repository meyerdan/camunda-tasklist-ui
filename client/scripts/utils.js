'use strict';
if (typeof define !== 'function') { var define = require('amdefine')(module); }
/* jshint unused: false */
define(['angular'], function(angular) {

  /**
   * Utilities module
   * @memberof cam.tasklist
   */

  /**
   * @type {angularModule}
   */
  var utilsModule = angular.module('cam.tasklist.utils', []);


  /**
   * Provides a method to get globally unique IDs
   * @return {Integer} a globally unique integer
   */
  utilsModule.factory('camUID', function() {
    var _counter = 0;
    return function(prefix) {
      _counter++;
      return _counter;
    };
  });

  return utilsModule;
});
