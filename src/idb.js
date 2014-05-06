(function () {
	'use strict';
	var indexedDB, Promise = Promise;

	if(!Promise) {
		Promise = require('bluebird');
	}

	function init(win) {
		if(!win.indexedDB) {
			throw new Error('Your browser does not support IndexedDB!');
		}

		indexedDB = win.indexedDB;
	}

	function upgrade(e) {
		this.db = e.target.result;
		this.migrations[this.migrations.length-1](this);
	}

	function success(resolve, e) {
		this.db = e.target.result;
		resolve(this);
	}

	function error(reject, e) {
		reject(e);
	}

	function open(name, migrations) {
		return new Promise(function (resolve, reject) {
			var req = indexedDB.open(name, migrations.length);
			this.db = null;

			req.onupgradeneeded = upgrade.bind(this);
			req.onsuccess = success.bind(this, resolve);
			req.onerror = error.bind(this, reject);
			this.readFrom = transaction.bind(this, "readonly");
			this.writeTo = transaction.bind(this, "readwrite");
		}.bind(this));
	}

	function transaction(mode, stores) {
		var txn = this.db.transaction(stores, mode);
		if(stores.length === 1) {
			return txn.objectStore(stores[0]);
		} else {
			var result = {};
			stores.forEach(function (store) { result[store] = txn.objectStore(store); });
			return result;
		}
	}

	module.exports = {
		init: init,
		open: open
	};
}());
