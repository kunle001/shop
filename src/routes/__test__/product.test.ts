import mongoose from "mongoose";
import { app } from "../../../app";
import request from "supertest"
import { Product } from "../../models/product";


describe("Products Endpoints Test", () => {

  describe("CREATE PRODUCT", () => {
    it("should return 401 if user is not logged in", async () => {
      await request(app).post("/api/v1/products")
        .set({
          name: "test product",
          price: 200,
          description: "a test description",
          category: "test category"
        })
        .expect(401)
    });

    it("should return 403, if logged in user is not and admin", async () => {
      await request(app).post("/api/v1/products")
        .set({
          name: "test product",
          price: 200,
          description: "a test description",
          category: "test category"
        })
        .set("Cookie", global.signin("user"))
        .expect(403)
    });
  })


  it("should return 400 for missing fields", async () => {
    await request(app).post("/api/v1/products")
      .set({
        name: "test product",
        price: 200,
        category: "test category"
      })
      .set("Cookie", global.signin("admin"))
      .expect(400)
  });

  it("should return 201 for successful product creation", async () => {
    const res = await request(app).post("/api/v1/products")
      .send({
        name: "test product",
        price: 200,
        description: "a test description",
        category: "test category"
      })
      .set("Cookie", global.signin("admin"))
      .expect(201)

    expect(res.body.status).toBe(true)
  });
})

describe("GET SINGLE PRODUCT", () => {
  it("should return 404 if product doesn't exist", async () => {
    // create a random mongoose object id
    let id = new mongoose.Types.ObjectId().toHexString();

    await request(app).get(`/api/v1/products/${id}`)
      .expect(404)
  });


  it("should return 200, if product exist", async () => {

    // create a test product 
    const product = await global.createProduct();

    // get the test product
    await request(app).get(`/api/v1/products/${product._id}`)
      .expect(200)
  })
});

describe("UPDATE PRODUCT", () => {
  it("should return 401 if user is not logged in", async () => {
    // create a test product
    const product = await global.createProduct();

    await request(app).patch(`/api/v1/products/update/${product._id}`)
      .send({
        price: 300
      })
      .expect(401)
  });

  it("should return 403, if logged in user is not and admin", async () => {
    const product = await global.createProduct();

    // try to update product as a user
    await request(app).patch(`/api/v1/products/update/${product._id}`)
      .send({
        price: 300
      })
      .set("Cookie", global.signin("user"))
      .expect(403)
  });

  it("should return 404, if product does not exist", async () => {
    let id = new mongoose.Types.ObjectId().toHexString();

    // login as admin but try to access a product that doesn't exist
    await request(app).patch(`/api/v1/products/update/${id}`)
      .send({
        price: 300
      })
      .set("Cookie", global.signin("admin"))
      .expect(404)
  });

  it("should return 200 for successful product update", async () => {
    const product = await global.createProduct();

    // Login as admin, and tries to access test product
    await request(app).patch(`/api/v1/products/update/${product.id}`)
      .send({
        price: 50000
      })
      .set("Cookie", global.signin("admin"))
      .expect(200)

    // search for product
    const updatedproduct = await Product.findById(product.id)

    // check if product price was updated
    expect(updatedproduct?.price).toBe(50000)
  });
});

describe("DELETE PRODUCT", () => {
  it("should return 401 if user is not logged in", async () => {
    const product = await global.createProduct();


    // try to delete a product without a user session
    await request(app).delete(`/api/v1/products/delete/${product._id}`)
      .send({
        price: 300
      })
      .expect(401)
  });

  it("should return 403, if logged in user is not and admin", async () => {
    const product = await global.createProduct();

    // try to delete a product without the right permissions
    await request(app).delete(`/api/v1/products/delete/${product._id}`)
      .send({
        price: 300
      })
      .set("Cookie", global.signin("user"))
      .expect(403)
  })

  it("should return 404, if product does not exist", async () => {
    let id = new mongoose.Types.ObjectId().toHexString();


    // trying to delete a product that doesn't exist
    await request(app).delete(`/api/v1/products/delete/${id}`)
      .send({
        price: 300
      })
      .set("Cookie", global.signin("admin"))
      .expect(404)
  });

  it("should return 200 for successful product deletion", async () => {
    const product = await global.createProduct();

    // Deleteing a test product
    await request(app).delete(`/api/v1/products/delete/${product.id}`)
      .send({
        price: 300
      })
      .set("Cookie", global.signin("admin"))
      .expect(200)

    // getting the deleted product from collection
    const deletedProduct = await Product.findById(product.id)

    // Ensuring it was deleted successfullly
    expect(deletedProduct).toBeNull()
  });

})