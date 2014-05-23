'use strict';
if (typeof define !== 'function') { var define = require('amdefine')(module); }
/* jshint unused: false */
define([
//            'angular', 'jquery', 'hyperagent'
// ], function(angular,   $,        Hyperagent) {
           'angular', 'jquery'
], function(angular,   $) {
  var pileDataModule = angular.module('cam.tasklist.pile.data', []);

  var operators = pileDataModule.operators = {
    date: {
      equal:          '=',
      smaller:        '<',
      smallerOrEqual: '<=',
      bigger:         '>',
      biggerOrEqual:  '>='
    }
  };

  var keywords = pileDataModule.keywords = {
    now:    new Date(),
    day:    60 * 60 * 24,
    week:   60 * 60 * 24 * 7,
    month:  60 * 60 * 24 * 7 * 30
  };

  var filters = pileDataModule.filters = {
    due:        {
      operators: operators.date
    },
    followUp:   {
      operators: operators.date
    },
    userId:     {},
    processId:  {}
  };

  function CamPileData(config) {
    config = config || {};
    if (!config.$q) { throw new Error('$q must be passed in the configuration'); }
    this.$q = config.$q;
  }

  CamPileData.prototype.get   = function() {

  };

  CamPileData.prototype.query = function(options) {
    var deferred = this.$q.defer();
    options = options || {};

    deferred.notify('request:start');

    var query = {};
    if (options.user) {
      query.user = options.user.id || options.user;
    }

    $.ajax({
      url: '/tasklist/piles',
      data: query
    })
    .done(function(data) {
      deferred.resolve(data._embedded.piles);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      deferred.reject(textStatus);
    })
    .always(function() {
      deferred.notify('request:complete');
    });

    return deferred.promise;
  };

  pileDataModule.factory('camPileData', [
          '$q',
  function($q) {
    return new CamPileData({$q: $q});
  }]);

  return pileDataModule;
});
