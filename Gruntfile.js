module.exports = function (grunt) {

    grunt.initConfig({

        //
        // https://github.com/gruntjs/grunt-contrib-concat
        //
        concat: {
            dev: {
                src: [
                    // Order matters!
                    // First grab app.module.js.
                    'app/app.module.js',
                    // Then grab any other top-level files.
                    'app/*.js',
                    // Then grab anything else name *.module.js.
                    'app/**/*.module.js',
                    // Then grab everything else.
                    'app/**/*.js',
                    // But don't grab test scripts.
                    '!app/**/*.test.js'
                ],
                dest: 'scripts/app.js'
            }
        },

        //
        // https://github.com/spatools/grunt-html-build
        //
        htmlbuild: {
            dist: {
                src: 'index.template.html',
                dest: 'index.html',
                options: {
                    scripts: {
                        app: [
                            'app/*.module.js',
                            'app/*.js'
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
                    target: 'es5',
                    sourceMap: true
                }
            }
        },

        watch: {
            concat: {
                files: [
                    'app/**/*.js'
                ],
                tasks: [
                    'concat:dev'
                ]
            },
            ts: {
                files: [
                    'app/**/*.ts'
                ],
                tasks: [
                    'ts',
                    'concat:dev'
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html-build');

    grunt.registerTask('build:dev', ['ts', 'concat:dev']);

};
