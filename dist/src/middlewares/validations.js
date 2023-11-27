"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const express_validator_1 = require("express-validator");
// This function validates the request body, it a list of the required fields
// and validates request input
const validateBody = (fields) => {
    const validator = [];
    for (let i = 0; i <= fields.length; i++) {
        switch (fields[i]) {
            case "email":
                validator.push((0, express_validator_1.body)("email")
                    .isEmail()
                    .notEmpty()
                    .withMessage("missing field 'email'"));
                break;
            case "price":
                validator.push((0, express_validator_1.body)('price')
                    .isNumeric()
                    .notEmpty()
                    .withMessage("missing field 'price'"));
                break;
            default:
                validator.push((0, express_validator_1.body)(fields[i])
                    .notEmpty()
                    .withMessage(`missing field '${fields[i]}'`));
                break;
        }
    }
    ;
    return validator;
};
exports.validateBody = validateBody;
//# sourceMappingURL=validations.js.map