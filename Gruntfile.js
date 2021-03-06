module.exports = function (grunt) {

    grunt.initConfig({

        //
        // https://github.com/spatools/grunt-html-build
        //
        htmlbuild: {
            dist: {
                src: 'template/index.html',
                options: {
                    scripts: {
                        app: [
                            'scripts/app/app.module.js',
                            'scripts/app/**/*.module.js',
                            'scripts/app/**/*.js',
                            '!scripts/app/**/*.test.js'
                        ],
                        libs: [
                            'bower_components/jquery/dist/jquery.min.js',
                            'bower_components/bootstrap/dist/js/bootstrap.min.js',
                            'bower_components/angularjs/angular.js',
                            'bower_components/angular-route/angular-route.js'
                        ]
                    }
                }
            }
        },

        ts: {
            default: {
                src: [
                    'app/**/*.ts'
                ],
                outDir: 'scripts/app',
                options: {
                    comments: false,
                    sourceMap: true,
                    target: 'es5'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-html-build');

    grunt.registerTask('build:dev', ['ts', 'htmlbuild']);

};
