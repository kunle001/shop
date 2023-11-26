import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import { User, UserDoc } from '../models/user';
import { Product, ProductDoc } from '../models/product';


// setting necessary global variables
// these functions can be used globally
declare global {
  var createUser: () => Promise<UserDoc>
  var createProduct: () => Promise<ProductDoc>
  var signin: (role: "admin" | "user") => string[]
}

let mongo: any

beforeAll(async () => {
  // set necessary environment variables before starting all test
  process.env.JWT_KEY = "fu6IYzoy43RAb3j$"
  process.env.NODE_ENV = "development"

  // using a mongo memory server to serve as DB, so it doesnt connect to the Real DB
  mongo = new MongoMemoryServer();
  await mongo.start()
  const mongoUri = mongo.getUri()

  await mongoose.connect(mongoUri)
});


beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  jest.clearAllMocks()

  // delete any record created before starting each tests
  for (let collection of collections) {
    await collection.deleteMany()
  }
});


// Stop and close Mongo connection after all test is done
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();

});


// returns a valid jwt token, so it can be used to access protected routes
// can sign in user and admin
global.signin = (role) => {
  let id = new mongoose.Types.ObjectId().toHexString();
  const payload = {
    id,
    email: 'test@test.com',
    role
  };
  //  Create the JWT 

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build Session object
  const session = { jwt: token }

  // Turn session to json
  const sessionJSON = JSON.stringify(session)

  // Take JSON and encode it as base64
  Buffer.from(sessionJSON).toString('base64');

  //  return a string thats the cookie with encoded data

  return [`secretoken=${token}`]

};

// to create a test user
global.createUser = async () => {
  const user = await User.create({
    name: "test",
    email: "test@gmail.com",
    password: "test"
  });

  return user
}

// to create a test product
global.createProduct = async () => {
  const prod = await Product.create({
    name: "test product",
    price: 200,
    description: "a test description",
    category: "test category"
  })

  return prod
}