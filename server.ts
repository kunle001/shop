import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv"

dotenv.config({ path: './.env' });

const port = process.env.PORT
const db = process.env.DB
const db_pass = process.env.DB_PASSWORD

if (!port) {
  console.log("PORT is not in the environment")
}

if (!db || !db_pass) {
  console.log("DB details is not in the environment")
}

const DB = process.env.DB!.replace('<password>', process.env.DB_PASSWORD!)

// connect to DB
mongoose.connect(DB).then(() => {
  console.log('DB conected')
}).catch((err) => {
  console.log("could not connect to DB, because", err)
});

// start application
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})
