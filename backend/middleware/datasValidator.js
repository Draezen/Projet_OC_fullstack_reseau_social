const { body, validationResult } = require("express-validator")

const dataFormat = (req, res, next) => {
    const articleObject = req.file ? JSON.parse(req.body.article) : req.body
    req.body = articleObject
    next()
}

//rules for valide datas
const datasValidationRules = () => {
    return [
        body("heading")
            .trim()
            .blacklist('\<\>\&\$\=\`')
            .notEmpty()
            .withMessage("Le titre ne peut pas être vide"),
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