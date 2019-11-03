import { openDB } from "idb";

class LocalAPI {

  async accessDB() {
    this.db = await openDB("e-wallet", 1, {
      upgrade(db) {
        db.createObjectStore("users", {
          autoIncrement: true
        });
      }
    });
    return Promise.resolve('Connected')
  }
  async addToUsers(user) {
    if (!!user.name === false || !!user.email === false || !!user.password === false) {
        throw Promise.reject("Bad Request")
    }
    const search = await this.searchForUser(user);
    // let all = await this.db.getAll("users");
    // const searchForItem = all.find(item => item.id === user.id);

    user.id = "1234"

    if (!!search === false) {
      this.db.add("users", user);
      return Promise.resolve({
        status: 200,
        message: "User created",
        data: user
      });
    }
    else{
        return Promise.reject({
          status: 400,
          message: "Bad request"
        });
    }
  }
  async updateUser(user) {
    let cursor = await this.db.transaction("users").store.openCursor();
    while (cursor) {
      if (cursor.value.id === user.id) {
        const Response = this.db.put(
          "users",
          Object.assign(cursor.value, user),
          cursor.key
        );
        return Promise.resolve(Response);
      }
      cursor = await cursor.continue();
    }
  }
  async searchForUser(user) {
    let cursor = await this.db.transaction("users").store.openCursor();
    while (cursor) {
      if (
          cursor.value.id === user.id ||
          cursor.value.email === user.email
        ) {
        const Response = this.db.get("users", cursor.key);
        return Promise.resolve(Response);
      }
      cursor = await cursor.continue();
    }
  }
  async login(user) {
    let cursor = await this.db.transaction("users").store.openCursor();
    while (cursor) {
      if (
        cursor.value.email === user.email &&
        cursor.value.password === user.password
      ) {
        const Response = this.db.get("users", cursor.key);
        return Promise.resolve(Response);
      }
      cursor = await cursor.continue();
    }
  }
}

if (window) {
    window.LocalAPI = new LocalAPI();
}

export default new LocalAPI();
