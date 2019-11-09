import generateUUID from "../utils/generateUUID";
import Transactions from "./LocalTransaction";

const initialValues = {
  currency: [
    {
      simbolo: "BRL",
      nomeFormatado: "Real Brasileiro",
      tipoMoeda: "A",
      quantity: 100000.0
    }
  ]
};

class User extends Transactions {
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

export default User;