module.exports = function(grunt) {

  // Load tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Config
  grunt.initConfig({
    // JSHINT
    'jshint': {
      all: [ 'Gruntfile.js', 'src/*.js', 'test/*.js' ],
      options: { jshintrc: true }
    }
  });

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint']);
};
