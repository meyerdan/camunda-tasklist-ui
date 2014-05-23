'use strict';
if (typeof define !== 'function') { var define = require('amdefine')(module); }
/* jshint unused: false */
define([
//            'angular', 'jquery', 'hyperagent'
// ], function(angular,   $,        Hyperagent) {
           'angular', 'jquery'
], function(angular,   $) {
  var processDataModule = angular.module('cam.tasklist.process.data', []);


  function CamProcessData(config) {
    config = config || {};
    if (!config.defer) { throw new Error('defer must be passed in the configuration'); }
    this.defer = config.defer;
  }

  CamProcessData.prototype.get   = function(id, options) {
    var deferred = this.defer();
    options = options || {};
    var process;
    var query = {};
    if (id.id) {
      process = id;
      id = process.id;
    }


    $.ajax({
      url: '/tasklist/processs/'+ id,
      data: query
    })
    .done(function(data) {
      deferred.resolve(data._embedded.processs);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      deferred.reject(textStatus);
    })
    .always(function() {
      deferred.notify('request:complete');
    });

    return deferred.promise;
  };

  CamProcessData.prototype.query = function(options) {
    var deferred = this.defer();
    options = options || {};

    deferred.notify('request:start');

    var query = {};
    if (options.process) {
      query.process = options.process.id || options.process;
    }

    $.ajax({
      url: '/tasklist/processs',
      data: query
    })
    .done(function(data) {
      deferred.resolve(data._embedded.processs);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      deferred.reject(textStatus);
    })
    .always(function() {
      deferred.notify('request:complete');
    });

    return deferred.promise;
  };

  processDataModule.factory('camProcessData', [
          '$q',
  function($q) {
    return new CamProcessData({$q: $q});
  }]);

  return processDataModule;
});
