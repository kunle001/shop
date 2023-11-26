"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const user_1 = require("../models/user");
const password_1 = require("../utils/password");
const common_1 = require("@kunleticket/common");
const response_1 = require("../utils/response");
const setCookie_1 = require("../utils/setCookie");
// All Authentication actions
class AuthenticationController {
    constructor() {
        this.Login = async (req, res) => {
            const { email, password } = req.body;
            // check if user exists
            const user = await user_1.User.findOne({
                email
            });
            //I used my npm package for error handling
            if (!user)
                throw new common_1.NotFoundError("no existing email");
            // check if password is correct
            const isMatch = await password_1.Password.compare(user.password, password);
            const payload = {
                id: user.id,
                email: user.email,
                role: user.role
            };
            // setting the json web token to the cookies
            (0, setCookie_1.setCookies)(payload, req, res);
            if (!isMatch) {
                throw new common_1.BadRequestError("wrong password");
            }
            ;
            (0, response_1.Respond)(200, "logged in successfully", res);
        };
        // Reset secret token to nil
        this.Logout = (req, res) => {
            res.cookie('secretoken', "");
        };
        this.Signup = async (req, res) => {
            const { email, password, name, confirmPassword } = req.body;
            const existingEmail = await user_1.User.findOne({
                email
            });
            if (existingEmail) {
                // checking if email already exists 
                // i do this for double validation, even if validation is being done
                // from the Database level.
                throw new common_1.BadRequestError("email is taken");
            }
            else if (password != confirmPassword) {
                throw new common_1.BadRequestError("confirm your password correctly");
            }
            let user = user_1.User.build({
                name,
                email,
                password
            });
            user = await user.save();
            (0, setCookie_1.setCookies)({
                email: user.email,
                role: user.role,
                id: user.id
            }, req, res);
            (0, response_1.Respond)(201, user, res);
        };
    }
}
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=authentication.js.map