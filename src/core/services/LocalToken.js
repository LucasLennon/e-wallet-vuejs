import { openDB } from "idb";
import generateUUID from "../utils/generateUUID";

import LocalUser from "./LocalUser";

class LocalToken {
  async accessDB() {
    this.db = await openDB("e-wallet", 1);
  }
  // async accessDB() {
  //   this.db = openDB("e-wallet", 1, {
  //     upgrade(db) {
  //       db.createObjectStore("sessions", {
  //         autoIncrement: true
  //       });
  //     }
  //   });
  // }
  async login(user) {
    await this.accessDB();
    const token = await this.setTokenToUser(user);
    if (token) {
      return Promise.resolve({
        status: 200,
        message: "Login",
        data: token
      });
    } else {
      return Promise.reject({
        status: 404,
        message: "No user Found"
      });
    }
  }
  async setTokenToUser(user) {
    await this.accessDB();
    let findUser = await LocalUser.findUser(user);
    const createToken = {
      id: findUser.id,
      token: generateUUID()
    };
    
    let cursorSessions = await this.db
      .transaction("sessions")
      .store.openCursor();

    await new Promise(async resolve => {
      while (cursorSessions) {
        if (cursorSessions.value.id === createToken.id) {
          await this.db.delete("sessions", cursorSessions.key);
          resolve();
        }
        cursorSessions = await cursorSessions.continue();
      }
      resolve();
    });
    await this.db.add("sessions", createToken);
    return Promise.resolve(createToken);
  }
}

if (window) {
  window.LocalUser = new LocalToken();
}

export default new LocalToken();
