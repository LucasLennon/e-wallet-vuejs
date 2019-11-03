require("fake-indexeddb/auto");
import LocalAPI from "./LocalApi";

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
  test("update user", async () => {
    const { data } = await LocalAPI.addToUsers({
      name: "teste2",
      email: "teste2@teste.com",
      password: "teste2"
    });
    const response = await LocalAPI.updateUser(Object.assign(data, { image: "path" }));
    expect(response.status).toBe(200)
    expect(response.data.image).toBe("path");
  });
  test("login", async () => {
    const { data } = await LocalAPI.login({
      email: "teste2@teste.com",
      password: "teste2"
    });
    const response = await LocalAPI.updateUser(Object.assign(data, { image: "path" }));
    expect(response.status).toBe(200)
    expect(response.data.image).toBe("path");
  });
});
