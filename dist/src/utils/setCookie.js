"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookies = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//this function Automatically saves jwt in a cookie, just to access protected routes
const setCookies = (payload, req, res) => {
    const userjwt = jsonwebtoken_1.default.sign({
        ...payload,
    }, process.env.JWT_KEY, {
        expiresIn: Date.now() + 2 * 2 * 60 * 60 * 1000
    });
    // Store it on session
    res.cookie('secretoken', userjwt, {
        expires: new Date(Date.now() + 2 * 2 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        // sameSite: "none"
    });
    return userjwt;
};
exports.setCookies = setCookies;
//# sourceMappingURL=setCookie.js.map