var Store = {
  db: null,
  dbVer: 1,
  dbName: "main",
  contentStore: {},
};

Store.handleOldVersions = () => {

};

Store.initStore = () => {
  var {
    db,
    dbName,
    dbVer
  } = Store;
  if (db) {
    var request = window.indexedDB.open(dbName, dbVer);
    request.onsuccess = (event) => {
        db = event.target.result;
    };
    request.onerror = (event) => {
        alert('error checking if db exists');
    };
    request.onupgradeneeded = (event) => {
        Store.setupStorage();
    };
    request.onblocked = (event) => {
        alert("You are using an older version of Store website, please refresh or close Store page");
    };
  } else {
      Store.setupStorage();
  }
};

Store.useDatabase = () => {
  var { db } = Store;
  db.onversionchange = (event) => {
    db.close();
    alert("You are using an older version of Store website, please refresh or close Store page");
  };
};

Store.setupStorage = () => {
  var {
    db,
    dbName,
    dbVer
  } = Store;
  var request = window.indexedDB.open(dbName, dbVer);
  request.onsuccess = (event) => {
      db = event.target.result;
      // loadAmounts();
  };
  request.onerror = (event) => {
      alert('Failed to open IndexedDB database')
  };

  // // called by version change or new db
  request.onupgradeneeded = (event) => {
      db = event.target.result;
      // set schema
      // key path for unique
      // index for searching
      Store.useDatabase(db); // for old database version issue
      var idbObjectStore = db.createObjectStore("amounts", {keyPath: "id"});
      // var idbObjectStore = db.createObjectStore("amounts", {autoIncrement: true});
      idbObjectStore.createIndex("amount", "amount", {unique: false});
      idbObjectStore.transaction.oncomplete = (event) => {
          // store values
          // var amountObjectStore = db.transaction(["amounts"], "readwrite").objectStore("amounts");
          // sampleData.forEach(amount => {
          //     amountObjectStore.add(amount);
          // });
          // loadAmounts();
      };
      idbObjectStore.transaction.onerror = (event) => {
          alert('error occurred while trying to update db schema');
      };
  }
};

Store.getStore = () => {

};

Store.updateStore = () => {

};