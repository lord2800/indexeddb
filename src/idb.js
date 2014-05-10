export default class IDBContext {
	constructor(win) {
		if(!win.indexedDB) {
			throw new Error('Your browser does not support IndexedDB!');
		}

		this.db = null;
		this.__indexedDB = win.indexedDB;
	}

	open(name, migrations) {
		return new Promise((resolve, reject) => {
			var req = this.__indexedDB.open(name, migrations.length);
			req.onupgradeneeded = (e) => {
				this.db = e.target.result;
				migrations[migrations.length-1](this);
			};
			req.onsuccess = (e) => { this.db = e.target.result; resolve(this); };
			req.onerror = (e) => { reject(e); };
		});
	}

	readFrom(stores) {
		var txn = this.db.transaction(stores, "readonly");
		return stores.map(function (prev, current) {
			prev[current] = txn.objectStore(current);
		}, {});
	}

	writeTo(stores) {
		var txn = this.db.transaction(stores, "readwrite");
		return stores.map(function (prev, current) {
			prev[current] = txn.objectStore(current);
		}, {});
	}
}
