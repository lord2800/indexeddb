describe('IndexedDB API', function () {
	it('should throw if indexedDB is unavailable', function () {
		var idb = require('../src/idb');

		expect(function () { idb.init({}); }).toThrow();
		expect(function () { idb.init({ indexedDB: {} }); }).not.toThrow();
	});

	it('should return a promise when opening a database', function () {
		var idb = require('../src/idb');
		var promise = require('bluebird');

		idb.init(window);
		var maybePromise = idb.open('test', [function () {}]);
		expect(maybePromise instanceof promise).toBe(true);
	});
});
