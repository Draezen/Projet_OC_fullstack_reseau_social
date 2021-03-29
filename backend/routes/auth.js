//in routes

const express = require ("express")
const router = express.Router()

const rateLimit = require("express-rate-limit")
const bodyCheck = require("../middleware/bodyCheck")
const { signupValidationRules, userValidationRules, passwordValidationRules, validate } = require("../middleware/userValidator")

const authCtrl = require("../controllers/auth")

const loginLimiter = rateLimit({
    windowsMs: 15 * 60 * 1000, //15min
    max: 30,
    message : {error : "Trop de tentatives de connexion, réessayez dans 15min"},
})

router.post("/signup", bodyCheck, signupValidationRules(), validate, authCtrl.signup)
router.post("/login", loginLimiter, bodyCheck, authCtrl.login)

module.exports = router