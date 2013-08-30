/*jshint node:true*/
module.exports = function (grunt) {
	grunt.initConfig({
		jshint: {
			all: ['Gruntfile.js', 'src/**/*.js']
		}
	});

	grunt.registerTask('default', 'jshint:all');

	grunt.loadNpmTasks('grunt-contrib-jshint');
};
