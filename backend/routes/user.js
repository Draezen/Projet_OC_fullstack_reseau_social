//in routes

const express = require ("express")
const router = express.Router()

const auth = require("../middleware/tokenAuth")
const bodyCheck = require("../middleware/bodyCheck")
const { signupValidationRules, userValidationRules, passwordValidationRules, validate } = require("../middleware/userValidator")

const userCtrl = require("../controllers/user")

router.get("/:id", auth, userCtrl.getOneUser)
router.put("/:id/modifyProfil", auth, bodyCheck, userValidationRules(), validate, userCtrl.modifyUser)
router.put("/:id/modifyPassword", auth, bodyCheck, passwordValidationRules(), validate,  userCtrl.modifyPassword)
router.delete("/:id", auth, userCtrl.deleteUser)

module.exports = router