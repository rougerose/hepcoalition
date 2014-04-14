module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        loadPath: ['bower_components/inuit.css/','bower_components/fontawesome/scss']
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'css/hepcoalition.css': 'css/hepcoalition.scss',
          'css/hepcoalition-rtl.css': 'css/hepcoalition-rtl.scss'
        }        
      },
      dev: {
        options: {
          style: 'nested',
          quiet: true
        },
        files: {
          'css/hepcoalition.css': 'css/hepcoalition.scss',
          'css/hepcoalition-rtl.css': 'css/hepcoalition-rtl.scss'
        }
      }
    },
    watch: {
      grunt: { files: ['Gruntfile.js'] },
      sass: {
        files: 'css/**/*.scss',
        tasks: ['dev']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // grunt.registerTask('dist', ['sass:dist']);
  grunt.registerTask('dev', ['sass:dev']);
  grunt.registerTask('default', ['dev','watch']);
}