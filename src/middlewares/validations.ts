import { body, ValidationChain } from "express-validator"

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