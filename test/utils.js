/*
 * test/utils.js
 *
 * Copyright (c) 2014 First Opinion
 */

'use strict';


// ------------------------------------------------------------------------------
// Dependencies 
// ------------------------------------------------------------------------------

// Third party
var should  = require('chai').should(),
    assert  = require('chai').assert;

// Lib
var utils = require('../lib/utils');


// ------------------------------------------------------------------------------
// Test
// ------------------------------------------------------------------------------

describe('utils.js', function () {

  describe('checkRequired', function () {
    var required = ['foo', 'bar', 'baz'],
        pass = { 'foo': '1', 'bar': '2', 'baz': '3' },
        fail = { 'foo': '1' };

    it('Should return true if all values in the array are found in the object.', function () {
      assert.ok(utils.checkRequired(required, pass));
    });

    it('Should return false if any value in the array is not found in the object.', function () {
      assert.notOk(utils.checkRequired(required, fail));
    });

    it('Should call onError method for every value in the array not found in the object', function () {
      var err =[];
      utils.checkRequired(required, fail, function (val) { err.push(val); });
      assert.deepEqual(err, ['bar', 'baz']);
    });
  });

});