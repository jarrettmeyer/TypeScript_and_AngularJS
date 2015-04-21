module.exports = function(config) {
    config.set({

        basePath: '.',

        frameworks: ['mocha', 'chai'],

        files: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/angularjs/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/sinon-1.14.1/index.js',
            'scripts/app/app.module.js',
            'scripts/app/**/*.module.js',
            'scripts/app/*.js',
            'scripts/app/**/*.js'
        ],

        exclude: [
        ],

        preprocessors: {
        },

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['Chrome'],

        singleRun: false
    });
};
