//in routes

const express = require ("express")
const router = express.Router()

const userCtrl = require("../controllers/user")

router.put("/:id", userCtrl.modifyUser)
router.delete("/:id", userCtrl.deleteUser)

module.exports = router