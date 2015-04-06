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

        ts: {
            default: {
                src: [
                    'app/**/*.ts'
                ],
                options: {
                    target: 'es5',
                    sourceMap: false
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

    grunt.registerTask('build:dev', ['ts', 'concat:dev']);

};
