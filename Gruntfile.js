module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-nodemon');

	grunt.initConfig({
		env : {
			options : {
			 //Shared Options Hash
			},
			dev : {
				src : '.dev.env',
			}
		},
		nodemon: {
			dev: {
				script: './bin/www'
			}
		}
	});

	grunt.registerTask('dev', ['env:dev', 'nodemon:dev']);

};