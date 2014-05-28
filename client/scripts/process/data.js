'use strict';
if (typeof define !== 'function') { var define = require('amdefine')(module); }
/* jshint unused: false */
define([
//            'angular', 'jquery', 'hyperagent'
// ], function(angular,   $,        Hyperagent) {
           'angular', 'jquery'
], function(angular,   $) {
  var processDataModule = angular.module('cam.tasklist.process.data', []);




  function CamLegacyProcessData(config) {
    config = config || {};
    if (!config.defer) { throw new Error('defer must be passed in the configuration'); }
    this.defer = config.defer;
  }

  CamLegacyProcessData.prototype.get = function(id, options) {};

  // http://stage.docs.camunda.org/api-references/rest/#process-definition-get-definitions
  CamLegacyProcessData.prototype.query = function(options) {
    var deferred = this.defer();
    options = options || {};

    $.ajax({
      dataType: 'json',
      url: '/camunda/api/engine/engine/default/process-definition'
    })
    .done(function(data) {
      deferred.resolve(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      deferred.reject(textStatus);
    })
    .always(function() {
      deferred.notify('request:complete');
    });

    return deferred.promise;
  };

  // http://docs.camunda.org/latest/api-references/rest/#process-definition-get-definitions-count
  CamLegacyProcessData.prototype.count = function(options) {
    var deferred = this.defer();
    options = options || {};

    $.ajax({
      dataType: 'json',
      url: '/camunda/api/engine/engine/default/process-definition/count'
    })
    .done(function(data) {
      deferred.resolve(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      deferred.reject(textStatus);
    })
    .always(function() {
      deferred.notify('request:complete');
    });

    return deferred.promise;
  };

  // http://stage.docs.camunda.org/api-references/rest/#process-definition-start-process-instance
  CamLegacyProcessData.prototype.start = function(key, options) {
    // /camunda/api/engine/engine/default/process-definition/key/{key}/start
    var deferred = this.defer();
    options = options || {};


    // POST /camunda/api/engine/engine/default/process-definition/d06afcf4-e59f-11e3-89e2-a44e31a96f6c/submit-form HTTP/1.1
    // Host:              localhost:8080
    // Connection:        keep-alive
    // Content-Length:    16
    // Accept:            application/json, text/plain, */*
    // Origin:            http://localhost:8080
    // User-Agent:        Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.137 Safari/537.36
    // Content-Type:      application/json;charset=UTF-8
    // DNT:               1
    // Referer:           http://localhost:8080/camunda/app/tasklist/default/
    // Accept-Encoding:   gzip,deflate,sdch
    // Accept-Language:   en-US,en;q=0.8,de;q=0.6
    // Cookie:            JSESSIONID=1w5ha3nx429xy1cr7d1pebd86w; __ngDebug=true
    //
    //
    //
    // POST /camunda/api/engine/engine/default/process-definition/key/TwoParallelCallActivitiesCallingDifferentProcess/start HTTP/1.1
    // Host:              localhost:8080
    // Connection:        keep-alive
    // Content-Length:    0
    // Accept:            application/json, text/javascript, */*; q=0.01
    // Origin:            http://localhost:8080
    // X-Requested-With:  XMLHttpRequest
    // User-Agent:        Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.137 Safari/537.36
    // Content-Type:      application/json;charset=UTF-8
    // DNT:               1
    // Referer:           http://localhost:8080/camunda/app/tasklist/default/
    // Accept-Encoding:   gzip,deflate,sdch
    // Accept-Language:   en-US,en;q=0.8,de;q=0.6
    // Cookie:            JSESSIONID=1nl5ajioo4acl1jvvxpgxukzuo; __ngDebug=true



    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: '/camunda/api/engine/engine/default/process-definition/key/'+ key +'/start'
    })
    .done(function(data) {
      deferred.resolve(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      deferred.reject(textStatus);
    })
    .always(function() {
      deferred.notify('request:complete');
    });

    return deferred.promise;
  };

  processDataModule.factory('camLegacyProcessData', [
          '$q',
  function($q) {
    return new CamLegacyProcessData({defer: $q.defer});
  }]);




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
      url: '/tasklist/processes/'+ id,
      data: query
    })
    .done(function(data) {
      deferred.resolve(data._embedded.processes);
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
      url: '/tasklist/processes',
      data: query
    })
    .done(function(data) {
      deferred.resolve(data._embedded.processes);
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
    return new CamProcessData({defer: $q.defer});
  }]);



  return processDataModule;
});
