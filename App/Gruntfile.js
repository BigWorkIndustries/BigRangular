module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-ngdocs');

    grunt.initConfig({
        ngdocs: {
            options: {
                dest:'docs/client/html'
            },
            all: ['client/src/app/**/*.js']
        }
    });

    grunt.registerTask('default', ['ngdocs']);

};