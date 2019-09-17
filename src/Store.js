import Utilities from './Utilities.js';

const Store = {
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
  console.log(db);
  if (db) {
    var request = window.indexedDB.open(dbName, dbVer);
    request.onsuccess = (event) => {
        db = event.target.result;
    };
    request.onerror = (event) => {
        alert('error checking if db exists');
    };
    request.onupgradeneeded = (event) => {
        Store.setupStorage(Utilities);
    };
    request.onblocked = (event) => {
        alert("You are using an older version of Store website, please refresh or close Store page");
    };
  } else {
    Store.setupStorage(Utilities);
  }
};

Store.useDatabase = (db) => {
  db.onversionchange = (event) => {
    db.close();
    alert("You are using an older version of Store website, please refresh or close Store page");
  };
};

Store.setupStorage = (Utilities) => {
  var {
    db,
    dbName,
    dbVer
  } = Store;
  console.log(dbName);
  var request = window.indexedDB.open(dbName, dbVer);
  request.onsuccess = (event) => {
      db = event.target.result;
      // loadAmounts();
      console.log('load event');
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
      var idbObjectStore = db.createObjectStore("calories", {keyPath: "date"});
      // var idbObjectStore = db.createObjectStore("amounts", {autoIncrement: true});
      var today = Utilities.getTodaysDate();
      idbObjectStore.createIndex("date", "date", {unique: false});
      idbObjectStore.transaction.oncomplete = (event) => {
          // store values
          var calorieObjectStore = db.transaction(["calories"], "readwrite").objectStore("calories");
          // sampleData.forEach(amount => {
          //     amountObjectStore.add(amount);
          // });
          // loadAmounts();
          calorieObjectStore.add({date: today});
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

export default Store;