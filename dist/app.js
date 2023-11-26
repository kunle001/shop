"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongo_sanitize_1 = __importDefault(require("mongo-sanitize"));
const authentication_1 = require("./src/routes/authentication");
const common_1 = require("@kunleticket/common");
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const product_1 = require("./src/routes/product");
const app = (0, express_1.default)();
exports.app = app;
// to parse request body
app.use(body_parser_1.default.json());
// to parse cookies
app.use((0, cookie_parser_1.default)());
// to allow cross origin
app.use((0, cors_1.default)({ credentials: true }));
app.use((req, res, next) => {
    // Sanitize request parameters
    (0, mongo_sanitize_1.default)(req.body);
    (0, mongo_sanitize_1.default)(req.query);
    (0, mongo_sanitize_1.default)(req.params);
    (0, mongo_sanitize_1.default)(req.cookies);
    next();
});
const limiter = (0, express_rate_limit_1.default)({
    max: 10,
    windowMs: 60 * 30 * 1000,
    message: 'Too many Requests from this Ip, try again in 30 minutes'
});
// middle ware check check if there is a current user session
app.use(common_1.currentUser);
// add a rate limiter to authentication endpoints
app.use([
    '/api/v1/auth',
    '/api/v1/products'
], limiter);
// routes
app.use("/api/v1/auth", authentication_1.authRouter);
app.use("/api/v1/products", product_1.productRouter);
// for unregistered routes response
app.all('*', () => {
    throw new common_1.NotFoundError("page not found");
});
app.use(common_1.errorHandler);
//# sourceMappingURL=app.js.map