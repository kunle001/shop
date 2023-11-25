"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../controllers/authentication");
const validations_1 = require("../middlewares/validations");
const common_1 = require("@kunleticket/common");
const router = express_1.default.Router();
exports.authRouter = router;
const authController = new authentication_1.AuthenticationController();
router.route("/login").post((0, validations_1.validateBody)(["email", "password"]), common_1.validateRequest, authController.Login);
router.route("/signup").post((0, validations_1.validateBody)(["email", "name", "password", "confirmPassword"]), common_1.validateRequest, authController.Signup);
//# sourceMappingURL=authentication.js.map