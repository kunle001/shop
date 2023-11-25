import { Password } from "../password";


describe("PASSWORD TEST", () => {
  it("should hash a string", async () => {
    const test_string = "password";
    const hashedpass = await Password.toHash(test_string);

    expect(test_string).not.toBe(hashedpass);

  });

  it("should compare password/string correctly", async () => {
    const test_string = "password";
    const hashedpass = await Password.toHash(test_string);

    const isMatch = await Password.compare(hashedpass, test_string);

    expect(isMatch).toBe(true);
  });
});
