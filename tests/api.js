describe('IndexedDB API', function () {
	it('should throw if indexedDB is unavailable', function () {
		var IDBContext = require('../src/idb').default;

		expect(function () { new IDBContext({}); }).toThrow();
		expect(function () { new IDBContext({ indexedDB: {} }); }).not.toThrow();
	});

	it('should return a promise when opening a database', function () {
		var IDBContext = require('../src/idb').default;

		var inst = new IDBContext(window);
		var maybePromise = inst.open('test', [function () {}]);
		expect(maybePromise instanceof Promise).toBe(true);
	});
});
