/*
 * test/easy-grunt.js
 *
 * Copyright (c) 2014 First Opinion
 */

'use strict';


// ------------------------------------------------------------------------------
// Dependencies 
// ------------------------------------------------------------------------------

// Third party
var should  = require('chai').should(),
    assert  = require('chai').assert,
    spy     = require('sinon').spy;

var grunt   = require('grunt'),
    _       = require('underscore');

// Lib
var easygrunt = require('../lib/easy-grunt');


// ------------------------------------------------------------------------------
// Test
// ------------------------------------------------------------------------------

describe('easy-grunt.js', function () {
  // Reusable base config object
  var config = {
    easy: {
      name: 'plugin',
      desc: 'the best',
      required: ['foo', 'bar'],
      plugin: function () { this.done(); }
    },
    grunt: {
      'plugin': {
        options: {},
        all: { options: {} }
      }
    }
  }

  // Pass & Fail for required options
  var pass = { 'foo': '1', 'bar': '2' },
      fail = { 'foz': '3', 'baz': '4' };

  describe('register', function () {
    // Local versions
    var easyConfig, gruntConfig;

    // Run grunt task
    var runTask = function (type, opts, onComplete) {
      // Temporarily disable stdout
      var stdout = process.stdout.write;
      process.stdout.write = function () {};

      // Hack to aboid searching for Gruntfile
      grunt.task.init = function() {};
      
      // Grunt init
      _.extend(gruntConfig.plugin.options, opts);
      grunt.initConfig(gruntConfig);

      // Register task and run
      easygrunt.register(type, easyConfig)(grunt);
      grunt.tasks(['plugin:all:args'], { force: true }, function () {
        // Stdout returns
        process.stdout.write = stdout;
        // Callback
        onComplete();
      });
    };

    // Create local copies to work with for each test
    beforeEach(function () {
      easyConfig = _.extend({}, config.easy);
      gruntConfig = _.extend({}, config.grunt);
      gruntConfig.plugin = _.extend({}, config.grunt.plugin);
    });

    it('Should throw error if required configuration is not passed', function () {
      var config = _.extend({}, easyConfig);
      delete config.plugin;

      assert.throws(function () {
        easygrunt.register('Task', {});
      }, Error);
    });

    it('Should return a function if properly configured', function () {
      assert.isFunction(easygrunt.register('Task', easyConfig));
    });

    it('Should call grunt.registerTask if type Task passed', function () {
      spy(grunt, 'registerTask');

      easygrunt.register('Task', easyConfig)(grunt);
      assert.ok(grunt.registerTask.calledOnce);

      grunt.registerTask.restore();
    });

    it('Should call grunt.registerMultiTask if type MultiTask passed', function () {
      spy(grunt, 'registerMultiTask');

      easygrunt.register('MultiTask', easyConfig)(grunt);
      assert.ok(grunt.registerMultiTask.calledOnce);

      grunt.registerMultiTask.restore();
    });

    it('Should log and exit task if required options are not passed', function (done) {
      spy(grunt.log, 'error');
      spy(easyConfig, 'plugin');

      runTask('Task', fail, function () {
        assert.ok(grunt.log.error.calledTwice);
        assert.ok(easyConfig.plugin.notCalled);

        grunt.log.error.restore();
        easyConfig.plugin.restore();
        done();
      });
    });

    it('Should call plugin if required options are passed', function (done) {
      spy(easyConfig, 'plugin');

      runTask('Task', pass, function () {
        assert.ok(easyConfig.plugin.calledOnce);

        easyConfig.plugin.restore();
        done();
      });
    });

    it('Should pass grunt as first argument to plugin', function (done) {
      var arg;
      easyConfig.plugin = function (grunt) {
        arg = grunt;
        this.done();
      };

      runTask('MultiTask', pass, function () {
        assert.equal(arg, grunt);
        done();
      });
    });

    it('Should pass arguments to plugin', function (done) {
      var args;
      easyConfig.plugin = function (grunt) {
        args = arguments;
        this.done();
      };

      runTask('MultiTask', pass, function () {
        assert.equal(args[1], 'args');
        done();
      });
    });

    it('Should add done to conext of plugin if async is true (default)', function (done) {
      var isAsync;
      easyConfig.plugin = function (grunt) {
        isAsync = this.done;
        this.done();
      };

      runTask('Task', pass, function () {
        assert.ok(isAsync);
        done();
      });
    });

    it('Should not add done to conext of plugin if async is false', function (done) {
      var isAsync;
      easyConfig.async = false;
      easyConfig.plugin = function (grunt) {
        isAsync = this.done;
      };

      runTask('Task', pass, function () {
        assert.notOk(isAsync);
        done();
      });
    });
  });

});