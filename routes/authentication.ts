import express from "express";
import { AuthenticationController } from "../controllers/authentication";
import { body } from "express-validator"
import { validateBody } from "../middlewares/validations";
import { validateRequest } from "@kunleticket/common";

const router = express.Router();
const authController = new AuthenticationController()


router.route("/login").post(
  validateBody(["email", "password"]),
  validateRequest,
  authController.Login
)

router.route("/signup").post(
  validateBody(["email", "name", "password", "confirmPassword"]),
  validateRequest,
  authController.Signup
)

export { router as authRouter }