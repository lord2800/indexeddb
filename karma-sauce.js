module.exports = function(config) {
    var customLaunchers = {};

    function browser(name, platform, version) {
        customLaunchers['sl_' + name.replace(/ /g, '') + '_' + version] = {
            base: 'SauceLabs',
            browserName: name,
            version: version,
            platform: platform
        };
    }

    [28].forEach(browser.bind(null, 'firefox', 'Linux'));
    [34].forEach(browser.bind(null, 'chrome', 'Linux'));
    [11].forEach(browser.bind(null, 'internet explorer', 'Windows 7'));
    // safari tests fail anyway
    // [7         ].forEach(browser.bind(null, 'safari', 'OS X 10.9'));

    require('./karma.js')(config);

    config.set({
        reporters: [ 'dots', 'saucelabs' ],
        sauceLabs: {
            testName: 'IndexedDB tests',
            recordScreenshots: false
        },
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers)
    });
};
