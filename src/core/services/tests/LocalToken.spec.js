require("fake-indexeddb/auto");
import LocalAPI from "../LocalApi";
import LocalUser from "../LocalUser";
import LocalToken from "../LocalToken";

let mockUser = {
  name: "teste",
  email: "teste@teste.com",
  password: "teste"
};
describe("LocalToken", () => {
  beforeEach(async () => {
    await new LocalAPI();
  });
  test("should login using test user", async () => {
    await LocalUser.addUser(mockUser);
    const { data } = await LocalToken.login(mockUser);
    expect(data.token).toBeDefined();
  });
});
