'use strict';
if (typeof define !== 'function') { var define = require('amdefine')(module); }
/* jshint unused: false */
define('camunda-tasklist', [
           'camunda-tasklist/rjsconf',
           'camunda-tasklist/utils'
], function(rjsConf, utils) {
  /**
   * @namespace cam
   */

  /**
   * @module cam.tasklist
   */

  var tasklistApp;

  var appModules = rjsConf.shim['camunda-tasklist'];

  var deps = [
    'angular',
    'text!tasklist.html'
  ].concat(appModules);

  // converts AMD paths to angular module names
  // "camunda-tasklist/pile" will be "cam.tasklist.pile"
  function rj2ngNames(names) {
    var name, translated = [];
    for (var n = 0; n < names.length; n++) {
      name = (require(names[n]) || {}).name;
      if (name) translated.push(name);
    }
    return translated;
  }


  function loaded() {
    var angular = require('angular');
    var $ = angular.element;

    var ngDeps = rj2ngNames(appModules).concat([
      'ngRoute'
    ]);

    tasklistApp = angular.module('cam.tasklist', ngDeps);

    tasklistApp.controller('TasklistAppCtrl', [
            '$rootScope',
    function($rootScope) {
      $rootScope.batchActions = {
        selected: []
      };

      $rootScope.focusedPile = {};

      $rootScope.focusedTask = {};

      $rootScope.$on('tasklist.pile.focused', function() {
        $('.task-board').removeClass('pile-edit');
        if ($rootScope.focusedPile) {
          $('.controls .focused-pile h5').text($rootScope.focusedPile.name || '&nbsp;');
        }
      });

      $rootScope.user = {
        id:   'max',
        name: 'Max Mustermann'
      };
    }]);


    tasklistApp.config([
            '$routeProvider', '$locationProvider',
    function($routeProvider,   $locationProvider) {
      var tasklistTemplate = require('text!tasklist.html');

      $routeProvider
        .when('/process', {
          template: tasklistTemplate,
          controller: 'processStartCtrl'
        })


        .when('/piles/new', {
          template: tasklistTemplate,
          controller: 'pileNewCtrl'
        })


        .when('/', {
          template: tasklistTemplate,
          controller: 'pilesCtrl'
        })


        .when('/login', {
          template: tasklistTemplate,
          controller: [function() {
            console.warn('Present a login form...');
          }]
        })

        .otherwise({
          redirectTo: '/'
        });
    }]);

    $(document).ready(function() {
      angular.bootstrap(document, ['cam.tasklist']);
    });
  }


  // configure require.js
  require.config(rjsConf);

  // and load the dependencies
  require(deps, loaded);

  return {
    deps:       deps,
    appModules: appModules,
    loaded:     loaded,
    rj2ngNames: rj2ngNames,
    rjsConf:    rjsConf
  };
});
