import { openDB } from "idb";
import generateUUID from "../utils/generateUUID";

const initialValues = {
  currency: [
    {
      simbolo: "R$",
      nomeFormatado: "Real Brasileiro",
      tipoMoeda: "A",
      quantity: 10000000
    }
  ]
};

class Token {
  async setTokenToUser(user) {
    let findUser = await this.findUser(user);
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
      }
      resolve();
    });
    await this.db.add("sessions", createToken);
    return Promise.resolve(createToken);
  }
}
class User extends Token {
  async findUser(user) {
    let allUsers = await this.db.getAll("users");
    return allUsers.find(item => {
      if (item.id === user.id || item.email === user.email) {
        return Promise.resolve(item);
      }
    });
  }
  async getUser(token) {
    let allSessions = await this.db.getAll("sessions");
    const user = allSessions.find(item => item.token === token);
    const getUser = await this.findUser(user);
    return Promise.resolve({
      status: 200,
      data: getUser
    });
  }
}

class LocalAPI extends User {
  async accessDB() {
    this.db = await openDB("e-wallet", 1, {
      upgrade(db) {
        db.createObjectStore("users", {
          autoIncrement: true
        });
        db.createObjectStore("sessions", {
          autoIncrement: true
        });
      }
    });
    return Promise.resolve("Connected");
  }
  async addToUsers(user) {
    if (
      !!user.name === false ||
      !!user.email === false ||
      !!user.password === false
    ) {
      throw Promise.reject("Bad Request");
    }

    const search = await this.findUser(user);
    user.id = generateUUID();

    if (!!search === false) {
      await this.db.add("users", Object.assign(user, initialValues));
      return Promise.resolve({
        status: 200,
        message: "User created",
        data: { id: user.id }
      });
    } else {
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
        await this.db.put(
          "users",
          Object.assign(cursor.value, user),
          cursor.key
        );
        return Promise.resolve({
          status: 200,
          message: "User Updated",
          data: Object.assign(cursor.value, user)
        });
      }
      cursor = await cursor.continue();
    }
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
