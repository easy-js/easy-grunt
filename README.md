easy-grunt [![Build Status](https://travis-ci.org/easy-js/easy-grunt.png)](https://travis-ci.org/easy-js/easy-grunt)
==========

Convenience wrapper around grunt.registerTask. Avoid rewriting tedious boiler for custom tasks.

* Async task by default.
* Required options.

---

## Install

`npm install easy-grunt --save`

---

## API

### easygrunt.register(type, rules)

Check data against specified rules.

##### PARAMETERS:

* **\*type**: The type of task to register, either "Task" or "MultiTask".
* **\*opts**:
  * **\*name**: String -- The name to refrence your grunt task by.
  * **\*desc**: String -- The description of your grunt task.
  * **\*plugin**: Function -- The code to execute when your plugin is ran. "grunt" will be passed in as the first argument. Task methods will be passed in after.
  * **required**: Array -- [] -- List of required options that must be passed to task.  

##### RETURNS:

Function that accepts grunt as the first parameter and registers task when executed. This follows the format specified for grunt plugins so that they may be loaded via the method `grunt.loadNPMTask`.

##### EXAMPLE USAGE:

```
module.exports = easygrunt.register('Task', {
  name: 'plugin',
  desc: 'The best plugin ever.'
  required: ['foo', 'bar'],
  
  //
  // I do awesome stuff
  //
  plugin: function (grunt) {
    this.done();
  }
});
```

---

## License

The MIT License (MIT) Copyright (c) 2013 First Opinion

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
