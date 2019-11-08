import { openDB } from "idb";
import generateUUID from "../utils/generateUUID";

var transactionModel = {
  userId: "123d0446-eead-44aa-9a2f-65098e44836b",
  id: "5ce7fbaa-2939-424e-b4c2-aad7f54104d2",
  type: "exchange",
  created_at: new Date().toISOString(),
  receive: {
    simbolo: "BRL",
    nomeFormatado: "Real Brasileiro",
    tipoMoeda: "A",
    quantity: (37829.98984).toString().replace(/\D/, ",")
  },
  send: {
    simbolo: "BitCoin",
    nomeFormatado: "BitCoin",
    quantity: 1
  }
};

const initialValues = {
  currency: [
    {
      simbolo: "BRL",
      nomeFormatado: "Real Brasileiro",
      tipoMoeda: "A",
      quantity: 100000.00 
    }
  ]
};

class Transactions {
  async saveTransaction(payload){
    const transaction = {
      userId: payload.userId,
      id: generateUUID(),
      type: payload.type,
      created_at: new Date().toISOString(),
    };

    if (payload.receive) {
      transaction.receive = payload.receive;
    }
    if (payload.send) {
      transaction.send = payload.send;
    }

    const savedTransaction = await this.db.add("transactions", transaction);
    const findUser = await this.findUser({ id: transaction.userId });

    if (payload.receive) {
      await this.userReceivingCurrency();
    }
    if (payload.send) {
      await this.userSendingCurrency();
    }

    // const savedToUser = await this.updateUserCurrency(
    //   transaction
    // );
    return Promise.resolve({
      status: 200,
      data: savedTransaction
    });
  }
  async getUserTransactions(user){
    let transactions = await this.db.getAll("transactions");
    return transactions.find(item => {
      if (item.userId === user.id) {
        return Promise.resolve(item);
      }
    });
  }
  async userReceivingCurrency(transaction){
    const findUser = await this.findUser({ id: transaction.userId });
    
  }
  async userSendingCurrency(transaction){
    const findUser = await this.findUser({ id: transaction.userId });

  }
  async updateUserCurrency(transaction){
    const findUser = await this.findUser({ id: transaction.userId });
    var cursor = await this.db.transaction("users").store.openCursor();    
    while(cursor){
      if (cursor.value.id === findUser.id) {
        this.db.put(
          "users",
          Object.assign(findUser, {
            currency: [transaction.receive]
          }),
          cursor.key
        );
      }
      cursor = await cursor.continue();
    }
  }
}
class User extends Transactions {
  async findUser(user) {
    let allUsers = await this.db.getAll("users");
    console.warn(allUsers);
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

class Token extends User {
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
