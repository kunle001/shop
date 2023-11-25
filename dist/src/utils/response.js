"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Respond = void 0;
const Respond = (status, data, res) => {
    return res.status(status).json({
        status: true,
        data
    });
};
exports.Respond = Respond;
//# sourceMappingURL=response.js.map