import { openDB } from "idb";

// function LocalAPI() {
//   openDB("e-wallet", 1, {
//     upgrade(db) {
//       db.createObjectStore("users", {
//         autoIncrement: true
//       });
//       db.createObjectStore("sessions", {
//         autoIncrement: true
//       });
//       db.createObjectStore("transactions", {
//         autoIncrement: true
//       });
//     }
//   });
//   return true;
// }

class LocalAPI {
  constructor(){
    openDB("e-wallet", 1, {
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
    })
    return true;
  }
}

if (window) {
  window.LocalAPI = LocalAPI;
}

export default LocalAPI;
