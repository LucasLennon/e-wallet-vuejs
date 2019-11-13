import { openDB } from "idb";
import generateUUID from "../utils/generateUUID";

import LocalUser from "./LocalUser";

class LocalTransaction {
  async accessDB() {
    this.db = await openDB("e-wallet", 1);
  }
  async saveTransaction(payload) {
    await this.accessDB();

    const transaction = {
      userId: payload.userId,
      id: generateUUID(),
      type: payload.type,
      created_at: new Date().toISOString()
    };

    if (payload.receive) {
      transaction.receive = payload.receive;
    }
    if (payload.send) {
      transaction.send = payload.send;
    }

    const savedTransaction = await this.db.add("transactions", transaction);
    const findUser = await LocalUser.findUser({ id: transaction.userId });

    if (payload.receive) {
      await this.updateUserCurrency(findUser, transaction.receive, "receive");
    }
    if (payload.send) {
      await this.updateUserCurrency(findUser, transaction.send, "send");
    }

    return Promise.resolve({
      status: 200,
      data: savedTransaction
    });
  }
  async getUserTransactions(user) {
    await this.accessDB();
    let transactions = await this.db.getAll("transactions");
    if (transactions.length === 0) {
      return Promise.resolve({
        status: 200,
        data: []
      });
    }
    const allUserTransactions = [];
    await transactions.find(item => {
      if (item.userId === user.id) {
        allUserTransactions.push(item);
      }
    });
    return Promise.resolve({
      status: 200,
      data: allUserTransactions
    });
  }
  async updateUserCurrency(user, transaction, type) {
    await this.accessDB();

    const found = await user.currency.find(item => item.simbolo === transaction.simbolo);

    if (found) {
      var currentValue = Number(found.quantity);
      var newValue = Number(transaction.quantity);
      if (type === "receive") {
        found.quantity = currentValue + newValue;
      }
      if (type === "send") {
        found.quantity = currentValue - newValue;
      }
    } else {
      user.currency.push(transaction);
    }
    
    await LocalUser.updateUser(user);

    return true;
  }
}

if (window) {
  window.LocalTransaction = new LocalTransaction();
}

export default new LocalTransaction();
