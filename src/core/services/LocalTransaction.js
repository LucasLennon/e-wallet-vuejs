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


class LocalTransaction {
  async accessDB() {
    this.db = openDB("e-wallet", 1);
    // this.db = openDB("e-wallet", 1, {
    //   upgrade(db) {
    //     db.createObjectStore("transaction", {
    //       autoIncrement: true
    //     });
    //   }
    // });
  }
  async saveTransaction(payload) {
    await this.accessDB()
    
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
    const findUser = await this.findUser({ id: transaction.userId });

    if (payload.receive) {
      await this.userReceivingCurrency(findUser, transaction);
    }
    if (payload.send) {
      await this.userSendingCurrency(findUser, transaction);
    }

    // const savedToUser = await this.updateUserCurrency(
    //   transaction
    // );
    return Promise.resolve({
      status: 200,
      data: savedTransaction
    });
  }
  async getUserTransactions(user) {
    await this.accessDB();
    let transactions = await this.db.getAll("transactions");
    return transactions.find(item => {
      if (item.userId === user.id) {
        return Promise.resolve(item);
      }
    });
  }
  async userReceivingCurrency(transaction) {
    await this.accessDB();
    const findUser = await this.findUser({ id: transaction.userId });
    console.log(findUser.currency);
  }
  async userSendingCurrency(transaction) {
    await this.accessDB();
    const findUser = await this.findUser({ id: transaction.userId });
  }
  async updateUserCurrency(transaction) {
    await this.accessDB();
    const findUser = await this.findUser({ id: transaction.userId });
    var cursor = await this.db.transaction("users").store.openCursor();
    while (cursor) {
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

if (window) {
  window.LocalTransaction = new LocalTransaction();
}

export default new LocalTransaction();