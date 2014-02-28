/*
 * utils.js
 *
 * Copyright (c) 2014 First Opinion
 */

'use strict';


// ------------------------------------------------------------------------------
// Dependencies 
// ------------------------------------------------------------------------------

// Third Party
var _ = require('underscore');


// ------------------------------------------------------------------------------
// Module
// ------------------------------------------------------------------------------

var utils = module.exports = {};


// ------------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------------

//
// Helper method to check for object properties
//
utils.checkRequired = function (required, passed, onError) {
  var isValid = true;
  
  _.each(required, function (val) {
    if (!passed[val]) {
      if (onError) { onError(val); }
      isValid = false;
    }
  });

  return isValid;
};