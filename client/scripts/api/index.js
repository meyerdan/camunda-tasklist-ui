'use strict';
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(function() {
  var _cache = {};

  var camAPI = function(name) {
    if (!_cache[name]) {
      throw new Error('the resource "'+ name +'" has not been registered yet');
    }

    // var method, options;

    // if (arguments.length === 3) {
    //   method = arguments[1];
    //   options = arguments[2];

    //   return _cache[config.name][method](options);
    // }
    // else if (arguments.length === 2) {

    // }


    return _cache[name];
  };

  camAPI.register = function(config) {
    config = config || {};

    if (!config.url) {
      throw new Error('the configuration needs a URL');
    }

    if (!config.name) {
      throw new Error('the configuration needs a name');
    }

    if (!!_cache[config.name]) {
      throw new Error('the resource "'+ config.name +'" is already registered');
    }

    var constructor = _cache[config.name] = function(options) {
      this.options = options || {};
    };

    // Model methods


    constructor.query = function() {

    };


    constructor.create = function() {

    };


    var modelMethods = config.modelMethods || {};
    var mm;
    for (mm in modelMethods) {
      if (modelMethods.hasOwnProperty(mm)) {
        constructor[mm] = modelMethods[mm];
      }
    }



    // Model instance methods


    constructor.prototype.fetch = function() {

    };


    constructor.prototype.save = function() {

    };


    constructor.prototype.delete = function() {

    };


    var instanceMethods = config.instanceMethods || {};
    var im;
    for (im in instanceMethods) {
      if (instanceMethods.hasOwnProperty(im)) {
        constructor.prototype[im] = instanceMethods[im];
      }
    }


    return constructor;
  };

  return camAPI;
});
