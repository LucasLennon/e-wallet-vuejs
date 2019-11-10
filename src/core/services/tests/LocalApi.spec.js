import LocalAPI from "../LocalApi";
import "fake-indexeddb/auto";

describe("LocalAPI", () => {
  test("accessDB", async () => {
    const api = await LocalAPI;
    expect(api).toBeDefined();
  });
});
