let DB = null;
const Cache = {};

function connect(dbName, dbVersion, schema) {
	return new Promise((resolve, reject) => {
		const or = indexedDB.open(dbName, dbVersion);
		or.onerror = event => reject(event.target.error);
		or.onsuccess = async event => {
			const db = event.target.result;
			db.onerror = event => console.error(event.target.error);
			DB = db;
			Cache[1] = await new Promise((resolve, reject) => {
				const store = DB.transaction(DB.name).objectStore(DB.name).get(1);
				store.onerror = event => reject(event.target.error);
				store.onsuccess = event => resolve(event.target.result);
			});
			resolve(Cache[1]);
		};
		or.onupgradeneeded = event => {
			const db = event.target.result;
			db.onerror = event => console.error(event.target.error);

			const store = db.createObjectStore(dbName, { autoIncrement: true });
			store.put(Object.fromEntries(schema.map(v => [v.name, v.defaultValue])));
		};
	});
}

function get(key, id = 1) { return Cache[id][key]; }

function update(keyValues, id = 1) {
	for (const key in keyValues)
		Cache[id][key] = keyValues[key];

	new Promise((resolve, reject) => {
		const store = DB.transaction(DB.name, "readwrite").objectStore(DB.name);
		store.onerror = event => reject(event.target.error);

		const request = store.openCursor(id);
		request.onerror = event => reject(event.target.error);
		request.onsuccess = event => {
			const cursor = event.target.result;
			if (!cursor) return;
			for (const key in keyValues)
				cursor.value[key] = keyValues[key];
			cursor.update(cursor.value);
			cursor.continue();
		};
	});
}

export default { connect, get, update };