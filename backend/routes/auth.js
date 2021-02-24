//in routes

const express = require ("express")
const router = express.Router()

const rateLimit = require("express-rate-limit")
const bodyCheck = require("../middleware/bodyCheck")
const { signupValidationRules, userValidationRules, passwordValidationRules, validate } = require("../middleware/userValidator")

const authCtrl = require("../controllers/auth")

const loginLimiter = rateLimit({
    windowsMs: 15 * 60 * 1000,
    max: 100,
    message : "Too many login for this IP, please try again after 15min"
})

router.post("/signup", bodyCheck, signupValidationRules(), validate, authCtrl.signup)
router.post("/login", loginLimiter, bodyCheck, authCtrl.login)

module.exports = router