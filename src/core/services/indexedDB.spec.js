require("fake-indexeddb/auto");
import LocalAPI from "./index";

let mockUser = {
  name: "teste",
  email: "teste@teste.com",
  password: "teste"
};

describe("LocalAPI", () => {
  test("accessDB", async () => {
    const api = await LocalAPI.accessDB();
    expect(api).toBe("Connected");
  });
  test("add new User", async () => {
    const response = await LocalAPI.addToUsers(mockUser);
    expect(response.status).toBe(200);
  });
  test("can't add same user", async () => {
    try {
        await LocalAPI.addToUsers(mockUser);
    } catch (error) {
        expect(error.status).toBe(400);
    }
  });
});
