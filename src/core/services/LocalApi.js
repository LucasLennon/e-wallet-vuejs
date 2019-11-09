import { openDB } from "idb";

// import Token from "./LocalToken";

class LocalAPI {
  constructor(){
    this.db = openDB("e-wallet", 1, {
      upgrade(db) {
        db.createObjectStore("users", {
          autoIncrement: true
        });
        db.createObjectStore("sessions", {
          autoIncrement: true
        });
        db.createObjectStore("transactions", {
          autoIncrement: true
        });
      }
    });
  }
}

if (window) {
  window.LocalAPI = new LocalAPI();
}

export default new LocalAPI();
