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
      await this.updateUserCurrency(findUser, transaction.receive, 'receive');
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
    return transactions.find(item => {
      if (item.userId === user.id) {
        return Promise.resolve({
          status: 200,
          data: item
        });
      }
    });
  }
  async updateUserCurrency(user, transaction, type) {
    await this.accessDB();

    await user.currency.find(item => {
      if (
        item.simbolo == transaction.simbolo &&
        item.tipoMoeda === transaction.tipoMoeda
      ) {
        var currentValue = Number(item.quantity);
        var newValue = Number(transaction.quantity);

        if (type === "receive") {
          item.quantity = currentValue + newValue;
        }
        if (type === "send") {
          item.quantity = currentValue - newValue;
        }
      }
    });

    await LocalUser.updateUser(user);

    return true;
  }
}

if (window) {
  window.LocalTransaction = new LocalTransaction();
}

export default new LocalTransaction();