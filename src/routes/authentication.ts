import express from "express";
import { AuthenticationController } from "../controllers/authentication";
import { validateBody } from "../middlewares/validations";
import { currentUser, requireAuth, validateRequest } from "@kunleticket/common";

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

router.use(currentUser)
router.use(requireAuth)

router.route("/logout").get(
  authController.Logout
)

export { router as authRouter }