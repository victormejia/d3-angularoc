module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    'gh-pages': {
      options: {
        base: 'slides',
        message: 'Auto-generated commit'
      },
      src: '**/*'
    }
  });

  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('deploy', ['gh-pages']);

};