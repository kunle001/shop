"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './.env' });
const port = process.env.PORT;
const db = process.env.DB;
const db_pass = process.env.DB_PASSWORD;
if (!port) {
    console.log("PORT is not in the environment");
}
if (!db || !db_pass) {
    console.log("DB details is not in the environment");
}
const DB = process.env.DB.replace('<password>', process.env.DB_PASSWORD);
// connect to DB
mongoose_1.default.connect(DB).then(() => {
    console.log('DB conected');
}).catch((err) => {
    console.log("could not connect to DB, because", err);
});
// start application
app_1.app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});
//# sourceMappingURL=server.js.map