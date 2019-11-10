require("fake-indexeddb/auto");
import LocalAPI from "../LocalApi";
import LocalUser from "../LocalUser";
import LocalToken from "../LocalToken";
import LocalTransaction from "../LocalTransaction";

let mockUser = {
  name: "teste",
  email: "teste@teste.com",
  password: "teste"
};

var mockTransaction = {
  userId: "123d0446-eead-44aa-9a2f-65098e44836b",
  id: "5ce7fbaa-2939-424e-b4c2-aad7f54104d2",
  type: "exchange",
  created_at: new Date().toISOString()
};

var mockReceive = {
  simbolo: "BRL",
  nomeFormatado: "Real Brasileiro",
  tipoMoeda: "A",
  quantity: 37829.98984
};
var mockSend = {
  userId: "123d0446-eead-44aa-9a2f-65098e44836b",
  id: "5ce7fbaa-2939-424e-b4c2-aad7f54104d2",
  type: "exchange",
  created_at: new Date().toISOString(),
  send: {
    simbolo: "BRL",
    nomeFormatado: "Real Brasileiro",
    tipoMoeda: "A",
    quantity: 37829.98984
  }
};

async function teste() {
  await LocalUser.addUser(mockUser);
  const response = await LocalToken.login(mockUser);
  const { data } = await LocalUser.getUser(response.data.token);
  user = data;
  mockTransaction.userId = user.id;
}

var user;
describe("LocalTransaction", () => {
  beforeEach(async () => {
    await new LocalAPI();
  });
  test("should make transaction and save on db", async () => {
    await teste();
    const response = await LocalTransaction.saveTransaction(mockTransaction);
    expect(response.data).toBeDefined();
  });
  test("should update currency quantity after receive", async () => {
    await LocalTransaction.updateUserCurrency(user, mockReceive, "receive");
    const find = await LocalUser.findUser(user);
    expect(find.currency[0].quantity).toBe(100000+ 37829.98984);
  });
  test("should update currency quantity after send", async () => {
    await LocalTransaction.updateUserCurrency(user, mockReceive, "send");
    const find = await LocalUser.findUser(user);
    expect(find.currency[0].quantity).toBe(100000);
  });
});
