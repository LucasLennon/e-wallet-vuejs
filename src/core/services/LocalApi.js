import { openDB } from "idb";

import Token from "./LocalToken";

class LocalAPI extends Token {
  async accessDB() {
    this.db = await openDB("e-wallet", 1, {
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
    return Promise.resolve("Connected");
  }
  async login(user) {
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
}

if (window) {
  window.LocalAPI = new LocalAPI();
}

export default new LocalAPI();
