module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: [ 'jasmine', 'browserify' ],
        files: [ 'node_modules/es6ify/node_modules/traceur/bin/traceur-runtime.js', 'tests/**/*.js' ],
        exclude: [ ],
        preprocessors: {
            'tests/**/*.js': [ 'browserify' ],
        },
        browserify: {
            transform: [ 'es6ify' ]
        },
        reporters: [ 'progress' ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [ 'Chrome', 'Firefox', 'Safari', 'PhantomJS' ],
        singleRun: false
    });
};
