require("fake-indexeddb/auto");
import LocalAPI from "../LocalApi";
import LocalUser from "../LocalUser";
import LocalToken from "../LocalToken";

let mockUser = {
  name: "teste",
  email: "teste@teste.com",
  password: "teste"
};

describe("LocalAPI", () => {
  beforeEach(async () => {
    await new LocalAPI();
  });
  test("should add new User", async () => {
    const response = await LocalUser.addUser(mockUser);
    expect(response.status).toBe(200);
  });
  test("should not add same user", async () => {
    try {
      await LocalUser.addUser(mockUser);
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });
  test("should update user", async () => {
    const { data } = await LocalUser.addUser({
      name: "teste2",
      email: "teste2@teste.com",
      password: "teste2"
    });
    const response = await LocalUser.updateUser(
      Object.assign(data, { image: "path" })
    );
    expect(response.status).toBe(200);
    expect(response.data.image).toBe("path");
  });
});
