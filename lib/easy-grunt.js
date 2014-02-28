/*
 * easy-lib.js
 *
 * Copyright (c) 2014 First Opinion
 */

'use strict';


// ------------------------------------------------------------------------------
// Dependencies 
// ------------------------------------------------------------------------------

// Third Party
var _ = require('underscore');

// Lib
var utils = require('./utils');


// ------------------------------------------------------------------------------
// Module
// ------------------------------------------------------------------------------

var easygrunt = module.exports = {};


// ------------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------------

//
// Gets rid of boiler. Allows for easily configuring required opts.
//
easygrunt.register = function (type, opts) {
  // Default opts
  var defaults = {
    async: true,
    required: []
  };

  // Required opts
  var required = [
    'name',
    'desc',
    'plugin'
  ];

  // Make sure we have all required params
  utils.checkRequired(required, opts, function (name) {
    throw new Error('Error: ' + name + ' is a required option');
  });

  // Mixin
  var options = _.extend({}, defaults, opts);

  // Return function to fit grunt plugin protocall
  return function (grunt) {
    grunt['register' + type](options.name, options.desc, function () {
      // Make sure we have required options
      var hasRequired = utils.checkRequired(options.required, this.options(), function (name) {
        grunt.log.error('Error: ' + name + ' is a required option');
      });

      // Return if error with required opts
      if (!hasRequired) { return false; }

      // Async by default (sick of wriiting this in every task).
      // Expose done by attaching it to this.
      if (options.async) { this.done = this.async(); }
      
      // Convert arguments to args and add grunt to the begining
      var args = Array.prototype.slice.call(arguments);
      args.unshift(grunt);

      // Call actual plugin
      options.plugin.apply(this, args);
    });
  };
};