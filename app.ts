import "express-async-errors"
import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
// import mongoSanitize from "mongo-sanitize"
import { authRouter } from "./routes/authentication";
import { NotFoundError, errorHandler } from "@kunleticket/common";
import cors from "cors"
import rateLimit from "express-rate-limit";
import { productRouter } from "./routes/product";

const app = express();

// to parse request body
app.use(bodyParser.json())

// to parse cookies
app.use(cookieParser())
// to allow cross origin
app.use(cors())


const limiter = rateLimit({
  max: 10,
  windowMs: 60 * 30 * 1000,
  message: 'Too many Requests from this Ip, try again in 30 minutes'
})

// add a rate limiter to authentication endpoints
app.use('/api/v1/auth', limiter)

// routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/products", productRouter)


// for unregistered routes
app.all('*', () => {
  throw new NotFoundError("page not found")
})

app.use(errorHandler);

export { app }