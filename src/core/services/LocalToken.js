import generateUUID from "../utils/generateUUID";
import User from "./LocalUser";

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

export default Token;