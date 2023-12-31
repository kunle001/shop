import "express-async-errors"
import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import sanitize from "mongo-sanitize"
import { authRouter } from "./src/routes/authentication";
import { NotFoundError, currentUser, errorHandler } from "@kunleticket/common";
import cors from "cors"
import rateLimit from "express-rate-limit";
import { productRouter } from "./src/routes/product";

const app = express();

app.set('trust proxy', 1);
// to parse request body
app.use(bodyParser.json())

// to parse cookies
app.use(cookieParser())
// to allow cross origin
app.use(cors({ credentials: true }))

app.use((req, res, next) => {
  // Sanitize request parameters
  sanitize(req.body);
  sanitize(req.query);
  sanitize(req.params);
  sanitize(req.cookies);
  next();
});

// only 10 request in 20 minutes per Ip Address
const limiter = rateLimit({
  max: 10,
  windowMs: 60 * 20 * 1000,
  message: 'Too many Requests from this Ip, try again in 20 minutes'
})

// middle ware check check if there is a current user session
app.use(currentUser)

// add a rate limiter to authentication endpoints, to avoid spamming
app.use('/api/v1/auth', limiter)

// routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/products", productRouter)


// for unregistered routes response
app.all('*', () => {
  throw new NotFoundError("page not found")
})

app.use(errorHandler);

export { app }