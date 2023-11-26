import { body, ValidationChain } from "express-validator"

// This function validates the request body, it a list of the required fields
// and validates request input
export const validateBody = (fields: string[]) => {
  const validator: ValidationChain[] = [];

  for (let i = 0; i <= fields.length; i++) {
    switch (fields[i]) {
      case "email":
        validator.push(
          body("email")
            .isEmail()
            .notEmpty()
            .withMessage("missing field 'email'")
        )
        break
      case "phone":
        validator.push(
          body('phone')
            .isAlphanumeric()
            .notEmpty()
            .withMessage("missing field 'phone'")
        )
        break
      case "price":
        validator.push(
          body('phone')
            .isNumeric()
            .notEmpty()
            .withMessage("missing field 'phone'")
        )
        break
      default:
        validator.push(
          body(fields[i])
            .notEmpty()
            .withMessage(`missing field '${fields[i]}'`)
        )
        break
    }
  };

  return validator
}