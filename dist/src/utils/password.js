"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class Password {
    static async toHash(password) {
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        return hashedPassword;
    }
    static async compare(hashedPassword, suppliedPassword) {
        const isMatch = await bcrypt_1.default.compare(suppliedPassword, hashedPassword);
        return isMatch;
    }
}
exports.Password = Password;
//# sourceMappingURL=password.js.map