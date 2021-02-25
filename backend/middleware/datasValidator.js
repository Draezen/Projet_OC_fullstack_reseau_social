const { body, validationResult } = require("express-validator")

const dataFormat = (req, res, next) => {
    const sauceObject = req.file ? JSON.parse(req.body.sauce) : req.body
    req.body = sauceObject
    next()
}

//rules for valide datas
const datasValidationRules = () => {
    return [
        body("heading")
            .trim()
            .blacklist('\<\>\&\$\=\`')
            .notEmpty()
            .withMessage("Heading cannot be empty"),
        body("text")
            .trim()
            .blacklist('\<\>\&\$\=\`')
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
    dataFormat,
    datasValidationRules, 
    validate
}