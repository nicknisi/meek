/*jshint node:true*/
module.exports = function (grunt) {
	var path = require('path'),
	lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

	var folderMount = function folderMount(connect, point) {
		return connect.static(path.resolve(point));
	};

	grunt.initConfig({
		jshint: {
			all: ['Gruntfile.js', 'src/**/*.js']
		},
		connect: {
			livereload: {
				options: {
					port: 9001,
					middleware: function (connect) {
						return [lrSnippet, folderMount(connect, '.')];
					}
				}
			}
		},
		regarde: {
			htmljs: {
				files: ['examples/index.html', 'src/**/*.js'],
				tasks: ['livereload']
			}
		}
	});

	grunt.registerTask('default', 'jshint:all');
	grunt.registerTask('server', ['livereload-start', 'connect:livereload', 'regarde']);

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-livereload');
	grunt.loadNpmTasks('grunt-regarde');
	grunt.loadNpmTasks('grunt-contrib-connect');
};
