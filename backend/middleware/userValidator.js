
const { body, validationResult} = require("express-validator")

//rules for validate user and password
const signupValidationRules = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("L'adresse email ne peut pas être vide")
      .bail()
      .isEmail()
      .withMessage("Mauvais format d'email : l'email doit suivre le schéma xxx@yyy.zzz")
      .bail()
      .contains("groupomania.com")
      .withMessage("L'adresse mail doit se terminer par groupomania.com")
      .normalizeEmail(),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Le mot de passe ne peut pas être vide")
      .bail()
      .isStrongPassword()
      .withMessage("Le mot de passe n'est pas assez fort")
  ]
}

//rules for validate user informations update
const userValidationRules = () => {
  return [
    body("email")
      .if(body("email").exists())
      .trim()
      .notEmpty()
      .withMessage("L'adresse email ne peut pas être vide")
      .bail()
      .isEmail()
      .withMessage("Mauvais format d'email : l'email doit être xxx@yyy.zzz")
      .bail()
      .contains("groupomania.com")
      .withMessage("L'adresse mail doit terminer par groupomania.com")
      .normalizeEmail(),
    body("lastName")
      .trim()
      .blacklist('\<\>\&\$\=\`')
      .notEmpty()
      .withMessage("Le nom ne peut pas être vide"),
    body("firstName")
      .trim()
      .blacklist('\<\>\&\$\=\`')
      .notEmpty()
      .withMessage("Le prénom ne peut pas être vide"),
    body("avatarId")
      .trim()
      .blacklist('\<\>\&\$\=\`')
      .notEmpty()
      .withMessage("L'avatarId ne peut pas être vide")
      .bail()
      .isInt({min : 1})
      .withMessage("Doit ête un entier")
  ]
}

//rules for validate password update
const passwordValidationRules = () => {
  return [
    body("newPassword")
    .if(body("oldPassword").exists())
      .trim()
      .notEmpty()
      .withMessage("Le mot de passe ne peut pas ête vide")
      .bail()
      .isStrongPassword()
      .withMessage("Le mot de passe n'est pas assez fort")
      .bail()
      .custom((value, { req }) => value !==req.body.oldPassword)
      .withMessage("Le nouveau mot de passe doit être différent de l'ancien")
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