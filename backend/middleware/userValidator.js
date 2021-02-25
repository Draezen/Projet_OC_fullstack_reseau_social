
const { body, validationResult} = require("express-validator")

//rules for validate user and password
const signupValidationRules = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email cannot be empty")
      .bail()
      .isEmail()
      .withMessage("Wrong email format : email must be xxx@yyy.zzz")
      .normalizeEmail(),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password cannot be empty")
      .bail()
      .isStrongPassword()
      .withMessage("Password is not strong enough")
  ]
}

//rules for validate user informations update
const userValidationRules = () => {
  return [
    body("email")
      .if(body("email").exists())
      .trim()
      .notEmpty()
      .withMessage("Email cannot be empty")
      .bail()
      .isEmail()
      .withMessage("Wrong email format : email must be xxx@yyy.zzz")
      .normalizeEmail(),
    body("lastName")
      .if(body("lastName").exists())
      .trim()
      .blacklist('\<\>\&\$\=\`')
      .notEmpty()
      .withMessage("Last name cannot be empty"),
    body("firstName")
      .if(body("firstName").exists())
      .trim()
      .blacklist('\<\>\&\$\=\`')
      .notEmpty()
      .withMessage("First name cannot be empty"),
    body("avatarId")
      .if(body("avatarId").exists())
      .trim()
      .blacklist('\<\>\&\$\=\`')
      .notEmpty()
      .withMessage("avatar_id cannot be empty")
      .bail()
      .isInt({min : 1, max: 6})
      .withMessage("Must be an integer")
  ]
}

//rules for validate password update
const passwordValidationRules = () => {
  return [
    body("newPassword")
    .if(body("oldPassword").exists())
      .trim()
      .notEmpty()
      .withMessage("New password cannot be empty")
      .bail()
      .isStrongPassword()
      .withMessage("New password is not strong enough")
      .bail()
      .custom((value, { req }) => value !==req.body.oldPassword)
      .withMessage("New password must be different from your current")
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  return res.status(422).json({ errors: errors.array() })
}

module.exports = {
  signupValidationRules,
  userValidationRules,
  passwordValidationRules,
  validate
}