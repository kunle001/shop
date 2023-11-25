import { app } from "../../../app";
import request from "supertest"


describe("Authentication Endpoints Test", () => {


  // All Tests on the signing up endpont
  describe("SIGNUP", () => {

    // testing password confirmation
    it("should return 400 status code for wrong password confirmation", async () => {
      const res = await request(app).post("/api/v1/auth/signup")
        .send({
          email: "test@email.com",
          name: "test name",
          password: "test",
          confirmPassword: "wrong"
        }).expect(400)

      expect(res.body.status).toBe("Failed")
    });

    // testing for duplicate email
    it("should return 400, if email is no longer available", async () => {
      await global.createUser()  //creates a user with email: test@gmail.com

      const res = await request(app).post("/api/v1/auth/signup")
        .send({
          email: "test@gmail.com",
          name: "test name",
          password: "test",
          confirmPassword: "test"
        }).expect(400)

      expect(res.body.status).toBe("Failed")
      expect(res.body.errors[0].message).toBe("email is taken")
    })

    // if all things are correct, sign-up the user
    it("should return 201 for successful sign up", async () => {
      await request(app).post("/api/v1/auth/signup")
        .send({
          email: "test@email.com",
          name: "test name",
          password: "test",
          confirmPassword: "test"
        }).expect(201)
    });
  })


  // All Login end point test
  describe("LOGIN", () => {

    // testing for wrong password
    it("should return 400 status code for wrong password", async () => {
      // create a user first
      await global.createUser();

      // login with created user email but wrong password
      const res = await request(app).post("/api/v1/auth/login")
        .send({
          email: "test@gmail.com",
          password: "wrong"
        })
        .expect(400)

      expect(res.body.errors[0].message).toBe("wrong password")
    });

    it("should return 404, if user does not exist", async () => {
      await request(app).post("/api/v1/auth/login")
        .send({
          email: "test@gmail.com",
          password: "test"
        })
        .expect(404)
    })

    it("should return 200 for successful login", async () => {
      // creating a test user with email: test@gmail.com and Password: test
      await global.createUser();

      // logging in with the test user
      const res = await request(app).post("/api/v1/auth/login")
        .send({
          email: "test@gmail.com",
          password: "test"
        })
        .expect(200)

      console.log(res.get("Set-Cookie"))

      // confirms that cookies was set after logging in
      expect(res.get('Set-Cookie')).toBeDefined()
    });


  })
})