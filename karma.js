module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'browserify'],
        files: [ 'tests/**/*.js' ],
        exclude: [ ],
        preprocessors: {
            'tests/**/*.js': ['browserify']
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome', 'Firefox', 'Safari', 'PhantomJS'],
        singleRun: false
    });
};
